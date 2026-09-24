import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Shyama Utsav Hall | A beautiful beginning',
  description: 'Weddings, receptions and family celebrations at Shyama Utsav Hall, Shyama Complex, Ekangar Dih, Nalanda. Plan your visit and discuss your occasion.',
  icons: { icon: '/assets/favicon.png' }
};
export const viewport: Viewport = { themeColor: '#241b28' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
