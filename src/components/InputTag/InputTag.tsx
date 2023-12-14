'use client';

import { FormEvent, useRef } from 'react';
import './index.scss';

interface InputTagProps {
  onSubmit: (inputValue: string) => void;
}
export default function InputTag({ onSubmit }: InputTagProps) {
  const input = useRef<null | HTMLInputElement>(null);
  const handleInputSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input && input.current) {
      onSubmit(input.current.value);
      input.current.value = '';
    }
  };
  return (
    <form className="inputTag" onSubmit={handleInputSubmit}>
      <input
        ref={input}
        className="inputTag__input font-size-sm"
        type="text"
        placeholder="태그를 입력해 주세요"
        maxLength={10}
      />
    </form>
  );
}
