import { Color } from '@/types';
import classNames from 'classnames';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import './index.scss';

interface ButtonProps
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  background: Color;
  color: Color;
  size?: 'lg' | 'md' | 'sm';
  border: boolean;
  classNameList?: string[];
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function Button({
  background,
  color,
  border,
  classNameList = [],
  children,
  onClick,
  ...props
}: ButtonProps) {
  return (
    <button
      className={classNames(
        `button`,
        border ? `border-origin-${color}` : 'border-none',
        `background-origin-${background}`,
        `color-origin-${color}`,
        `font-size-base`,
        `border-round`,
        classNameList,
      )}
      onClick={onClick}
      {...props}>
      {children}
    </button>
  );
}
