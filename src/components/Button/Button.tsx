import { Color, FontSize } from '@/types';
import classNames from 'classnames';
import './index.scss';

interface ButtonProps {
  background: Color;
  color: Color;
  fontSize: FontSize;
  size: 'lg' | 'md' | 'sm';
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function Button({
  background,
  color,
  fontSize,
  size,
  children,
  onClick,
  ...props
}: ButtonProps) {
  return (
    <button
      className={classNames(
        `button--${size}`,
        `border-origin-${color}`,
        `background-origin-${background}`,
        `color-origin-${color}`,
        `font-size-${fontSize}`,
      )}
      onClick={onClick}
      {...props}>
      {children}
    </button>
  );
}
