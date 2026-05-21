import { useEffect, useRef } from 'react';

export type PreloaderProps = {
  progress: number;
  onComplete?: () => void;
  label?: string;
};

export function Preloader({ progress, onComplete }: PreloaderProps): null {
  const calledRef = useRef(false);

  useEffect(() => {
    const clamped = Number.isFinite(progress)
      ? Math.max(0, Math.min(100, progress))
      : 0;
    if (clamped >= 100 && !calledRef.current) {
      calledRef.current = true;
      onComplete?.();
    }
  }, [progress, onComplete]);

  return null;
}
