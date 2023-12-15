import classNames from 'classnames';
import React from 'react';
import './index.scss';

interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  classNameList?: string[];
}

export default function Tag({
  children,
  classNameList = [],
  ...props
}: TagProps) {
  return (
    <div
      className={classNames(
        `tag`,
        'font-size-sm',
        classNameList,
        props.onClick ? 'pointer' : '',
      )}
      {...props}>
      #{children}
    </div>
  );
}
