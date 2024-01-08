import { Button } from '@/components';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import './index.scss';

export default function WrongApproach() {
  return (
    <div className="wrong-approach">
      <div className="wrong-approach__wrapper">
        <Image
          className="wrong-approach__image"
          width={350}
          height={250}
          src={'/threeAnimals.png'}
          alt="wrong-approach"
        />

        <h1 className="font-size-xl">잘못된 접근입니다!</h1>
        <Link
          href={`/home`}
          className={classNames('wrong-approach__back-to-home')}>
          <Button background="primary" color="white-100" border={false}>
            홈으로 돌아가기
          </Button>
        </Link>
      </div>
    </div>
  );
}
