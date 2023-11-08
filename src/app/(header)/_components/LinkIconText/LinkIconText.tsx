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
  children: React.ReactNode;
};

export default function LinkIconText({
  link,
  iconName,
  background,
  color,
  isFilled,
  children,
  ...props
}: LinkIconTextProps) {
  return (
    <div
      className={classNames(
        'link-icon-text',
        `background-origin-${background}`,
        `color-origin-${color}`,
        `border-round`,
        `font-size-base`,
      )}>
      <Link href={link} className={classNames(`link-icon-text__a`)} {...props}>
        <Icon name={iconName} color={color} isFilled={isFilled} />
        <p
          className={classNames(
            `link-icon-text__text`,
            `color-origin-${color}`,
          )}>
          {children}
        </p>
      </Link>
    </div>
  );
}
