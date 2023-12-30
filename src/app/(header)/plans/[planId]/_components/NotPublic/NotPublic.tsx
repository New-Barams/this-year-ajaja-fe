import { Button } from '@/components';
import Image from 'next/image';
import Link from 'next/link';
import './index.scss';

export default function NotPublic() {
  return (
    <div className="not-public__wrapper">
      <Image
        className="not-public__image"
        width={350}
        height={250}
        src={'/notPublic.png'}
        alt="not public page"
      />

      <h1 className="font-size-xl">비공개 계획입니다. </h1>
      <Link className="not-public__button" href={'/explore'}>
        <Button background="primary" color="text-600" border={false}>
          계획 둘러보기로 이동
        </Button>
      </Link>
    </div>
  );
}
