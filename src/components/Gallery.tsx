import { useCallback, useEffect, useState } from 'react';

export interface GalleryImage {
  src: string;
  alt: string;
}

export default function Gallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (d: number) => setActive((i) => (i === null ? i : (i + d + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active, close, step]);

  return (
    <>
      <div className="gallery-grid">
        {images.map((img, i) => (
          <button key={img.src} type="button" className="gallery-item" onClick={() => setActive(i)} aria-label={`Open ${img.alt}`}>
            <img src={img.src} alt={img.alt} loading="lazy" />
          </button>
        ))}
      </div>

      {active !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={images[active].alt} onClick={close}>
          <img src={images[active].src} alt={images[active].alt} onClick={(e) => e.stopPropagation()} />
          <button type="button" className="lb-btn lb-close" onClick={close} aria-label="Close">×</button>
          {images.length > 1 && (
            <>
              <button type="button" className="lb-btn lb-prev" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous">‹</button>
              <button type="button" className="lb-btn lb-next" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next">›</button>
            </>
          )}
          <p className="lb-caption">{images[active].alt} · {active + 1}/{images.length}</p>
        </div>
      )}
    </>
  );
}
