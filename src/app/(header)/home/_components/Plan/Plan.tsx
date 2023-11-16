import { Icon, Tag } from '@/components';
import { planIcons } from '@/constants/planIcons';
import { Color } from '@/types';
import classNames from 'classnames';
import './index.scss';

type PlanProps = {
  title: string;
  achieveRate: number;
  icon: number;
};

export default function Plan({ title, achieveRate, icon }: PlanProps) {
  const achieveColor: Color = achieveColorChange(achieveRate);

  return (
    <div className={classNames('plan__wrapper')}>
      <div className={classNames('plan__wrapper--icon')}>
        <Icon name={planIcons[icon]} size="9xl" color="orange-300" />
      </div>
      <p>{title}</p>
      <Tag color={achieveColor}>달성률: {achieveRate}%</Tag>
    </div>
  );
}

const achieveColorChange = (achieveRate: number) => {
  if (33 < achieveRate) {
    return 'orange-300';
  } else if (achieveRate < 67) {
    return 'gray-300';
  }
  return 'primary';
};
