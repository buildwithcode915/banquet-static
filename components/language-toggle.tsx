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
  'Bring family and friends together for your wedding ceremony or reception. Discuss your plans with our team.': 'अपनी शादी या रिसेप्शन के लिए परिवार और दोस्तों को साथ लाएँ। अपनी योजना हमारी टीम के साथ साझा करें।',
  'A ring ceremony, an anniversary, a beautiful new chapter. Plan a gathering around the people who matter.': 'रिंग सेरेमनी, सालगिरह या जीवन के नए अध्याय के लिए अपने खास लोगों के साथ समारोह की योजना बनाएँ।',
  'Celebrate birthdays and family occasions with a setup suited to your gathering.': 'अपने जन्मदिन और पारिवारिक अवसरों को आपकी सभा के अनुरूप व्यवस्था के साथ मनाएँ।',
  'THE DETAILS THAT BRING IT TOGETHER': 'वे विवरण जो समारोह को पूरा बनाते हैं', 'Your celebration,': 'आपका समारोह,', 'thoughtfully planned.': 'सोच-समझकर तैयार।',
  'Discuss individual services or a package for your event. Our team will confirm availability, inclusions, and a quotation based on your requirements.': 'अपने समारोह के लिए अलग-अलग सेवाओं या पैकेज पर चर्चा करें। हमारी टीम आपकी ज़रूरतों के आधार पर उपलब्धता, शामिल सेवाएँ और कोटेशन बताएगी।',
  'Hall & seating': 'हॉल और बैठने की व्यवस्था', 'Food & catering': 'भोजन और कैटरिंग', 'Decoration & setup': 'सजावट और सेटअप', 'Event support': 'समारोह सहायता',
  'Tell us your guest count and preferred arrangement. Ask our team about capacity and event suitability.': 'मेहमानों की संख्या और पसंदीदा व्यवस्था बताएँ। क्षमता और समारोह की उपयुक्तता के लिए हमारी टीम से पूछें।',
  'Discuss menu choices, guest numbers, and service style for your celebration.': 'अपने समारोह के लिए मेन्यू, मेहमानों की संख्या और सेवा शैली पर चर्चा करें।',
  'Share your ideas for the stage, entrance, flowers, lighting, and theme.': 'स्टेज, प्रवेश, फूलों, रोशनी और थीम के लिए अपने विचार साझा करें।',
  'Ask about coordination, photography, entertainment, and other support available for your date.': 'अपनी तारीख के लिए समन्वय, फोटोग्राफी, मनोरंजन और उपलब्ध अन्य सहायता के बारे में पूछें।',
  'THE CELEBRATION EDIT': 'समारोह की झलकियाँ', 'A little inspiration.': 'थोड़ी प्रेरणा।', 'A world of possibilities.': 'अनगिनत संभावनाएँ।',
  'Love a detail? Share it with our team to discuss possibilities for your event.': 'कोई विवरण पसंद आया? अपने समारोह की संभावनाओं पर हमारी टीम से बात करें।',
  'Floral stages & wedding inspiration': 'फूलों वाले स्टेज और शादी की प्रेरणा', 'Candlelit dining & thoughtful details': 'मोमबत्ती की रोशनी और सुंदर विवरण', 'Marigold entrances & glowing lanterns': 'गेंदे के फूलों वाले प्रवेश द्वार और जगमगाते लालटेन', 'Sweet moments & family celebrations': 'मीठे पल और पारिवारिक समारोह',
  'A beautiful beginning': 'एक खूबसूरत शुरुआत', 'Together, in golden light': 'सुनहरी रोशनी में साथ', 'An unforgettable welcome': 'एक यादगार स्वागत', 'Celebrate the little joys': 'छोटी खुशियाँ मनाएँ', 'AI-generated inspiration · Venue photos coming soon': 'AI से बनी प्रेरणा · असली हॉल की तस्वीरें जल्द आएँगी',
  'FROM YOUR FIRST IDEA TO YOUR BIG DAY': 'पहले विचार से आपके खास दिन तक', 'Let’s make it': 'इसे', 'simple.': 'सरल बनाते हैं।', 'Arrange a venue visit': 'हॉल देखने का समय तय करें',
  'Tell us your plans': 'अपनी योजना बताएँ', 'Visit & imagine': 'आएँ और कल्पना करें', 'Confirm the details': 'विवरण पक्का करें',
  'Share your occasion, preferred date, and approximate guest count by phone or WhatsApp.': 'अपने अवसर, पसंदीदा तारीख और अनुमानित मेहमानों की संख्या हमें फोन या WhatsApp पर बताएँ।',
  'Arrange a visit with our team. Discuss seating, decoration, catering, and arrival arrangements.': 'हमारी टीम के साथ मुलाक़ात तय करें। बैठने, सजावट, कैटरिंग और आने की व्यवस्था पर बात करें।',
  'Review availability, the agreed services, and your quotation with the team before confirming your booking.': 'बुकिंग पक्की करने से पहले टीम के साथ उपलब्धता, तय सेवाओं और कोटेशन की समीक्षा करें।',
  'A FEW THINGS YOU MAY BE WONDERING': 'कुछ सवाल जो आपके मन में हो सकते हैं', 'Before your': 'आपके', 'celebration.': 'समारोह से पहले।', 'Need a little more help? We’re a call away.': 'थोड़ी और मदद चाहिए? हमें कॉल करें।', 'Speak with our team': 'हमारी टीम से बात करें',
  'How can I check availability for my date?': 'अपनी तारीख की उपलब्धता कैसे जाँचूँ?', 'Can I visit the hall before deciding?': 'क्या निर्णय से पहले हॉल देख सकता हूँ?', 'What should I share for a quotation?': 'कोटेशन के लिए क्या जानकारी दूँ?', 'How many guests can the hall accommodate?': 'हॉल में कितने मेहमान आ सकते हैं?', 'Are these photographs of the actual venue?': 'क्या ये तस्वीरें असली हॉल की हैं?',
  'Call 99342 10304 or send us a WhatsApp message with your date and occasion. Our team will confirm current availability directly.': '99342 10304 पर कॉल करें या अपनी तारीख और अवसर के साथ WhatsApp संदेश भेजें। हमारी टीम वर्तमान उपलब्धता सीधे बताएगी।',
  'Yes, please call ahead to arrange a suitable time. Find us at Shyama Complex, near Asirwad Hospital, Ekangar Dih, Nalanda.': 'हाँ, कृपया सही समय तय करने के लिए पहले कॉल करें। हमें श्यामा कॉम्प्लेक्स, आशीर्वाद अस्पताल के पास, एकंगर डीह, नालंदा में खोजें।',
  'Your event type, preferred date, approximate guest count, and any catering, decoration, or setup requirements help our team discuss a suitable quotation.': 'आपके समारोह का प्रकार, पसंदीदा तारीख, अनुमानित मेहमानों की संख्या और कैटरिंग, सजावट या सेटअप की ज़रूरतें हमारी टीम को सही कोटेशन तैयार करने में मदद करेंगी।',
  'Ask our team about capacity for your seating and event arrangement. We will discuss suitability before you make a booking.': 'अपनी बैठने और समारोह की व्यवस्था के लिए क्षमता के बारे में हमारी टीम से पूछें। बुकिंग से पहले हम उपयुक्तता पर चर्चा करेंगे।',
  'The current images are AI-generated celebration inspiration. Please contact our team for actual venue photographs or arrange an in-person visit.': 'वर्तमान तस्वीरें AI से बनाई गई समारोह प्रेरणाएँ हैं। असली हॉल की तस्वीरों के लिए हमारी टीम से संपर्क करें या व्यक्तिगत मुलाक़ात तय करें।',
  'LET’S MAKE IT AN OCCASION': 'इसे एक यादगार अवसर बनाएँ', 'It starts with': 'शुरुआत होती है', '“save the date.”': '“तारीख तय करने” से।', 'Have a date in mind? Call or WhatsApp us to discuss availability, guest count, packages, and pricing.': 'तारीख तय है? उपलब्धता, मेहमानों की संख्या, पैकेज और कीमत पर चर्चा के लिए हमें कॉल या WhatsApp करें।', 'Availability, services, prices, and bookings are confirmed by our team.': 'उपलब्धता, सेवाएँ, कीमत और बुकिंग हमारी टीम द्वारा पक्की की जाती हैं।', 'You can also call': 'आप इस नंबर पर भी कॉल कर सकते हैं', 'WhatsApp us': 'हमें WhatsApp करें', 'Get directions': 'दिशा देखें', 'COME SAY HELLO': 'मिलने आइए', 'Please call or WhatsApp before visiting so we can confirm a suitable time.': 'आने से पहले कॉल या WhatsApp करें ताकि सही समय तय हो सके।',
  'For the moments you’ll always remember.': 'उन पलों के लिए जिन्हें आप हमेशा याद रखेंगे।', 'AT SHYAMA COMPLEX': 'श्यामा कॉम्प्लेक्स में',
  'AUSPICIOUS BEGINNINGS': 'शुभ शुरुआत', 'A blessing for': 'आपके समारोह के लिए', 'your celebration.': 'एक मंगल आशीर्वाद।', 'A small moment of Sanskrit wisdom, shared with warmth and respect as you begin planning your special day.': 'आपके खास दिन की योजना बनाते समय संस्कृत ज्ञान का एक छोटा, स्नेहपूर्ण और सम्मानित अंश।'
};

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
    window.dispatchEvent(new CustomEvent('languagechange', { detail: { hindi: nextHindi } }));
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
