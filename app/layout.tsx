import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://shyamautsavhall.navdeepraushan.in'),
  title: 'Shyama Utsav Hall | Banquet & Wedding Hall in Nalanda',
  description: 'Plan weddings, receptions, engagements and birthdays at Shyama Utsav Hall in Ekangar Dih, Nalanda, Bihar. Call 9934210304 to arrange a venue visit.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Shyama Utsav Hall',
    locale: 'en_IN',
    title: 'Shyama Utsav Hall | Banquet & Wedding Hall in Nalanda',
    description: 'Weddings, receptions and family celebrations at Shyama Complex, Ekangar Dih, Nalanda. Call 9934210304 to plan your visit.',
    images: [{ url: '/assets/brand-mark.png', alt: 'Shyama Utsav Hall brand mark' }]
  },
  twitter: {
    card: 'summary',
    title: 'Shyama Utsav Hall | Banquet & Wedding Hall in Nalanda',
    description: 'Plan your wedding, reception or family celebration in Ekangar Dih, Nalanda, Bihar.',
    images: ['/assets/brand-mark.png']
  },
  icons: { icon: '/assets/favicon.png' }
};
export const viewport: Viewport = { themeColor: '#241b28' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
