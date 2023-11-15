import { AjajaButton, IconSwitchButton } from '..';
import PlanBasic, { Plan, Tag } from '../PlanBasic/PlanBasic';
import './index.scss';

interface ReadablePlanProps {
  plan: Plan;
  isPublic: boolean;
  toggleIsPublic: () => void;
  tagList: Tag[];
  isAjajaOn: boolean;
  ajajaCount: number;
  canAjaja: boolean;
  toggleCanAjaja: () => void;
}
export default function ReadablePlan({
  plan,
  isPublic,
  toggleIsPublic,
  tagList,
  isAjajaOn,
  ajajaCount,
  canAjaja,
  toggleCanAjaja,
}: ReadablePlanProps) {
  return (
    <div className="readablePlan">
      <div className="readablePlan__header">
        <h1 className="font-size-3xl">계획</h1>
        <IconSwitchButton
          isActive={isPublic}
          onIconName="PLAN_OPEN"
          offIconName="PLAN_CLOSE"
          onClick={toggleIsPublic}
        />
      </div>
      <PlanBasic isEditable={false} plan={plan} tagList={tagList} />
      <div className="readablePlan__bottom">
        <AjajaButton isFilled={isAjajaOn} ajajaCount={ajajaCount} />
        <IconSwitchButton
          isActive={canAjaja}
          onClick={toggleCanAjaja}
          onIconName="NOTIFICATION_ON"
          offIconName="NOTIFICATION_OFF"
        />
      </div>
    </div>
  );
}
