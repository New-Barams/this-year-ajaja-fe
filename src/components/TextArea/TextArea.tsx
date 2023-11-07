'use client';

import classNames from 'classnames';
import React, { ChangeEvent } from 'react';

type kindType = 'plan-title' | 'plan-content' | 'remind';

interface TextAreaProps {
  kind: kindType;
  textInput: string;
  placeholder: string;
  maxLength: number;
  onChangeText: (text: string) => void;
}

export default function TextArea({
  kind,
  textInput,
  placeholder,
  maxLength,
  onChangeText,
}: TextAreaProps) {
  const handleChangeInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (1) {
      onChangeText(event.target.value);
      console.log(placeholder);
      console.log(maxLength);
    }
  };

  return (
    <textarea
      value={textInput}
      onChange={handleChangeInput}
      className={classNames(
        'textArea',
        { 'textArea--plan-title': kind === 'plan-title' },
        { 'textArea--plan-content': kind === 'plan-content' },
        { 'textArea--remind': kind === 'remind' },
      )}
    />
  );
}
