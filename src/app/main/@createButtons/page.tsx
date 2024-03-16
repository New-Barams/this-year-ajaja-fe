import { Icon } from '@/components';
import Link from 'next/link';
import './index.scss';

export default function page() {
  return (
    //TODO 버튼 활성화 여부 적용해주고 안되면 toast처리
    <div className="create-buttons__container">
      <Link href={'/'} className="outside-box create-buttons__button">
        <h1 className="create-buttons__button--name">계획 작성{' >'}</h1>
        <div className="create-buttons__button--description">
          <p className="create-buttons__button--description--text">
            신년 계획을 <br /> 작성 <br />
            해볼까요?
          </p>
          <Icon name="CREATE_NEW_PLAN" isFilled={true} size="3xl" />
        </div>
      </Link>
      <Link href={'/'} className="outside-box create-buttons__button">
        <h1 className="create-buttons__button--name">발자취 작성{' >'}</h1>
        <div className="create-buttons__button--description">
          <p className="create-buttons__button--description--text">
            계획에 대한 <br />
            발자취를
            <br />
            작성 해볼까요?
          </p>
          <Icon name="BAREFOOT" isFilled={true} size="3xl" />
        </div>
      </Link>
    </div>
  );
}
