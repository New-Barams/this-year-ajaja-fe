'use client';

import { Icon, SwitchButton } from '@/components';
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
  return (
    <SwitchButton onClick={onClick} isOn={isActive}>
      <div className="icon__wrapper">
        <div>
          <Icon name={offIconName} color="gray-300" />
        </div>
        <div>
          <Icon name={onIconName} color="gray-300" />
        </div>
      </div>
    </SwitchButton>
  );
}
