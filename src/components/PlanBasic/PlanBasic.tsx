'use client';

import { Color } from '@/types';
import { InputTag, PlanInput, Tag } from '..';
import './index.scss';

interface PlanBasic {
  isEditable: boolean;
  plan: Plan;
  tagList: Tag[];
  inputTagValue?: string;
  onChangePlanTitle?: (text: string) => void;
  onChangePlanDescription?: (text: string) => void;
  onChangeInputTag?: (text: string) => void;
  onSubmitInputTag?: () => void;
  removeTag?: (id: number) => void;
}
type Plan = {
  title: string;
  description: string;
};
type Tag = {
  id: number;
  text: string;
};
export default function PlanBasic({
  isEditable,
  plan,
  tagList,
  onChangePlanTitle,
  onChangePlanDescription,
  inputTagValue = '',
  onChangeInputTag,
  onSubmitInputTag,
  removeTag,
}: PlanBasic) {
  const color: Color[] = [
    'primary',
    'orange-300',
    'green-300',
    'blue-300',
    'purple-300',
  ];
  return (
    <div className="planBasic">
      <PlanInput
        kind="title"
        placeholder={isEditable ? '어떤 계획을 가지고 계신가요?' : ''}
        textInput={plan.title}
        onChangeInput={onChangePlanTitle ? onChangePlanTitle : () => {}}
        maxLength={40}
      />
      <PlanInput
        kind="content"
        placeholder={isEditable ? '계획에 대해서 자세히 설명해주세요!' : ''}
        textInput={plan.description}
        onChangeInput={
          onChangePlanDescription ? onChangePlanDescription : () => {}
        }
        maxLength={250}
      />
      <div className="planBasic__tag">
        {isEditable && (
          <InputTag
            inputValue={inputTagValue}
            onSubmit={onSubmitInputTag ? onSubmitInputTag : () => {}}
            onChange={onChangeInputTag ? onChangeInputTag : () => {}}
          />
        )}
        {tagList.map((tag, index) => (
          <Tag
            key={tag.id}
            color={color[index % 5]}
            onClick={
              removeTag
                ? () => {
                    removeTag(tag.id);
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
