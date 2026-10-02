import { useEffect } from "react";
const sequence = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];
export function useEasterEgg(onUnlock: () => void, disabled: boolean) {
  useEffect(() => {
    if (disabled) return;
    let position = 0;
    let previous = 0;
    const onKey = (event: KeyboardEvent) => {
      if (
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        (event.target as Element)?.closest(
          'input,textarea,select,[contenteditable="true"],[role="dialog"]',
        )
      )
        return;
      if (Date.now() - previous > 4000) position = 0;
      previous = Date.now();
      const key = event.key.toLowerCase();
      position =
        key === sequence[position] ? position + 1 : key === sequence[0] ? 1 : 0;
      if (position === sequence.length) {
        position = 0;
        onUnlock();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onUnlock, disabled]);
}
