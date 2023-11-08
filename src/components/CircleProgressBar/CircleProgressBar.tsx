import { COLOR } from '@/constants';
import classNames from 'classnames';
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import './index.scss';

interface CircleProgressBarProps {
  isFeedbackDone: boolean;
  percent?: number;
  onClick?: () => void;
}

const TEXT = {
  FEEDBACK: '피드백하기',
};

export default function CircleProgressBar({
  isFeedbackDone,
  percent,
  onClick,
}: CircleProgressBarProps) {
  const calculatedValue = isFeedbackDone ? percent! : 100;
  const progressbarText = isFeedbackDone ? `${percent}%` : TEXT.FEEDBACK;
  const progressbarColor = isFeedbackDone ? COLOR.GREEN._300 : COLOR.PRIMARY;

  return (
    <div className="Progressbar" onClick={onClick}>
      <div className="Progressbar--Wrapper">
        <CircularProgressbar
          value={calculatedValue}
          strokeWidth={14}
          styles={buildStyles({
            pathColor: progressbarColor,
          })}
        />
      </div>

      <div className={classNames('Progressbar--Text', 'font-size-base')}>
        {progressbarText}
      </div>
    </div>
  );
}
