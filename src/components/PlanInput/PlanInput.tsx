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
  nextTextAreaRef: RefObject<HTMLTextAreaElement>;
}

export default function PlanInput({
  kind,
  textInput,
  onChangeInput,
  placeholder,
  maxLength,
  editable = false,
  nextTextAreaRef,
}: PlanInputProps) {
  const handleChangeInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length <= maxLength) {
      onChangeInput(event.target.value);
    }
  };

  // Enter 키를 눌렀을 때 호출되는 함수
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (kind === 'title' && event.key === 'Enter') {
      event.preventDefault();
      if (nextTextAreaRef.current) {
        nextTextAreaRef.current.focus();
      }
    }
  };

  return (
    <div className="planInput--container">
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
          { 'planInput--editable': editable },
          { 'planInput--disabled': !editable },
        )}
      />
      {editable && (
        <label
          className={classNames(
            'planInput--editable__label',
            `planInput--editable__label--${kind}`,
          )}
          htmlFor="planInput">
          {placeholder}
        </label>
      )}
    </div>
  );
}
