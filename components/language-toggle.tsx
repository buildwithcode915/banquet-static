'use client';

import { useEffect, useState } from 'react';

export function LanguageToggle() {
  const [hindi, setHindi] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem('shyama-language') === 'hi';
    setHindi(saved);
    applyLanguage(saved);
  }, []);

  function changeLanguage(nextHindi: boolean) {
    setHindi(nextHindi);
    window.localStorage.setItem('shyama-language', nextHindi ? 'hi' : 'en');
    applyLanguage(nextHindi);
  }

  return <div className="language-toggle" role="group" aria-label="Choose language">
    <button type="button" className={!hindi ? 'is-active' : ''} aria-pressed={!hindi} onClick={() => changeLanguage(false)}>EN</button>
    <span aria-hidden="true">/</span>
    <button type="button" className={hindi ? 'is-active' : ''} aria-pressed={hindi} onClick={() => changeLanguage(true)}>हिन्दी</button>
  </div>;
}

function applyLanguage(hindi: boolean) {
  document.documentElement.lang = hindi ? 'hi' : 'en';
  document.querySelectorAll<HTMLElement>('[data-hi]').forEach((element) => {
    if (!element.dataset.en) element.dataset.en = element.innerHTML;
    element.innerHTML = hindi ? element.dataset.hi || element.dataset.en : element.dataset.en;
  });
}
