import classNames from 'classnames';
import { FormEvent, useState } from 'react';
import './index.scss';

interface TagInputProps {
  onSubmit: (text: string) => void;
  classNameList?: string[];
  placeholder?: string;
}
export default function TagInput({
  onSubmit,
  classNameList = [],
  placeholder = '',
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
        onChange={handleChangeValue}
        maxLength={10}
      />
      {placeholder && (
        <label className="tagInput__label" htmlFor="tagInput__input">
          <>
            {`${placeholder}`}{' '}
            <span className="tagInput__label--focus">{`(${inputValue.length}/10)`}</span>
          </>
        </label>
      )}
    </form>
  );
}
