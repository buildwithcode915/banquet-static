'use client';

import { useEffect, useState } from 'react';

const shlokas = [
  { sanskrit: 'शुभं करोति कल्याणम् आरोग्यं धनसंपदा।', transliteration: 'Shubham karoti kalyāṇam, ārogyam dhana-sampadā.', meaning: 'May this auspicious beginning bring wellbeing, happiness, and abundance.' },
  { sanskrit: 'सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः।', transliteration: 'Sarve bhavantu sukhinaḥ, sarve santu nirāmayāḥ.', meaning: 'May everyone be happy, healthy, and free from sorrow.' },
  { sanskrit: 'मङ्गलं भगवान् विष्णुः मङ्गलं गरुडध्वजः।', transliteration: 'Maṅgalaṁ Bhagavān Viṣṇuḥ, maṅgalaṁ Garuḍadhvajaḥ.', meaning: 'May there be auspiciousness and blessings at this celebration.' }
];

export function ShlokaSection() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setActive((index) => (index + 1) % shlokas.length), 7200);
    return () => window.clearInterval(timer);
  }, []);
  const shloka = shlokas[active];
  return <section className="shloka-section" aria-labelledby="shloka-title">
    <div className="shloka-mandala" aria-hidden="true"><span>ॐ</span></div>
    <div className="wrap shloka-layout">
      <div><p className="eyebrow">AUSPICIOUS BEGINNINGS</p><h2 id="shloka-title">A blessing for<br /><em>your celebration.</em></h2><p className="shloka-intro">A small moment of Sanskrit wisdom, shared with warmth and respect as you begin planning your special day.</p><div className="shloka-dots" role="tablist" aria-label="Choose a shloka">{shlokas.map((item, index) => <button type="button" role="tab" aria-selected={index === active} aria-label={`Shloka ${index + 1}`} onClick={() => setActive(index)} key={item.sanskrit}><span /></button>)}</div></div>
      <div className="shloka-card" role="tabpanel" aria-live="polite" key={active}><span className="shloka-number">श्लोक / {String(active + 1).padStart(2, '0')}</span><p className="sanskrit" lang="sa">{shloka.sanskrit}</p><p className="transliteration">{shloka.transliteration}</p><span className="shloka-rule" aria-hidden="true" /><p className="meaning">“{shloka.meaning}”</p></div>
    </div>
  </section>;
}
