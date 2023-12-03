import { Icon } from '@/components';
import { Color } from '@/types';
import { IconName } from '@/types';
import classNames from 'classnames';
import Link from 'next/link';
import './index.scss';

type LinkIconTextProps = {
  link: string;
  iconName: IconName;
  background: Color;
  color: Color;
  isFilled?: boolean;
  border?: Color;
  children: React.ReactNode;
};

export default function LinkIconText({
  link,
  iconName,
  background,
  color,
  isFilled,
  border,
  children,
  ...props
}: LinkIconTextProps) {
  return (
    <Link
      href={link}
      className={classNames(
        `link-icon-text__a`,
        `background-origin-${background}`,
        `color-origin-${color}`,
        `border-round`,
        {
          [`border-origin-${border}`]: border,
        },
      )}
      {...props}>
      <div className={classNames('link-icon-text')}>
        <Icon name={iconName} color={color} isFilled={isFilled} />
        <p
          className={classNames(
            `link-icon-text__text`,
            `color-origin-${color}`,
          )}>
          {children}
        </p>
      </div>
    </Link>
  );
}
