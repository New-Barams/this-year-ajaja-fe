'use client';

import { useState } from 'react';
import './index.scss';

interface SwitchButtonProps {
  onClick: (isChecked: boolean) => void;
}
const SwitchButton = ({ onClick }: SwitchButtonProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const handleChange = () => {
    setIsChecked(!isChecked);
    onClick(!isChecked);
  };
  return (
    <label className="switch">
      <input type="checkbox" checked={isChecked} onChange={handleChange} />
      <span className="slider round"></span>
    </label>
  );
};
export default SwitchButton;
