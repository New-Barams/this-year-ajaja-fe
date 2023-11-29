import { Color } from '@/types';
import { useState } from 'react';
import {
  AjajaButton,
  Icon,
  IconSwitchButton,
  InputTag,
  PlanInput,
  Tag,
} from '..';
import './index.scss';

interface WritablePlanProps {
  isEditPage: boolean; // 에디터 페이지인지 여부
  isPublic: boolean; // 현재 계획 공개여부
  onToggleIsPublic: () => void; // 계획 공개여부 변경
  title: string;
  description: string;
  onChangeTitle: (text: string) => void;
  onChangeDescription: (text: string) => void;
  tags: string[];
  changeTags: (tags: string[]) => void; //태그 리스트에 추가,삭제를 위한 삭제를 전체를 넘겨주는 방식
  ajajas?: number;
  isAjajaOn?: boolean;
  canAjaja?: boolean;
  onToggleCanAjaja?: () => void; // api 전송이 아닌 상태변경용
}
export default function WritablePlan({
  isEditPage,
  isPublic,
  onToggleIsPublic,
  title,
  description,
  onChangeTitle,
  onChangeDescription,
  tags,
  changeTags,
  ajajas = 0,
  isAjajaOn = false,
  canAjaja = false,
  onToggleCanAjaja,
}: WritablePlanProps) {
  const [inputTagValue, setInputValue] = useState<string>('');
  const colors: Color[] = [
    'primary',
    'orange-300',
    'green-300',
    'blue-300',
    'purple-300',
  ];
  const handlePopUpGuide = () => {
    console.log('가이드라인');
  };
  const handleRemoveTag = (removedTag: string) => {
    const filterd = tags.filter((tag) => tag !== removedTag);
    changeTags(filterd);
  };
  const handleAddTag = () => {
    const trimed = inputTagValue.trim();
    if (tags.includes(trimed) || tags.length >= 5) {
      setInputValue('');
      return;
    }
    const newTagList = [...tags, trimed];
    changeTags(newTagList);
    setInputValue('');
  };
  return (
    <div className="plan__container">
      <div className="plan__header">
        <h1 className="font-size-3xl">
          {isEditPage ? '계획' : '신년 계획을 작성해 보세요!'}
        </h1>
        <IconSwitchButton
          isActive={isPublic}
          onClick={onToggleIsPublic}
          onIconName="PLAN_OPEN"
          offIconName="PLAN_CLOSE"
        />
        <span className="plan__header--after color-origin-gray-200">
          {isPublic ? '계획 공개' : '계획 비공개'}
        </span>

        <button
          className="plan__header--after--guide-button"
          onClick={handlePopUpGuide}>
          <Icon name="HELP" />
        </button>
      </div>
      <div className="plan__content">
        <PlanInput
          editable={true}
          kind="title"
          placeholder="어떤 계획을 가지고 계신가요?"
          onChangeInput={onChangeTitle}
          maxLength={40}
          textInput={title}
        />
        <PlanInput
          editable={true}
          kind="content"
          placeholder="계획에 대해서 자세히 설명해주세요!"
          onChangeInput={onChangeDescription}
          maxLength={250}
          textInput={description}
        />
        <div>
          <InputTag
            inputValue={inputTagValue}
            onChange={setInputValue}
            onSubmit={handleAddTag}
          />
          {tags.map((tag, index) => (
            <Tag
              key={index}
              color={colors[index % 5]}
              onClick={() => {
                handleRemoveTag(tag);
              }}>
              {tag}
            </Tag>
          ))}
        </div>
      </div>
      {isEditPage && (
        <div className="plan__bottom">
          <AjajaButton
            isFilled={isAjajaOn}
            ajajaCount={ajajas}
            disabled={true}
          />
          <IconSwitchButton
            onIconName="NOTIFICATION_ON"
            offIconName="NOTIFICATION_OFF"
            isActive={canAjaja}
            onClick={onToggleCanAjaja ? onToggleCanAjaja : () => {}}
          />
          <div className="plan__bottom--after color-origin-gray-200 font-size-xs">
            {canAjaja ? (
              <>
                <span>월요일 18:00 마다</span>
                <span>응원 메시지 알림 활성화</span>
              </>
            ) : (
              <span>응원 메세지 알림 비활성화</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
