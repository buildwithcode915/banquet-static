'use client';

import { useEffect, useRef, type CSSProperties, type PointerEvent } from 'react';

const gallery = [
  { image: 'stage', title: 'A floral beginning', category: 'WEDDING INSPIRATION', description: 'Ivory blooms, warm light, and a moment to remember.', alt: 'AI-generated inspiration: ivory floral wedding stage with champagne drapery' },
  { image: 'dining', title: 'Gather in golden light', category: 'TABLE STYLING', description: 'Candlelit conversations and beautifully shared moments.', alt: 'AI-generated inspiration: candlelit dining table with roses and brass candle holders' },
  { image: 'entrance', title: 'A welcome to remember', category: 'ENTRANCE INSPIRATION', description: 'Marigolds, lanterns, and the magic of arriving together.', alt: 'AI-generated inspiration: marigold and lantern decorated celebration entrance' },
  { image: 'cake', title: 'Something sweet', category: 'CELEBRATION DETAILS', description: 'A little sweetness for your next beautiful chapter.', alt: 'AI-generated inspiration: two-tier ivory cake with blush flowers on a brass pedestal' }
];

export function CelebrationGallery() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!('IntersectionObserver' in window)) return;
    const animations: Animation[] = [];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        if (media.matches) return;
        const index = Number((entry.target as HTMLElement).dataset.index);
        animations.push(entry.target.animate([
          { opacity: 0, transform: 'translateY(48px) rotateX(8deg)' },
          { opacity: 1, transform: 'translateY(0) rotateX(0deg)' }
        ], { duration: 850, delay: (index % 2) * 110, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' }));
      });
    }, { threshold: 0.12 });
    container.current?.querySelectorAll('[data-index]').forEach((card) => observer.observe(card));
    const cancel = () => { if (media.matches) animations.forEach((animation) => animation.cancel()); };
    media.addEventListener('change', cancel);
    return () => { observer.disconnect(); animations.forEach((animation) => animation.cancel()); media.removeEventListener('change', cancel); };
  }, []);

  function tilt(event: PointerEvent<HTMLAnchorElement>) {
    if (event.pointerType !== 'mouse' || !window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) return;
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
    const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
    card.style.setProperty('--card-rx', `${(0.5 - y) * 9}deg`);
    card.style.setProperty('--card-ry', `${(x - 0.5) * 12}deg`);
    card.style.setProperty('--shine-x', `${x * 100}%`);
    card.style.setProperty('--shine-y', `${y * 100}%`);
  }

  function reset(event: PointerEvent<HTMLAnchorElement>) {
    event.currentTarget.style.setProperty('--card-rx', '0deg');
    event.currentTarget.style.setProperty('--card-ry', '0deg');
  }

  return <div className="inspiration-gallery" ref={container}>
    {gallery.map((item, index) => <figure className="gallery-reveal" data-index={index} key={item.image}>
      <a className="depth-card" href={`/assets/images/inspiration-${item.image}.webp`} target="_blank" rel="noopener noreferrer" onPointerMove={tilt} onPointerLeave={reset} style={{ '--card-rx': '0deg', '--card-ry': '0deg' } as CSSProperties} aria-label={`View ${item.title} inspiration image in a new tab`}>
        <div className="depth-image"><img src={`/assets/images/inspiration-${item.image}.webp`} width="960" height="1200" alt={item.alt} loading="lazy" decoding="async" /></div>
        <span className="image-shine" aria-hidden="true" />
        <span className="image-label">INSPIRATION / {String(index + 1).padStart(2, '0')}</span>
        <span className="image-open" aria-hidden="true">↗</span>
      </a>
      <figcaption><small>{item.category}</small><h3>{item.title}</h3><p>{item.description}</p></figcaption>
    </figure>)}
  </div>;
}
