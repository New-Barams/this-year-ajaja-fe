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

const COLOR = {
  PRIMARY: '#F76C5E',
  GREEN: '#58B368',
};

export default function CircleProgressBar({
  isFeedbackDone,
  percent,
  onClick,
}: CircleProgressBarProps) {
  const calculatedValue = isFeedbackDone ? percent! : 100;
  const progressbarText = isFeedbackDone ? `${percent}%` : TEXT.FEEDBACK;
  const progressbarColor = isFeedbackDone ? COLOR.GREEN : COLOR.PRIMARY;

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
