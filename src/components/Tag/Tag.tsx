import { Color } from '@/types';
import classNames from 'classnames';
import './index.scss';

interface TagProps {
  color?: Color;
  style?: React.CSSProperties;
  children: React.ReactNode;
  classNameList?: string[];
  onClick?: (event?: React.MouseEvent) => void;
}

export default function Tag({
  children,
  color = 'primary',
  style,
  classNameList = [],
  onClick,
  ...props
}: TagProps) {
  return (
    <div
      className={classNames(
        `tag`,
        `background-origin-${color}`,
        {
          pointer: onClick,
        },
        classNameList,
      )}
      style={{ ...style }}
      onClick={onClick}
      {...props}>
      {children}
    </div>
  );
}
