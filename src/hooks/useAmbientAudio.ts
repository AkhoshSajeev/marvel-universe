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
    if (!enabled) return;
    const click = (event: MouseEvent) => {
      if (
        document.hidden ||
        !(event.target as Element).closest("button,a") ||
        (event.target as Element).closest(".sound-toggle")
      )
        return;
      const context = audio.current?.context;
      if (!context || context.state !== "running") return;
      const tone = context.createOscillator();
      const level = context.createGain();
      const now = context.currentTime;
      tone.type = "sine";
      tone.frequency.setValueAtTime(520, now);
      tone.frequency.exponentialRampToValueAtTime(310, now + 0.07);
      level.gain.setValueAtTime(0, now);
      level.gain.linearRampToValueAtTime(0.016, now + 0.006);
      level.gain.exponentialRampToValueAtTime(0.0001, now + 0.085);
      tone.connect(level);
      level.connect(context.destination);
      tone.start(now);
      tone.stop(now + 0.09);
      tone.onended = () => {
        tone.disconnect();
        level.disconnect();
      };
    };
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
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
