'use client';

import { useEffect, useRef, useState } from 'react';

const slides = [
  { image: 'stage', title: 'A beautiful beginning', hi: 'एक खूबसूरत शुरुआत', detail: 'Floral stages & wedding inspiration', detailHi: 'फूलों वाले स्टेज और शादी की प्रेरणा', alt: 'AI-generated ivory floral stage with champagne drapery' },
  { image: 'dining', title: 'Together, in golden light', hi: 'सुनहरी रोशनी में साथ', detail: 'Candlelit dining & thoughtful details', detailHi: 'मोमबत्ती की रोशनी और सुंदर विवरण', alt: 'AI-generated candlelit table with roses and brass candle holders' },
  { image: 'entrance', title: 'An unforgettable welcome', hi: 'एक यादगार स्वागत', detail: 'Marigold entrances & glowing lanterns', detailHi: 'गेंदे के फूलों वाले प्रवेश द्वार और जगमगाते लालटेन', alt: 'AI-generated marigold-decorated entrance at dusk' },
  { image: 'cake', title: 'Celebrate the little joys', hi: 'छोटी खुशियाँ मनाएँ', detail: 'Sweet moments & family celebrations', detailHi: 'मीठे पल और पारिवारिक समारोह', alt: 'AI-generated ivory cake decorated with blush flowers' }
];

export function ImageSlider({ variant = 'gallery' }: { variant?: 'hero' | 'gallery' }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hindi, setHindi] = useState(false);
  const root = useRef<HTMLElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const select = (index: number) => { setPlaying(false); setActive((index + slides.length) % slides.length); };

  useEffect(() => {
    const onLanguageChange = (event: Event) => setHindi((event as CustomEvent<{ hindi: boolean }>).detail.hindi);
    setHindi(window.localStorage.getItem('shyama-language') === 'hi');
    window.addEventListener('languagechange', onLanguageChange);
    return () => window.removeEventListener('languagechange', onLanguageChange);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    if (root.current) observer.observe(root.current);
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const stop = () => { if (media.matches || document.hidden) setPlaying(false); };
    media.addEventListener('change', stop);
    document.addEventListener('visibilitychange', stop);
    return () => { observer.disconnect(); media.removeEventListener('change', stop); document.removeEventListener('visibilitychange', stop); };
  }, []);

  useEffect(() => {
    if (!playing || hovered || !visible) return;
    const timer = window.setInterval(() => setActive((index) => (index + 1) % slides.length), 3000);
    return () => window.clearInterval(timer);
  }, [playing, hovered, visible]);

  return <section ref={root} className={`image-slider slider-${variant}`} aria-roledescription="carousel" aria-label={variant === 'hero' ? 'Celebration highlights' : 'Celebration inspiration collection'} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setPlaying(false)} onKeyDown={(event) => {
    if (event.key === 'ArrowRight') { event.preventDefault(); select(active + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); select(active - 1); }
  }}>
    <div className="slider-viewport" onPointerDown={(event) => { if (event.pointerType === 'touch') touchStart.current = { x: event.clientX, y: event.clientY }; }} onPointerCancel={() => { touchStart.current = null; }} onPointerUp={(event) => {
      const start = touchStart.current;
      touchStart.current = null;
      if (!start) return;
      const dx = event.clientX - start.x;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(event.clientY - start.y)) select(active + (dx < 0 ? 1 : -1));
    }}>
      {slides.map((slide, index) => <div key={slide.image} className={`slider-slide ${index === active ? 'is-active' : ''}`} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${slides.length}: ${hindi ? slide.hi : slide.title}`} aria-hidden={index !== active}>
        <img src={`/assets/images/inspiration-${slide.image}.webp`} alt={slide.alt} width="960" height="1200" loading={variant === 'hero' && index === 0 ? 'eager' : 'lazy'} fetchPriority={variant === 'hero' && index === 0 ? 'high' : 'auto'} />
        <div className="slider-caption"><span>{hindi ? slide.detailHi : slide.detail}</span><h3>{hindi ? slide.hi : slide.title}</h3></div>
      </div>)}
      <span className="slider-disclaimer">{hindi ? 'AI से बनी प्रेरणा · असली हॉल की तस्वीरें जल्द आएँगी' : 'AI-generated inspiration · Venue photos coming soon'}</span>
    </div>
    <div className="slider-controls">
      <button type="button" className="slider-play" onClick={() => setPlaying((value) => !value)} aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}>{playing ? 'Ⅱ Pause' : '▷ Play'}</button>
      <div className="slider-dots" aria-label={hindi ? 'तस्वीर चुनें' : 'Choose image'}>{slides.map((slide, index) => <button type="button" key={slide.image} aria-label={`${hindi ? 'तस्वीर दिखाएँ' : 'Show image'} ${index + 1}: ${hindi ? slide.hi : slide.title}`} aria-pressed={index === active} onClick={() => select(index)}><span /></button>)}</div>
      <div className="slider-arrows"><button type="button" onClick={() => select(active - 1)} aria-label="Previous image">←</button><button type="button" onClick={() => select(active + 1)} aria-label="Next image">→</button></div>
    </div>
    <p className="sr-only" aria-live={playing ? 'off' : 'polite'} aria-atomic="true">{hindi ? 'तस्वीर' : 'Image'} {active + 1} {hindi ? 'में से' : 'of'} {slides.length}: {hindi ? slides[active].hi : slides[active].title}</p>
  </section>;
}
