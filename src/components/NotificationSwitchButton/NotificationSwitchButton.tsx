'use client';

import { SwitchButton } from '..';
import Icon from '../Icon/Icon';
import './index.scss';

interface NotificationSwitchButtonProps {
  onClick: () => void;
}
export default function NotificationSwitchButton({
  onClick,
}: NotificationSwitchButtonProps) {
  return (
    <SwitchButton onClick={onClick} isOn={false}>
      <div className="iconWrapper">
        <div className={`icon__off`}>
          <Icon name="NOTIFICATION_OFF" color="gray-300" />
        </div>
        <div className="icon__on">
          <Icon name="NOTIFICATION_ON" color="gray-300" />
        </div>
      </div>
    </SwitchButton>
  );
}
