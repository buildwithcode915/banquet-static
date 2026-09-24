'use client';

import { useState, type ReactNode } from 'react';
import { photos } from '../content/photos';

export function VenuePhoto({ name, className = '', children }: { name: keyof typeof photos; className?: string; children: ReactNode }) {
  const photo = photos[name];
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  return <div className={`photo-slot ${className} ${loaded && !failed ? 'has-photo' : ''}`}>
    {children}
    {photo.src && !failed && <img src={photo.src} alt={photo.alt} loading={name === 'hero' ? 'eager' : 'lazy'} onLoad={() => setLoaded(true)} onError={() => setFailed(true)} />}
  </div>;
}
