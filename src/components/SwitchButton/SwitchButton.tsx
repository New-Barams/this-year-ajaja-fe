'use client';

import { useState } from 'react';
import './index.scss';

interface SwitchButtonProps {
  isOn?: boolean;
  onClick: (isChecked: boolean) => void;
  children?: React.ReactNode;
}
export default function SwitchButton({
  onClick,
  isOn = false,
  children,
}: SwitchButtonProps) {
  const [isChecked, setIsChecked] = useState<boolean>(isOn);
  const handleChange = () => {
    setIsChecked(!isChecked);
    onClick(!isChecked);
  };
  return (
    <label className="switch">
      <input type="checkbox" checked={isChecked} onChange={handleChange} />
      <span className="slider round">{children}</span>
    </label>
  );
}
