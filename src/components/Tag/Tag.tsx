import './index.scss';

type color = 'primary' | 'blue' | 'green' | 'purple' | 'orange';

interface TagProps {
  color?: color;
  style?: React.CSSProperties;
  children: React.ReactNode;
  onClick?: (event?: React.MouseEvent) => void;
}

const Tag = ({
  children,
  color = 'primary',
  style,
  onClick,
  ...props
}: TagProps) => {
  return (
    <div
      className={`tag tag--${color} ${onClick ? 'pointer' : ''}`}
      style={{ ...style }}
      onClick={onClick}
      {...props}>
      {children}
    </div>
  );
};
export default Tag;
