import { Icon } from '@/components';
import './index.scss';

interface ProgressGraphProps {
  progressValue: number;
}

export default function ProgressGraph({ progressValue }: ProgressGraphProps) {
  return (
    <div className="progress-graph__line">
      <div className={`progress-graph__value run_${progressValue}`}>
        <Icon
          classNameList={['progress-graph__value--icon']}
          name={(() => {
            if (progressValue <= 32) return 'DIRECTIONS_WALK';
            else if (progressValue <= 65) return 'DIRECTIONS_RUN';
            else if (progressValue === 100) return 'SPORTS_HANDBALL';
            else return 'SPRINT';
          })()}
          size="md"
        />
      </div>
    </div>
  );
}
