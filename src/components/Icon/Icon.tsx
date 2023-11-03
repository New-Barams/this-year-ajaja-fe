import './index.scss';

export type IconName =
  | 'CREATE_NEW_PLAN'
  | 'NOTIFICATION_ON'
  | 'NOTIFICATION_OFF'
  | 'PLAN_OPEN'
  | 'PLAN_CLOSE'
  | 'ITEM_OPEN'
  | 'ITEM_CLOSE'
  | 'OTHER_PLAN'
  | 'PROFILE'
  | 'WARNING'
  | 'AJAJA'
  | 'REFRESH'
  | 'HELP';

const ICON_NAME_MAP = {
  CREATE_NEW_PLAN: 'add',
  NOTIFICATION_ON: 'notifications',
  NOTIFICATION_OFF: 'notifications_off',
  PLAN_OPEN: 'lock_open',
  PLAN_CLOSE: 'lock',
  ITEM_OPEN: 'expand_more',
  ITEM_CLOSE: 'expand_less',
  OTHER_PLAN: 'calendar_month',
  PROFILE: 'account_circle',
  WARNING: 'error',
  AJAJA: 'local_fire_department',
  REFRESH: 'refresh',
  HELP: 'help',
};

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  isFilled?: boolean;
}

export default function Icon({
  name,
  size = 1,
  color = 'black',
  isFilled = false,
}: IconProps) {
  return (
    <span
      className={`material-symbols-outlined icon size ${color} ${size} ${
        isFilled && 'isFilled'
      }`}>
      {ICON_NAME_MAP[name]}
    </span>
  );
}
