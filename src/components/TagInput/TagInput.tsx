'use client';

import classNames from 'classnames';
import { FormEvent, useState } from 'react';
import './index.scss';

interface TagInputProps {
  onSubmit: (text: string) => void;
  disabled?: boolean;
  classNameList?: string[];
  placeholder?: string;
}
export default function TagInput({
  onSubmit,
  classNameList = [],
  placeholder = '',
  disabled = false,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 10) return;
    setInputValue(event.target.value);
  };
  const handleInputSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimed = inputValue.trim();
    onSubmit(trimed);
    setInputValue('');
  };

  return (
    <form
      className={classNames(classNameList, 'tagInput')}
      onSubmit={handleInputSubmit}>
      <input
        id="tagInput__input"
        className="tagInput__input font-size-sm"
        value={inputValue}
        placeholder=""
        disabled={disabled}
        onChange={handleChangeValue}
        maxLength={10}
      />
      {placeholder && (
        <label
          className={classNames('tagInput__label')}
          htmlFor="tagInput__input">
          <>
            {disabled ? (
              <span className="color-origin-primary">
                태그는 최대 5개까지 입니다.
              </span>
            ) : (
              <span>{`${placeholder}(${inputValue.length}/10글자)`}</span>
            )}
          </>
        </label>
      )}
    </form>
  );
}
