import { COLOR } from '@/constants';
import classNames from 'classnames';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import './index.scss';

interface CircleProgressBarProps {
  isFeedbackDone: boolean;
  percent?: number;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
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
  const progressbarColor = isFeedbackDone ? COLOR.GREEN_300 : COLOR.PRIMARY;

  return (
    <div
      className={classNames('Progressbar', onClick && 'Progressbar--pointer')}
      onClick={onClick}>
      <div className="Progressbar__Wrapper">
        <CircularProgressbar
          value={calculatedValue}
          strokeWidth={14}
          styles={buildStyles({
            pathColor: progressbarColor,
          })}
        />
      </div>

      <div className={classNames('Progressbar__Text', 'font-size-base')}>
        {progressbarText}
      </div>
    </div>
  );
}
