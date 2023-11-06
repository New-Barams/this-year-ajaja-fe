import { FormEvent, useState } from 'react';
import { Tag } from '..';
import './index.scss';

interface InputTagProps {
  style?: React.CSSProperties;
  onSubmit: (submitValue: string) => void;
}
export default function InputTag({ style, onSubmit, ...props }: InputTagProps) {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleInputSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(inputValue);
    setInputValue('');
  };
  return (
    <Tag color="orange-200" style={style} {...props}>
      <form onSubmit={handleInputSubmit}>
        <input
          type="text"
          placeholder="태그를 입력해주세요"
          value={inputValue}
          onChange={handleInputChange}
        />
      </form>
    </Tag>
  );
}
