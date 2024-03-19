import './index.scss';

interface NoDataProps {
  description: string;
}
export default function NoData({ description }: NoDataProps) {
  return (
    <div className="no-data__container">
      <p className="no-data__description">{description}</p>
    </div>
  );
}
