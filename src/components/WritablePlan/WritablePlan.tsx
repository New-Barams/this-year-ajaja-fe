import { Icon, IconSwitchButton, PlanBase } from '..';
import { Plan, Tag } from '../PlanBase/PlanBase';
import './index.scss';

interface WritablePlanProps {
  isPublic: boolean;
  tagList: Tag[];
  toggleIsPublic: () => void;
  plan: Plan;
  onChangeTitle: (text: string) => void;
  onChangeDescription: (text: string) => void;
  inputTagValue: string;
  onChangeInputTag: (text: string) => void;
  onSubmitInputTag: () => void;
  onClickTag: (id: string) => void;
}
export default function WritablePlan({
  isPublic,
  toggleIsPublic,
  plan,
  onChangeDescription,
  onChangeTitle,
  inputTagValue,
  onChangeInputTag,
  onSubmitInputTag,
  tagList,
  onClickTag,
}: WritablePlanProps) {
  return (
    <div className="writablePlan">
      <div className="writablePlan__header">
        <h1 className="font-size-3xl">신년 계획을 작성해보세요!</h1>
        <IconSwitchButton
          isActive={isPublic}
          onIconName="PLAN_OPEN"
          offIconName="PLAN_CLOSE"
          onClick={toggleIsPublic}
        />
        <div
          className="help_button"
          onClick={() => {
            //TODO 작성팁 안내
            console.log('작성팁 안내');
          }}>
          <Icon
            classNameList={['questionMarkIcon']}
            name="HELP"
            color="gray-300"
          />
        </div>
      </div>
      <PlanBase
        isEditable={true}
        plan={plan}
        onChangePlanDescription={onChangeDescription}
        onChangePlanTitle={onChangeTitle}
        onSubmitInputTag={onSubmitInputTag}
        onChangeInputTag={onChangeInputTag}
        inputTagValue={inputTagValue}
        tagList={tagList}
        onClickTag={onClickTag}
      />
    </div>
  );
}
