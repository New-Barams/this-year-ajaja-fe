'use client';

import classNames from 'classnames';
import React, { ChangeEvent, KeyboardEvent, RefObject } from 'react';
import './index.scss';

type kindType = 'title' | 'content';

interface PlanInputProps {
  kind: kindType;
  textInput: string;
  onChangeInput: (text: string) => void;
  placeholder: string;
  maxLength: number;
  editable?: boolean;
  nextTextAreaRef?: RefObject<HTMLTextAreaElement>;
  classNameList?: string[];
}

export default function PlanInput({
  kind,
  textInput,
  onChangeInput,
  placeholder,
  maxLength,
  editable = false,
  nextTextAreaRef,
  classNameList = [],
}: PlanInputProps) {
  const handleChangeInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length <= maxLength) {
      onChangeInput(event.target.value);
    }
  };

  // 계획 제목 input에서 enter 클릭 시 계획 내용 input으로 이동시켜주는 함수
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (nextTextAreaRef && kind === 'title' && event.key === 'Enter') {
      event.preventDefault();
      if (nextTextAreaRef.current) {
        nextTextAreaRef.current.focus();
      }
    }
  };

  return (
    <div className={classNames('planInput--container', classNameList)}>
      <textarea
        id="planInput"
        ref={kind === 'content' ? nextTextAreaRef : null}
        readOnly={!editable}
        disabled={!editable}
        value={textInput}
        onChange={handleChangeInput}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={classNames(
          'planInput',
          `planInput--${kind === 'content' ? 'content' : 'title'}`,
          `planInput--${editable ? 'editable' : 'disabled'}`,
        )}
      />
      {editable && (
        <label
          className={classNames(
            'planInput--editable__label',
            `planInput--editable__label--${kind}`,
          )}
          htmlFor="planInput">
          {`${placeholder} (${textInput.length}/${maxLength}글자)`}
        </label>
      )}
    </div>
  );
}
