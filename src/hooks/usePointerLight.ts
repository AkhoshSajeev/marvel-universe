import { useCallback, useEffect, useRef, type PointerEvent } from "react";
import { useExperience } from "./useExperience";

/** Pointer coordinates stay outside React's render loop. Touch and reduced motion stay still. */
export function usePointerLight<T extends HTMLElement>(tilt = 4) {
  const frame = useRef(0);
  const { reduced, economy } = useExperience();
  const onPointerMove = useCallback(
    (event: PointerEvent<T>) => {
      if (reduced || economy || event.pointerType !== "mouse") return;
      const element = event.currentTarget;
      const { clientX, clientY } = event;
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const bounds = element.getBoundingClientRect();
        const x = Math.max(
          0,
          Math.min(1, (clientX - bounds.left) / bounds.width),
        );
        const y = Math.max(
          0,
          Math.min(1, (clientY - bounds.top) / bounds.height),
        );
        element.style.setProperty("--light-x", `${x * 100}%`);
        element.style.setProperty("--light-y", `${y * 100}%`);
        element.style.setProperty("--tilt-x", `${(0.5 - y) * tilt}deg`);
        element.style.setProperty("--tilt-y", `${(x - 0.5) * tilt}deg`);
        element.style.setProperty("--image-x", `${(x - 0.5) * 10}px`);
        element.style.setProperty("--image-y", `${(y - 0.5) * 10}px`);
      });
    },
    [reduced, economy, tilt],
  );
  const onPointerLeave = useCallback((event: PointerEvent<T>) => {
    cancelAnimationFrame(frame.current);
    for (const property of ["--tilt-x", "--tilt-y", "--image-x", "--image-y"])
      event.currentTarget.style.removeProperty(property);
  }, []);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  return { onPointerMove, onPointerLeave };
}
