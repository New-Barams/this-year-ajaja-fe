'use client';

import classNames from 'classnames';
import React, { ChangeEvent } from 'react';
import './index.scss';

interface RemindInputProps {
  textInput: string;
  onChangeInput?: (text: string) => void;
  placeholder?: string;
  maxLength?: number;
  editable?: boolean;
}

export default function RemindInput({
  textInput,
  onChangeInput,
  placeholder,
  maxLength,
  editable = false,
}: RemindInputProps) {
  const handleChangeInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (maxLength && onChangeInput && event.target.value.length <= maxLength) {
      onChangeInput(event.target.value);
    }
  };

  return editable ? (
    <textarea
      id="remindInput"
      readOnly={false}
      value={textInput}
      onChange={handleChangeInput}
      placeholder={placeholder}
      className={classNames('remindInput')}
    />
  ) : (
    <textarea
      id="remindInput"
      readOnly={true}
      value={textInput}
      className={classNames('remindInput')}
    />
  );
}
