import classNames from 'classnames';
import Content from './_components/Content';
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
        <Content>{children}</Content>
      </div>
    </div>
  );
}
