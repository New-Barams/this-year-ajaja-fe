import { ChangeEvent } from 'react';

export default function useEvaluateRadio({
  setEvaluateOption,
}: {
  setEvaluateOption: React.Dispatch<React.SetStateAction<number>>;
}) {
  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEvaluateOption(parseInt(event.target.value, 10));
  };
  return { handleOptionChange };
}
