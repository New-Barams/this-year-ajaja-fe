import { Icon, Tag } from '@/components';
import { planIcons } from '@/constants/planIcons';
import { Color } from '@/types';
import classNames from 'classnames';
import Link from 'next/link';
import './index.scss';

type PlanProps = {
  title: string;
  planId: number;
  achieveRate: number;
  icon: number;
};

export default function Plan({ title, planId, achieveRate, icon }: PlanProps) {
  const achieveColor: Color = achieveColorChange(achieveRate);

  return (
    <Link href={`/plans/${planId}`} className={classNames('plan__wrapper')}>
      <div className={classNames('plan__wrapper--icon')}>
        <Icon name={planIcons[icon]} size="9xl" color="orange-300" />
      </div>
      <p className={classNames(`color-origin-gray-300`)}>{title}</p>
      <Tag color={achieveColor}>달성률: {achieveRate}%</Tag>
    </Link>
  );
}

const achieveColorChange = (achieveRate: number) => {
  if (33 < achieveRate && achieveRate < 67) {
    return 'orange-300';
  } else if (67 <= achieveRate) {
    return 'green-300';
  }
  return 'primary';
};
