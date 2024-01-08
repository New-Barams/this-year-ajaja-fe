import classNames from 'classnames';
import { ChangeEvent } from 'react';

type EvaluateRadioProps = {
  evaluateOption: number;
  setEvaluateOption: React.Dispatch<React.SetStateAction<number>>;
};

type Option = {
  value: string;
  label: string;
};

export default function EvaluateRadio({
  evaluateOption,
  setEvaluateOption,
}: EvaluateRadioProps) {
  const options: Option[] = [
    { value: '100', label: '매우 잘함 (100%)' },
    { value: '75', label: '잘 함 (75%)' },
    { value: '50', label: '보통 (50%)' },
    { value: '25', label: '대체로 못함 (25%)' },
    { value: '0', label: '전혀 못함 (0%)' },
  ];

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEvaluateOption(parseInt(event.target.value, 10));
  };

  return (
    <div className={classNames('evaluate-radio')}>
      {options.map((option) => (
        <>
          <label key={option.value}>
            <input
              type="radio"
              value={option.value}
              checked={evaluateOption === parseInt(option.value, 10)}
              onChange={handleOptionChange}
            />
            {option.label}
          </label>
          <br></br>
        </>
      ))}
    </div>
  );
}
