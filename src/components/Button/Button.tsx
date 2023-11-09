import { Color } from '@/types';
import classNames from 'classnames';
import './index.scss';

interface ButtonProps {
  background: Color;
  color: Color;
  size: 'lg' | 'md' | 'sm';
  border: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function Button({
  background,
  color,
  size,
  border,
  children,
  onClick,
  ...props
}: ButtonProps) {
  let fontSize;
  switch (size) {
    case 'sm':
      fontSize = 'sm';
      break;
    case 'md':
      fontSize = 'xl';
      break;
    case 'lg':
      fontSize = 'xl';
      break;
  }
  return (
    <button
      className={classNames(
        `button--${size}`,
        border ? `border-origin-${color}` : 'border-none',
        `background-origin-${background}`,
        `color-origin-${color}`,
        `font-size-${fontSize}`,
        `border-round`,
      )}
      onClick={onClick}
      {...props}>
      {children}
    </button>
  );
}
