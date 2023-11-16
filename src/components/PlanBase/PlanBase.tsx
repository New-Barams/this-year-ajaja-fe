'use client';

import { Color } from '@/types';
import { InputTag, PlanInput, Tag } from '..';
import './index.scss';

interface PlanBase {
  isEditable: boolean;
  plan: Plan;
  tagList: Tag[];
  inputTagValue?: string;
  onChangePlanTitle?: (text: string) => void;
  onChangePlanDescription?: (text: string) => void;
  onChangeInputTag?: (text: string) => void;
  onSubmitInputTag?: () => void;
  onClickTag?: (id: string) => void;
}
export type Plan = {
  title: string;
  description: string;
};
export type Tag = {
  id: string;
  text: string;
};
export default function PlanBase({
  isEditable,
  plan,
  tagList,
  onChangePlanTitle,
  onChangePlanDescription,
  inputTagValue = '',
  onChangeInputTag,
  onSubmitInputTag,
  onClickTag,
}: PlanBase) {
  const color: Color[] = [
    'primary',
    'orange-300',
    'green-300',
    'blue-300',
    'purple-300',
  ];
  return (
    <div className="planBase">
      <PlanInput
        kind="title"
        editable={isEditable}
        placeholder={isEditable ? '어떤 계획을 가지고 계신가요?' : ''}
        textInput={plan.title}
        onChangeInput={onChangePlanTitle ? onChangePlanTitle : () => {}}
        maxLength={40}
      />
      <PlanInput
        editable={isEditable}
        kind="content"
        placeholder={isEditable ? '계획에 대해서 자세히 설명해주세요!' : ''}
        textInput={plan.description}
        onChangeInput={
          onChangePlanDescription ? onChangePlanDescription : () => {}
        }
        maxLength={250}
      />
      <div className="planBase__tag">
        {isEditable && (
          <InputTag
            inputValue={inputTagValue}
            onSubmit={onSubmitInputTag ? onSubmitInputTag : () => {}}
            onChange={onChangeInputTag ? onChangeInputTag : () => {}}
          />
        )}
        {tagList.slice(0, 5).map((tag, index) => (
          <Tag
            key={tag.id}
            color={color[index % 5]}
            onClick={
              onClickTag
                ? () => {
                    onClickTag(tag.id);
                  }
                : undefined
            }>
            {tag.text}
          </Tag>
        ))}
      </div>
    </div>
  );
}
