'use client';

import { useRef, type PointerEvent } from 'react';
import { VenuePhoto } from './venue-photo';

export function CelebrationScene() {
  const scene = useRef<HTMLDivElement>(null);
  function move(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse' || !window.matchMedia('(prefers-reduced-motion: no-preference) and (hover: hover)').matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    scene.current?.style.setProperty('--rx', `${-y * 12}deg`);
    scene.current?.style.setProperty('--ry', `${x * 16}deg`);
  }
  function reset() {
    scene.current?.style.setProperty('--rx', '0deg');
    scene.current?.style.setProperty('--ry', '0deg');
  }
  return <div className="scene" onPointerMove={move} onPointerLeave={reset}>
    <div className="scene-halo" aria-hidden="true" />
    <div className="scene-world" ref={scene}>
      <div className="orbit orbit-one" aria-hidden="true" />
      <div className="orbit orbit-two" aria-hidden="true" />
      <div className="invitation-back" aria-hidden="true" />
      <div className="invitation">
        <VenuePhoto name="hero" className="invitation-photo"><div className="invitation-content placeholder">
          <span className="invitation-kicker">YOU’RE INVITED TO CELEBRATE</span>
          <img className="invitation-mark" src="/assets/brand-mark.png" width="96" height="96" alt="Shyama Complex" />
          <span className="invitation-title">A beautiful<br/><em>beginning.</em></span>
          <span className="invitation-rule" aria-hidden="true" />
          <span className="invitation-name">SHYAMA UTSAV HALL</span>
          <span className="invitation-place">Ekangar Dih · Nalanda</span>
        </div></VenuePhoto>
      </div>
      <div className="scene-seal" aria-hidden="true"><span>S</span><small>UTSAV</small></div>
      <div className="floating-note"><span aria-hidden="true">✧</span> Your people.<br/>Your unforgettable day.</div>
    </div>
    <p className="scene-caption"><span>01 — THE INVITATION</span><span>Venue photos coming soon</span></p>
  </div>;
}
