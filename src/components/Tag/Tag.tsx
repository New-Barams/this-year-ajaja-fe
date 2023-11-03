import './index.scss';

/*
props: 
text=> string
color는 타입으로 받기 
style
*/
//
type color = 'primary1' | 'primary2' | 'primary3' | 'primary4' | 'primary5';

interface TagProps {
  color?: color;
  style?: React.CSSProperties;
  children: React.ReactNode;
  onClick?: (event?: React.MouseEvent) => void;
}

const Tag = ({ children, color = 'primary1', style, onClick }: TagProps) => {
  return (
    <div className={`tag ${color}`} style={{ ...style }} onClick={onClick}>
      {children}
    </div>
  );
};
export default Tag;
