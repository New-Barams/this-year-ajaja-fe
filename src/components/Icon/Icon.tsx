import './index.scss';

type IconName =
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
  | 'HELP'
  | 'DROP_DOWN';

type IconColor = 'background-100' | 'orange-300' | 'gray-100' | 'gray-200';

type IconSize = 'xl' | '2xl' | '4xl' | '9xl';

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
  DROP_DOWN: 'arrow_drop_down',
};

interface IconProps {
  name: IconName;
  size?: IconSize;
  color?: IconColor;
  isFilled?: boolean;
}

export default function Icon({
  name,
  size = 'xl',
  color = 'orange-300',
  isFilled = false,
}: IconProps) {
  return (
    <span
      className={`material-symbols-outlined icon--${size} icon--${color} ${
        isFilled && 'icon--isFilled'
      }`}>
      {ICON_NAME_MAP[name]}
    </span>
  );
}
