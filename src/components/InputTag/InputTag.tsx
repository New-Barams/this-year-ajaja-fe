'use client';

import { FormEvent } from 'react';
import { Tag } from '..';
import './index.scss';

interface InputTagProps {
  style?: React.CSSProperties;
  inputValue: string;
  onSubmit: () => void;
  onChange: (changeValue: string) => void;
}
export default function InputTag({
  style,
  onChange,
  inputValue,
  onSubmit,
  ...props
}: InputTagProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };
  const handleInputSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };
  return (
    <Tag color="orange-200" style={style} {...props}>
      <form className="inputTag" onSubmit={handleInputSubmit}>
        <input
          className="inputTag__tag font-size-base"
          type="text"
          placeholder="태그입력(최대10글자)"
          value={inputValue}
          onChange={handleInputChange}
          maxLength={10}
        />
      </form>
    </Tag>
  );
}
