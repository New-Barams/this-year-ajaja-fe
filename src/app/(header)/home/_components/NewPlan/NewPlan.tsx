import { Icon } from '@/components';
import { checkIsSeason } from '@/utils/checkIsSeason';
import classNames from 'classnames';
import Link from 'next/link';
import './index.scss';

type NewPlanProps = {
  email_isVerified: boolean;
  handleOpenEmailVerificationModal: () => void;
};

export default function NewPlan({
  email_isVerified,
  handleOpenEmailVerificationModal,
}: NewPlanProps) {
  return (
    <Link
      href={checkIsSeason() && email_isVerified ? '/create' : {}}
      className={classNames('new-plan__wrapper')}
      style={{
        cursor: checkIsSeason() ? 'pointer' : 'default',
      }}
      onClick={handleOpenEmailVerificationModal}>
      <div className={classNames('new-plan__wrapper--icon')}>
        <Icon
          name={checkIsSeason() ? 'CREATE_NEW_PLAN' : 'AJAJA'}
          size="9xl"
          color="gray-200"
        />
      </div>
      <p className={classNames('color-origin-gray-200')}>
        {checkIsSeason()
          ? '새로운 신년 계획을 생성해보세요!'
          : '[작성 시즌 종료] 내년에 만나요!'}
      </p>
    </Link>
  );
}
