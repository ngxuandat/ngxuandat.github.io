import { useEffect, useState } from 'react';

/** Thin bar at the top of the page that fills as you read. */
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = document.documentElement;
        const max = el.scrollHeight - el.clientHeight;
        setProgress(max > 0 ? Math.min(1, el.scrollTop / max) : 0);
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: '0 0 auto 0',
        height: 3,
        zIndex: 20,
        background: 'var(--accent)',
        transformOrigin: '0 50%',
        transform: `scaleX(${progress})`,
        transition: 'transform 80ms linear',
      }}
    />
  );
}
