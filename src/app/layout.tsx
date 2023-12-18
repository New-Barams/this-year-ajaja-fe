import Provider from '@/provider/Provider';
import classNames from 'classnames';
import type { Metadata } from 'next';
import { Poor_Story } from 'next/font/google';
import { cookies } from 'next/headers';
import '@styles/reset.scss';
import '@styles/variables.scss';
import '@styles/webkit.scss';
import LandingPage from './_components/LandingPage/LandingPage';
import Navigation from './_components/Navigation/Navigation';
import './_components/index.scss';

const poor_story = Poor_Story({
  subsets: ['latin'],
  weight: ['400'],
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
  const hasAuth = cookies().has('auth');
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        />
      </head>
      <body className={classNames(poor_story.className, 'background-origin')}>
        <Provider>
          <div className={classNames('global-landing')}>
            <LandingPage />
          </div>
          <div
            className={classNames(
              'background-origin-background',
              'global-frame',
            )}>
            <div className={classNames('global-frame-inside')}>
              <div className={classNames('global-frame-children')}>
                {children}
              </div>
              <div className={classNames('global-frame-navigation')}>
                <Navigation hasAuth={hasAuth} />
              </div>
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
