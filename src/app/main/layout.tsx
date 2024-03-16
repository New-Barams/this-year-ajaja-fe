import Link from 'next/link';
import { ReactElement } from 'react';
import MainHeader from './_components/MainHeader/MainHeader';
import './index.scss';

interface LayoutProps {
  createButtons: ReactElement;
  feedback: ReactElement;
  plan: ReactElement;
  footprint: ReactElement;
}

export default function Layout({
  createButtons,
  feedback,
  plan,
  footprint,
}: LayoutProps) {
  return (
    <div style={{ height: '100%', overflowY: 'scroll' }}>
      <MainHeader />
      <div
        style={{
          padding: '1.5rem 0',

          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}>
        {createButtons}
        <div className="outside-box">
          <h1 className="font-size-lg ">피드백</h1>
          {feedback}
        </div>
        <div className="outside-box">
          <div className="main__item__header">
            <h1 className="font-size-lg ">내 계획</h1>
            <Link className="main__item--link font-size-xs" href={'/'}>
              전체보기
            </Link>
          </div>
          {plan}
        </div>

        <div className="outside-box">
          <div className="main__item__header">
            <h1 className="font-size-lg ">발자취</h1>
            <Link className="main__item--link font-size-xs" href={'/'}>
              전체보기
            </Link>
          </div>
          {footprint}
        </div>
      </div>
    </div>
  );
}
