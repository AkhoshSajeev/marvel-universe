import { useCallback, useEffect, useRef, useState } from "react";

export function useAmbientAudio() {
  const [enabled, setEnabled] = useState(false);
  const [available, setAvailable] = useState(true);
  const audio = useRef<{
    context: AudioContext;
    gain: GainNode;
    oscillators: OscillatorNode[];
  } | null>(null);
  const toggle = useCallback(async () => {
    try {
      if (!audio.current) {
        const context = new AudioContext();
        const gain = context.createGain();
        const filter = context.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 280;
        gain.gain.value = 0;
        gain.connect(filter);
        filter.connect(context.destination);
        const oscillators = [55, 82.41, 110.15].map((frequency) => {
          const oscillator = context.createOscillator();
          oscillator.type = "sine";
          oscillator.frequency.value = frequency;
          oscillator.connect(gain);
          oscillator.start();
          return oscillator;
        });
        audio.current = { context, gain, oscillators };
      }
      const { context, gain } = audio.current;
      await context.resume();
      const next = !enabled;
      gain.gain.cancelScheduledValues(context.currentTime);
      gain.gain.setTargetAtTime(next ? 0.025 : 0, context.currentTime, 0.4);
      setEnabled(next);
    } catch {
      setAvailable(false);
      setEnabled(false);
    }
  }, [enabled]);
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && audio.current) {
        audio.current.gain.gain.setTargetAtTime(
          0,
          audio.current.context.currentTime,
          0.1,
        );
        setEnabled(false);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      if (audio.current) {
        audio.current.oscillators.forEach((oscillator) => oscillator.stop());
        void audio.current.context.close();
        audio.current = null;
      }
    };
  }, []);
  return { enabled, available, toggle };
}
