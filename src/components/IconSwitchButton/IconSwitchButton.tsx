'use client';

import { Icon, SwitchButton } from '@/components';
import { useState } from 'react';
import './index.scss';

type OnIconName = 'NOTIFICATION_ON' | 'PLAN_OPEN';
type OffIconName = 'NOTIFICATION_OFF' | 'PLAN_CLOSE';
interface IconSwitchButtonProps {
  onIconName: OnIconName;
  offIconName: OffIconName;
  onClick: () => void;
  isActive: boolean;
}
export default function IconSwitchButton({
  onIconName,
  offIconName,
  onClick,
  isActive = false,
}: IconSwitchButtonProps) {
  const [isOn, setIsOn] = useState<boolean>(isActive);
  const handleClick = () => {
    setIsOn(!isOn);
    onClick();
  };
  return (
    <SwitchButton onClick={handleClick} isOn={isOn}>
      <div className="icon__wrapper">
        <Icon
          name={offIconName}
          color={isOn ? 'white-100' : 'gray-100'}
          size="sm"
        />

        <Icon
          name={onIconName}
          color={isOn ? 'primary' : 'white-100'}
          size="sm"
        />
      </div>
    </SwitchButton>
  );
}
