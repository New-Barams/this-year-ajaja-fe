import { Icon, Tag } from '@/components/';
import classNames from 'classnames';
import './index.scss';

interface DeletableTagProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  classNameList?: string[];
}
export default function DeletableTag({
  children,
  onClick,
  classNameList = [],
}: DeletableTagProps) {
  return (
    <Tag
      onClick={onClick}
      className={classNames('deletableTag', 'font-size-sm', classNameList)}>
      <>
        {children}
        <Icon size="xs" color="primary" name="CANCEL" isFilled />
      </>
    </Tag>
  );
}
