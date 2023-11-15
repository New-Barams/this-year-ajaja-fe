import { Icon, Tag } from '@/components';
import classNames from 'classnames';
import './index.scss';

type PlanProps = {
  title: string;
  achieveRate: number;
  icon: number;
};
export default function Plan({ title, achieveRate, icon }: PlanProps) {
  console.log(icon);

  return (
    <div className={classNames('plan__wrapper')}>
      <div className={classNames('plan__wrapper--icon')}>
        <Icon name="AJAJA" size="9xl" color="orange-300" />
      </div>
      <p>{title}</p>
      <Tag
        color={
          33 > achieveRate
            ? 'primary'
            : achieveRate < 66
            ? 'orange-300'
            : 'green-300'
        }>
        달성률: {achieveRate}%
      </Tag>
    </div>
  );
}
