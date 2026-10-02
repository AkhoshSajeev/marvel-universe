import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
interface DeviceNavigator extends Navigator {
  deviceMemory?: number;
  connection?: { saveData?: boolean; effectiveType?: string };
}
type Experience = {
  reduced: boolean;
  economy: boolean;
  manualReduced: boolean;
  toggleMotion: () => void;
};
const ExperienceContext = createContext<Experience>({
  reduced: false,
  economy: false,
  manualReduced: false,
  toggleMotion: () => {},
});
export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [manualReduced, setManualReduced] = useState(() => {
    try {
      return localStorage.getItem("marvel-motion") === "reduced";
    } catch {
      return false;
    }
  });
  const [systemReduced, setSystemReduced] = useState(
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const device = navigator as DeviceNavigator;
  const economy = Boolean(
    device.connection?.saveData ||
    (device.deviceMemory && device.deviceMemory <= 4) ||
    (device.hardwareConcurrency && device.hardwareConcurrency <= 4) ||
    device.connection?.effectiveType === "2g",
  );
  const reduced = manualReduced || systemReduced;
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setSystemReduced(media.matches);
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? "reduced" : "full";
    document.documentElement.dataset.quality = economy ? "economy" : "full";
  }, [reduced, economy]);
  const toggleMotion = () =>
    setManualReduced((value) => {
      const next = !value;
      try {
        localStorage.setItem("marvel-motion", next ? "reduced" : "auto");
      } catch {
        /* Private browsing still supports the current session. */
      }
      return next;
    });
  return (
    <ExperienceContext.Provider
      value={{ reduced, economy, manualReduced, toggleMotion }}
    >
      {children}
    </ExperienceContext.Provider>
  );
}
export const useExperience = () => useContext(ExperienceContext);

export function useQuietMotion() {
  const { reduced, economy } = useExperience();
  return reduced || economy;
}
