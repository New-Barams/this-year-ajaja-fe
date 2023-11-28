import { ToTopFloatingButton } from '@/components';
import classNames from 'classnames';
import Header from './_components/Header/Header';
import './_components/index.scss';

export default function HeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={classNames('header-layout')}>
      <div className={classNames('header-layout__wrapper')}>
        <Header />
        <div
          className={classNames(
            'header-layout__content',
            'border-origin-orange-300',
          )}>
          {children}
          <ToTopFloatingButton />
        </div>
      </div>
    </div>
  );
}
