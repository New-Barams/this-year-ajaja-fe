import './index.scss';

/*
props: 
text=> string
color는 타입으로 받기 
style
*/
//
type color = 'red' | 'orange' | 'blue';

interface TagProps {
  color?: color;
  style?: React.CSSProperties;
  children: React.ReactNode;
  onClick?: (event?: React.MouseEvent) => void;
}

const Tag = ({ children, color = 'red', style, onClick }: TagProps) => {
  return (
    <div className={`tag ${color}`} style={{ ...style }} onClick={onClick}>
      {children}
    </div>
  );
};
export default Tag;
