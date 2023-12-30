'use client';

import { CardPlans } from '@/types/apis/plan/GetAllPlans';
import classNames from 'classnames';
import Link from 'next/link';
import Card from '../Card/Card';
import './index.scss';

type PlansProps = {
  flatLoadedPlans: CardPlans[];
};

export default function Plans({ flatLoadedPlans }: PlansProps) {
  return (
    <div className={classNames('plans__wrapper')}>
      {flatLoadedPlans?.map((plan, index) => {
        return (
          <Link
            key={index}
            href={`/plans/${plan.id}`}
            className={classNames('plans__wrapper--link')}>
            <Card key={index} plan={plan} />
          </Link>
        );
      })}
    </div>
  );
}
