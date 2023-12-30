import { AjajaButton, Tag } from '@/components';
import { planIcons } from '@/constants/planIcons';
import { CardPlans } from '@/types/apis/plan/GetAllPlans';
import classNames from 'classnames';
import Image from 'next/image';
import './index.scss';

type CardProps = {
  plan: CardPlans;
};
export default function Card({ plan }: CardProps) {
  return (
    <div
      className={classNames(
        'card__wrapper',
        'border-origin-secondary',
        'border-round',
      )}>
      <Image
        src={`/animal/${planIcons[plan.iconNumber]}.png`}
        width={64}
        height={64}
        alt="animal icon"
        className={classNames('card__wrapper--image')}
      />
      <div
        className={classNames(
          'card__contents-wrapper',
          'color-origin-text-100',
        )}>
        <p className={classNames('card__contents--title', 'font-size-md')}>
          {plan.title}
        </p>
        <p className={classNames('card__contents--nickname', 'font-size-xs')}>
          {plan.nickname}님의 계획 • {plan.createdAt.slice(0, 4)}년 작성
        </p>
        <AjajaButton
          planId={plan.id}
          ajajaCount={plan.ajajas}
          isFilled={true}
          disabled
        />
        <div className={classNames('card__contents--tags')}>
          {plan.tags.map((tag, index) => {
            return (
              <Tag key={index} style={{ padding: ' 0 0.25rem' }}>
                {tag}
              </Tag>
            );
          })}
        </div>
      </div>
    </div>
  );
}
