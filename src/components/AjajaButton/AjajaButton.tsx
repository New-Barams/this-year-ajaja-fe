import { Icon } from '@/components';
import classNames from 'classnames';
import './index.scss';

interface AjajaButtonProps {
  isFilled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export default function AjajaButton({
  isFilled,
  onClick,
  children,
  ...props
}: AjajaButtonProps) {
  return (
    <button
      className={classNames(
        `ajaja-button`,
        `background-origin-white-200`,
        `color-origin-gray-300`,
        `font-size-base`,
      )}
      onClick={onClick}
      {...props}>
      <div>
        <Icon
          name="AJAJA"
          size="2xl"
          color={isFilled ? 'primary' : 'gray-100'}
          isFilled={isFilled}
        />
        <p
          className={classNames('ajaja-name', `color-origin-gray-300`)}
          style={{ fontSize: '0.375rem' }}>
          아좌좌
        </p>
      </div>
      {children}
    </button>
  );
}
