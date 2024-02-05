import { options } from '@/constants';
import { EvaluateRadioProps } from '@/types';
import classNames from 'classnames';
import { useEvaluateRadio } from './hooks';

export default function EvaluateRadio({
  evaluateOption,
  setEvaluateOption,
}: EvaluateRadioProps) {
  const { handleOptionChange } = useEvaluateRadio({ setEvaluateOption });
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
