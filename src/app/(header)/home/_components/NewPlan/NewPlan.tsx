import { Icon } from '@/components';
import classNames from 'classnames';
import './index.scss';

export default function NewPlan() {
  return (
    <div className={classNames('new-plan__wrapper')}>
      <div className={classNames('new-plan__wrapper--icon')}>
        <Icon name="CREATE_NEW_PLAN" size="9xl" color="gray-200" />
      </div>
      <p className={classNames('color-origin-gray-200')}>
        새로운 신년 계획을 생성해보세요!
      </p>
    </div>
  );
}
