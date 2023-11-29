import { Color } from '@/types';
import classNames from 'classnames';
import './index.scss';

interface TagProps {
  color?: Color;
  style?: React.CSSProperties;
  children: React.ReactNode;
  onClick?: (event?: React.MouseEvent) => void;
}

export default function Tag({
  children,
  color = 'primary',
  style,
  onClick,
  ...props
}: TagProps) {
  return (
    <div
      className={classNames(`tag`, `background-origin-${color}`, {
        pointer: onClick,
      })}
      style={{ ...style }}
      onClick={onClick}
      {...props}>
      {children}
    </div>
  );
}
