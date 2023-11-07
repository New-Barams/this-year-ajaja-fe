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
  editable?: boolean;
}

const isPlanType = (kind: kindType) => {
  return kind === 'plan-title' || kind === 'plan-content';
};

export default function TextArea({
  kind,
  textInput,
  onChangeInput,
  placeholder,
  maxLength,
  editable = true,
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
        readOnly={!editable}
        value={textInput}
        onChange={handleChangeInput}
        placeholder={placeholder}
        className={classNames(
          'textArea',
          { 'textArea--editable': editable },
          { 'textArea--plan': isPlanType(kind) }, // placeHolder animation 위해서
          { 'textArea--plan--title': kind === 'plan-title' },
          { 'textArea--plan--content': kind === 'plan-content' },
          { 'textArea--remind': kind === 'remind' },
        )}
      />
      {editable && (
        <label className="textArea--editable--label" htmlFor="textArea">
          {placeholder}
        </label>
      )}
    </div>
  );
}
