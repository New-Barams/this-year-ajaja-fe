'use client';

import classNames from 'classnames';
import React, { ChangeEvent } from 'react';
import './index.scss';

type kindType = 'plan-title' | 'plan-content' | 'remind';

interface TextAreaProps {
  kind: kindType;
  textInput: string;
  onChangeInput: (text: string) => void;
  placeholder: string;
  maxLength: number;
  readOnly?: boolean;
}

const isPlanType = (kind: kindType) => {
  // plan type인지 확인해 이때만 placeHolder 올라가도록
  return kind === 'plan-title' || kind === 'plan-content';
};

export default function TextArea({
  kind,
  textInput,
  onChangeInput,
  placeholder,
  maxLength,
  readOnly = false,
}: TextAreaProps) {
  const handleChangeInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length <= maxLength) {
      onChangeInput(event.target.value);
    }
  };

  return (
    <div className="form-input">
      <textarea
        id="textArea"
        readOnly={readOnly}
        value={textInput}
        onChange={handleChangeInput}
        placeholder={placeholder}
        className={classNames(
          'textArea',
          { 'textArea--plan': isPlanType(kind) }, // placeHolder animation 위해서
          { 'textArea--plan--title': kind === 'plan-title' },
          { 'textArea--plan--content': kind === 'plan-content' },
          { 'textArea--remind': kind === 'remind' },
        )}
      />
      <label className="textArea--label" htmlFor="textArea">
        {placeholder}
      </label>
    </div>
  );
}
