'use client';

import classNames from 'classnames';
import React, { ChangeEvent } from 'react';
import './index.scss';

type kindType = 'title' | 'content';

interface PlanInputProps {
  kind: kindType;
  textInput: string;
  onChangeInput: (text: string) => void;
  placeholder: string;
  maxLength: number;
  editable?: boolean;
}

export default function PlanInput({
  kind,
  textInput,
  onChangeInput,
  placeholder,
  maxLength,
  editable = false,
}: PlanInputProps) {
  const handleChangeInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length <= maxLength) {
      onChangeInput(event.target.value);
    }
  };

  return (
    <div className="planInput--container">
      <textarea
        id="planInput"
        readOnly={!editable}
        value={textInput}
        onChange={handleChangeInput}
        placeholder={placeholder}
        className={classNames(
          'planInput',
          { 'planInput--editable': editable },
          `planInput--${kind === 'content' ? 'content' : 'title'}`,
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
