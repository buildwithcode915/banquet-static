const url = 'https://shyamautsavhall.navdeepraushan.in/';

// Only confirmed business details; inspiration images are not venue photographs.
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': `${url}#business`,
      name: 'Shyama Utsav Hall',
      alternateName: 'श्यामा उत्सव हॉल',
      url,
      description: 'Banquet and wedding hall at Shyama Complex in Ekangar Dih, Nalanda, Bihar, for weddings, receptions, engagements, birthdays and family functions.',
      telephone: '+919934210304',
      logo: `${url}assets/brand-mark.png`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Shyama Complex, near Asirwad Hospital, Ekangar Dih',
        addressLocality: 'Nalanda',
        addressRegion: 'Bihar',
        postalCode: '801301',
        addressCountry: 'IN'
      },
      hasMap: 'https://www.google.com/maps/dir/?api=1&destination=25.2171816%2C85.2577987',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+919534765781',
        contactType: 'Reservations',
        availableLanguage: ['English', 'Hindi']
      }
    },
    {
      '@type': 'WebSite',
      '@id': `${url}#website`,
      url,
      name: 'Shyama Utsav Hall',
      alternateName: 'श्यामा उत्सव हॉल',
      publisher: { '@id': `${url}#business` }
    }
  ]
};

export function BusinessSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />;
}
