import { AjajaButton, IconSwitchButton, PlanBase } from '..';
import { Plan, Tag } from '../PlanBase/PlanBase';
import './index.scss';

interface BasicPlanProps {
  isEditable: boolean;
  plan: Plan;
  isPublic: boolean;
  onToggleIsPublic: () => void;
  tagList: Tag[];
  isAjajaOn: boolean;
  ajajaCount: number;
  canAjaja: boolean;
  onToggleCanAjaja: () => void;
  inputTagValue?: string;
  onChangInputTag?: () => void;
  onSubmitInputTag?: () => void;
  onChangePlanTitle?: () => void;
  onChangePlanDescription?: () => void;
  onClickTag?: (id: string) => void;
}
export default function BasicPlan({
  isEditable,
  plan,
  isPublic,
  tagList,
  isAjajaOn,
  ajajaCount,
  canAjaja,
  inputTagValue,
  onToggleIsPublic,
  onToggleCanAjaja,
  onChangePlanDescription,
  onChangInputTag,
  onChangePlanTitle,
  onSubmitInputTag,
  onClickTag,
}: BasicPlanProps) {
  return (
    <div className="BasicPlan">
      <div className="BasicPlan__header">
        <h1 className="font-size-3xl">계획</h1>
        <IconSwitchButton
          isActive={isPublic}
          onIconName="PLAN_OPEN"
          offIconName="PLAN_CLOSE"
          onClick={onToggleIsPublic}
        />
      </div>
      <PlanBase
        isEditable={isEditable}
        plan={plan}
        tagList={tagList}
        onChangeInputTag={onChangInputTag}
        onChangePlanDescription={onChangePlanDescription}
        onChangePlanTitle={onChangePlanTitle}
        onSubmitInputTag={onSubmitInputTag}
        inputTagValue={inputTagValue}
        onClickTag={onClickTag}
      />
      <div className="BasicPlan__bottom">
        <AjajaButton isFilled={isAjajaOn} ajajaCount={ajajaCount} />
        <IconSwitchButton
          isActive={canAjaja}
          onClick={onToggleCanAjaja}
          onIconName="NOTIFICATION_ON"
          offIconName="NOTIFICATION_OFF"
        />
      </div>
    </div>
  );
}
