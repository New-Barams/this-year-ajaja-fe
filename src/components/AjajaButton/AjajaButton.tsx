import { Icon } from '@/components';
import { Color, FontSize } from '@/types';
import classNames from 'classnames';
import './index.scss';

interface AjajaButtonProps {
  background: Color;
  color: Color;
  fontSize: FontSize;
  ajajaColor: Color;
  ajajaFontSize: string;
  filled: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export default function AjajaButton({
  background,
  color,
  fontSize,
  ajajaColor,
  ajajaFontSize,
  filled,
  onClick,
  children,
  ...props
}: AjajaButtonProps) {
  return (
    <button
      className={classNames(
        `ajaja-button`,
        `border-origin-${background}`,
        `background-origin-${background}`,
        `color-origin-${color}`,
        `font-size-${fontSize}`,
      )}
      onClick={onClick}
      {...props}>
      <div>
        <Icon name="AJAJA" size="2xl" color={ajajaColor} isFilled={filled} />
        <p
          className={classNames('ajaja-name', `color-origin-${color}`)}
          style={{ fontSize: `${ajajaFontSize}` }}>
          아좌좌
        </p>
      </div>
      {children}
    </button>
  );
}
