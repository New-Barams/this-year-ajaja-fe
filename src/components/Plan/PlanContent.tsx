'use client';

import { InputTag, PlanInput, Tag } from '@/components';
import { Color } from '@/types';
import './index.scss';

interface PlanContentProps {
  editable: boolean;
  plan: Plan;
  inputTagValue: string;
  tags: string[];
  onChangeTitle: () => void;
  onChangeContent: () => void;
  onChangeInputTag: (value: string) => void;
  onInputTagSubmit: () => void;
  removeTag: (tagIndex: number) => void;
}
interface Plan {
  title: string;
  content: string;
}

export default function PlanContent({
  editable,
  plan,
  tags,
  onChangeTitle,
  onChangeContent,
  onChangeInputTag,
  onInputTagSubmit,
  inputTagValue,
  removeTag,
}: PlanContentProps) {
  const color: Color[] = [
    'primary',
    'orange-300',
    'green-300',
    'blue-300',
    'purple-300',
  ];
  return (
    <div className="planContent__container">
      <PlanInput
        kind="title"
        textInput={plan.title}
        onChangeInput={onChangeTitle}
        placeholder="어떤계획을 가지고 계신가요?"
        maxLength={40}
        editable={editable}
      />
      <PlanInput
        kind="content"
        textInput={plan.content}
        onChangeInput={onChangeContent}
        maxLength={250}
        placeholder="계획에 대해서 자세히 설명해주세요!"
        editable={editable}
      />
      <div className="planContent__tags">
        {editable && (
          <InputTag
            onSubmit={onInputTagSubmit}
            inputValue={inputTagValue}
            onChange={onChangeInputTag}
          />
        )}
        {tags.map((tag, index) => (
          <Tag
            key={index}
            color={color[index % 5]}
            onClick={() => removeTag(index)}>
            {tag}
          </Tag>
        ))}
      </div>
    </div>
  );
}
