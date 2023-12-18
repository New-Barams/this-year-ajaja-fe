import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import './index.scss';

type PlanProps = {
  title: string;
  planId: number;
  achieveRate: number;
  photoUrl: string;
};

export default function Plan({
  title,
  planId,
  achieveRate,
  photoUrl,
}: PlanProps) {
  console.log(photoUrl);
  return (
    <Link
      href={`/plans/${planId}`}
      className={classNames(
        'plan__wrapper',
        'border-origin-secondary',
        'border-round',
      )}>
      <Image
        src={photoUrl}
        width={90}
        height={90}
        alt="Picture of Plan"
        className={classNames('plan__wrapper--image')}
      />
      <div
        className={classNames(`plan__wrapper--text`, `color-origin-text-100`)}>
        <p className={classNames(`plan__title`, 'font-size-md')}>{title}</p>
        <p className={classNames('font-size-base')}>달성률: {achieveRate}%</p>
        <Link
          href={''}
          className={classNames(
            'plan__feedback',
            'font-size-sm',
            'color-origin-secondary',
            'border-origin-secondary',
            'border-round',
          )}>
          피드백 보기 (업데이트 중!)
        </Link>
      </div>
    </Link>
  );
}
