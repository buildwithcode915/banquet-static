'use client';

import { useEffect, useState } from 'react';

const translations: Record<string, string> = {
  'SHYAMA COMPLEX': 'श्यामा कॉम्प्लेक्स', 'EKANGAR DIH, NALANDA': 'एकंगर डीह, नालंदा',
  'A PLACE FOR YOUR CELEBRATIONS': 'आपके समारोहों के लिए एक जगह', 'The venue': 'स्थान', Celebrations: 'समारोह', Gallery: 'गैलरी',
  'Plan a visit': 'मुलाक़ात तय करें', 'YOUR OCCASION. YOUR PEOPLE. YOUR MEMORIES.': 'आपका अवसर • आपके लोग • आपकी यादें',
  'Some moments': 'कुछ पल', 'deserve a': 'एक', 'special place.': 'खास जगह के हक़दार होते हैं।',
  'Bring your loved ones together at Shyama Utsav Hall. A place for weddings, family gatherings, and the celebrations that mean the most.': 'अपने प्रियजनों के साथ श्यामा उत्सव हॉल में खुशियाँ मनाएँ। शादियों, पारिवारिक मिलन और यादगार समारोहों के लिए एक खूबसूरत जगह।',
  'Let’s plan your celebration': 'अपना समारोह तय करें', 'Call our team': 'हमारी टीम को कॉल करें', 'Near Asirwad Hospital · Ekangar Dih, Bihar': 'आशीर्वाद अस्पताल के पास · एकंगर डीह, बिहार',
  'Weddings': 'शादियाँ', Receptions: 'रिसेप्शन', Engagements: 'सगाई', 'Family celebrations': 'पारिवारिक समारोह',
  'WELCOME TO SHYAMA UTSAV HALL': 'श्यामा उत्सव हॉल में आपका स्वागत है', 'Close to home.': 'घर के पास।', 'Close to your heart.': 'दिल के करीब।',
  'Your celebration starts with a conversation.': 'आपका समारोह एक बातचीत से शुरू होता है।',
  'Come and see the space': 'जगह देखने आएँ',
  'EVERY GATHERING HAS A STORY': 'हर मिलन की अपनी कहानी है', 'Make room for': 'अपने लिए जगह बनाएँ', 'yours.': 'अपने समारोह की।',
  'From a new beginning to another year together,': 'नई शुरुआत से साथ बिताए एक और साल तक,', 'let’s talk about your next occasion.': 'आपके अगले अवसर के बारे में बात करते हैं।',
  'Weddings & receptions': 'शादियाँ और रिसेप्शन', 'Engagements & milestones': 'सगाई और खास पड़ाव', 'Birthdays & family functions': 'जन्मदिन और पारिवारिक समारोह',
  'THE DETAILS THAT BRING IT TOGETHER': 'वे विवरण जो समारोह को पूरा बनाते हैं', 'Your celebration,': 'आपका समारोह,', 'thoughtfully planned.': 'सोच-समझकर तैयार।',
  'Hall & seating': 'हॉल और बैठने की व्यवस्था', 'Food & catering': 'भोजन और कैटरिंग', 'Decoration & setup': 'सजावट और सेटअप', 'Event support': 'समारोह सहायता',
  'THE CELEBRATION EDIT': 'समारोह की झलकियाँ', 'A little inspiration.': 'थोड़ी प्रेरणा।', 'A world of possibilities.': 'अनगिनत संभावनाएँ।',
  'Love a detail? Share it with our team to discuss possibilities for your event.': 'कोई विवरण पसंद आया? अपने समारोह की संभावनाओं पर हमारी टीम से बात करें।',
  'FROM YOUR FIRST IDEA TO YOUR BIG DAY': 'पहले विचार से आपके खास दिन तक', 'Let’s make it': 'इसे', 'simple.': 'सरल बनाते हैं।', 'Arrange a venue visit': 'हॉल देखने का समय तय करें',
  'Tell us your plans': 'अपनी योजना बताएँ', 'Visit & imagine': 'आएँ और कल्पना करें', 'Confirm the details': 'विवरण पक्का करें',
  'A FEW THINGS YOU MAY BE WONDERING': 'कुछ सवाल जो आपके मन में हो सकते हैं', 'Before your': 'आपके', 'celebration.': 'समारोह से पहले।', 'Need a little more help? We’re a call away.': 'थोड़ी और मदद चाहिए? हमें कॉल करें।', 'Speak with our team': 'हमारी टीम से बात करें',
  'How can I check availability for my date?': 'अपनी तारीख की उपलब्धता कैसे जाँचूँ?', 'Can I visit the hall before deciding?': 'क्या निर्णय से पहले हॉल देख सकता हूँ?', 'What should I share for a quotation?': 'कोटेशन के लिए क्या जानकारी दूँ?', 'How many guests can the hall accommodate?': 'हॉल में कितने मेहमान आ सकते हैं?', 'Are these photographs of the actual venue?': 'क्या ये तस्वीरें असली हॉल की हैं?',
  'LET’S MAKE IT AN OCCASION': 'इसे एक यादगार अवसर बनाएँ', 'It starts with': 'शुरुआत होती है', '“save the date.”': '“तारीख तय करने” से।', 'WhatsApp us': 'हमें WhatsApp करें', 'Get directions': 'दिशा देखें', 'COME SAY HELLO': 'मिलने आइए', 'Please call or WhatsApp before visiting so we can confirm a suitable time.': 'आने से पहले कॉल या WhatsApp करें ताकि सही समय तय हो सके।',
  'For the moments you’ll always remember.': 'उन पलों के लिए जिन्हें आप हमेशा याद रखेंगे।', 'AT SHYAMA COMPLEX': 'श्यामा कॉम्प्लेक्स में',
  'AUSPICIOUS BEGINNINGS': 'शुभ शुरुआत', 'A blessing for': 'आपके समारोह के लिए', 'your celebration.': 'एक मंगल आशीर्वाद।', 'A small moment of Sanskrit wisdom, shared with warmth and respect as you begin planning your special day.': 'आपके खास दिन की योजना बनाते समय संस्कृत ज्ञान का एक छोटा, स्नेहपूर्ण और सम्मानित अंश।'
};

export function LanguageToggle() {
  const [hindi, setHindi] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem('shyama-language') === 'hi';
    setHindi(saved);
    applyLanguage(saved);
    const observer = new MutationObserver(() => {
      if (document.documentElement.lang === 'hi') applyLanguage(true);
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
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
    const nextHtml = hindi ? element.dataset.hi || element.dataset.en : element.dataset.en;
    if (nextHtml && element.innerHTML !== nextHtml) element.innerHTML = nextHtml;
  });
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const text = node.nodeValue || '';
    const trimmed = text.trim();
    if (!trimmed || (node.parentElement?.closest('.sanskrit, .transliteration, .language-toggle'))) continue;
    const replacement = translations[trimmed];
    const original = node.parentElement?.dataset.enText;
    if (!hindi && original) {
      node.nodeValue = text.replace(trimmed, original);
    } else if (hindi && replacement) {
      if (!original) node.parentElement?.setAttribute('data-en-text', trimmed);
      node.nodeValue = text.replace(trimmed, replacement);
    }
  }
}
