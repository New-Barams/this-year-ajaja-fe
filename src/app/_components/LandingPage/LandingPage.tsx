import { Icon } from '@/components';
import classNames from 'classnames';
import Image from 'next/image';
import './index.scss';

export default function LandingPage() {
  return (
    <div className={classNames('landing__wrapper')}>
      <div className={classNames('font-size-3xl')}>
        <p>혹시 신년 계획 세우셨나요?</p>
        <div className={classNames('landing__logo')}>
          <p>아직이라면,</p>
          <Image
            src="/this-year-ajaja-logo-flat.svg"
            alt="ajaja logo"
            width={303}
            height={44}
          />
        </div>
      </div>
      <div className={classNames('font-size-lg', 'landing__icon-texts')}>
        <div className={classNames('landing__icon-text')}>
          <Icon name="CREATE_NEW_PLAN" isFilled={true} />
          <p>나만의 신년 계획을 만들어요!</p>
        </div>
        <div className={classNames('landing__icon-text')}>
          <Icon name="NOTIFICATION_ON" isFilled={true} />
          <p>주기적으로 계획과 메세지를 리마인드 받아요 ! </p>
        </div>
        <div className={classNames('landing__icon-text')}>
          <Icon name="FEEDBACK" isFilled={true} />
          <p>계획을 잘 지키고 있는지 스스로 피드백해요 ! </p>
        </div>
        <div className={classNames('landing__icon-text')}>
          <Icon name="OTHER_PLAN" isFilled={true} />
          <p>다른 사람의 계획을 둘러보고, 응원해요 ! </p>
        </div>
      </div>
      <div className={classNames('landing__link-icon')}>
        <a href="https://github.com/orgs/New-Barams/repositories">
          <Image src="/github.svg" alt="github logo" width={42} height={42} />
        </a>
        <a href="https://rune-share-5e0.notion.site/New-Barams-ab52862f407d4543a813cb03160e2a66">
          <Image src="/notion.svg" alt="notion logo" width={42} height={42} />
        </a>
      </div>
      <p className={classNames('font-size-xs', 'landing__footer')}>
        법인명 (상호) : 뉴바람스 | 사업자등록번호 : 845-06-02738
      </p>
    </div>
  );
}
