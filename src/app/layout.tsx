import Provider from '@/provider/Provider';
import classNames from 'classnames';
import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import '@styles/reset.scss';
import '@styles/variables.scss';
import '@styles/webkit.scss';

const noto_sans = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['100', '400', '700', '900'],
});

export const metadata: Metadata = {
  title: '올해도 아좌좌',
  description: 'new year plan reminder',
  icons: {
    icon: '/this-year-ajaja-logo.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        />
      </head>
      <body
        className={classNames(
          noto_sans.className,
          'background-origin-white-200',
        )}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
