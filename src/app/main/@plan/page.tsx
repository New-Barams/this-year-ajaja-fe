'use client';

import { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ProgressGraph from '../_components/ProgressGraph/ProgressGraph';
import './index.scss';

const tableHeader = ['계획', '진행률', '리마인드'];
const plans: Plan[] = [
  {
    planTitle: 'teststwewerrerwerwrwerwr',
    progress: 0,
    restDay: 20,
  },
  {
    planTitle: 'errerwerwrwerwr',
    progress: 20,
    restDay: 20,
  },
  {
    planTitle: 'teststwewerrerwerwrwerwr',
    progress: 70,
    restDay: 20,
  },
  {
    planTitle: 'teststwewerrerwerwrwerwr',
    progress: 40,
    restDay: 20,
  },
];
type Plan = { planTitle: string; progress: number; restDay: number };

const progress = { archive: 33 };
export default function Page() {
  const [totalArchive, setTotalArchive] = useState<number>(0);
  useEffect(() => {
    setTimeout(() => {
      setTotalArchive(progress.archive);
    }, 1000);
  });
  return (
    <div className="plans__container">
      <div className="plans__total-progress">
        <CircularProgressbar
          styles={buildStyles({
            pathTransition: '1s',
            pathColor: 'var(--origin-primary)',
            textColor: 'var(--origin-text-100)',
            textSize: '24px',
          })}
          className="plans__total-progress--bar"
          value={totalArchive}
          text={`${progress.archive}%`}
        />
        <div className="plans__total-progress--text color-origin-text-300 font-size-xs">
          전체 달성률
        </div>
      </div>
      <table className="plans__table">
        <tr>
          {tableHeader.map((header) => (
            <th
              key={header}
              className="plans__table--header color-origin-text-300 font-size-xs">
              {header}
            </th>
          ))}
        </tr>
        {/*TODO 각 아이템 클릭시 계획으로  */}
        {plans.map((plan) => {
          return (
            <tr key={plan.planTitle}>
              <td className="plans__table__item--title">{plan.planTitle}</td>
              <td className="plans__table__item--progress">
                <ProgressGraph progressValue={plan.progress} />
              </td>
              <td className="plans__table__item--d-day">
                <div className="plans__table__item--d-day--content font-size-sm">
                  {`D-${plan.restDay}`}
                </div>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
