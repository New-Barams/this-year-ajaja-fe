import { AjajaButton, Tag } from '@/components';
import { Color } from '@/types';
import { CardPlans } from '@/types/apis/plan/GetAllPlans';
import classNames from 'classnames';
import './index.scss';

const color: Color[] = [
  'primary',
  'orange-300',
  'green-300',
  'blue-300',
  'purple-300',
];

type CardProps = {
  plan: CardPlans;
};
export default function Card({ plan }: CardProps) {
  return (
    <div className={classNames('card__wrapper')}>
      <div
        className={classNames(
          'card__background',
          'border-round',
          'background-origin-orange-300',
        )}></div>
      <div
        className={classNames(
          'card__contents',
          'border-round',
          'border-origin-orange-300',
          'background-origin-white-300',
        )}>
        <div className={classNames('card__contents-wrapper')}>
          <p
            className={classNames(
              'card__contents--title',
              'font-size-lg',
              'color-origin-gray-300',
            )}>
            {plan.title}
          </p>
          <p
            className={classNames(
              'card__contents--nickname',
              'font-size-sm',
              'color-origin-gray-200',
            )}>
            {plan.nickname}님의 계획 • {plan.createdAt.slice(0, 4)}년 작성
          </p>
          <div className={classNames('card__contents--tags', 'font-size-xs')}>
            {plan.tags.map((tag, index) => {
              return (
                <Tag
                  key={index}
                  color={color[index]}
                  style={{ padding: '0.2rem 0.5rem' }}>
                  {tag}
                </Tag>
              );
            })}
          </div>
          <AjajaButton
            planId={plan.id}
            ajajaCount={plan.ajajas}
            isFilled={true}
            classNameList={['card__contents--ajaja']}
            disabled
          />
        </div>
      </div>
    </div>
  );
}
