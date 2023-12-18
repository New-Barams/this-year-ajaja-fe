import { Icon } from '@/components';
import { checkIsSeason } from '@/utils/checkIsSeason';
import classNames from 'classnames';
import Link from 'next/link';
import './index.scss';

type NewPlanProps = {
  maxLength: number;
  currentLength: number;
};

export default function NewPlan({ maxLength, currentLength }: NewPlanProps) {
  const canMakeNewPlan = !!(maxLength - currentLength);

  return (
    <>
      <Link
        href={checkIsSeason() && canMakeNewPlan ? '/create' : {}}
        className={classNames('new-plan__wrapper')}
        style={{
          cursor: checkIsSeason() && canMakeNewPlan ? 'pointer' : 'default',
        }}>
        {checkIsSeason() ? (
          <div
            className={classNames('new-plan__add', 'border-round', {
              'background-origin-primary': canMakeNewPlan,
              'background-origin-secondary': !canMakeNewPlan,
              'color-origin-background': !canMakeNewPlan,
            })}>
            {canMakeNewPlan ? (
              <Icon name="PLUS" color="background" size="xl" />
            ) : (
              <>
                <p>생성할 수 있는 계획의 수가 최대입니다.</p>
                <p>기존 계획을 삭제해야만 새로 생성이 가능합니다.</p>
              </>
            )}
          </div>
        ) : (
          <div
            className={classNames(
              'new-plan__add',
              'color-origin-background',
              'border-round',
              'background-origin-secondary',
            )}>
            <p>[작성 시즌 종료]</p>
            <p>내년에 만나요!</p>
          </div>
        )}
      </Link>
      <p className={classNames('new-plan__number', 'color-origin-text-300')}>
        ({currentLength}/{maxLength})
      </p>
    </>
  );
}
