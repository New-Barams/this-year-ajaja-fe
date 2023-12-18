import { Button, Icon } from '@/components';
import { useModalClose } from '@/hooks/useModalClose';
import { ReceiveType } from '@/types/apis/users/GetUserInformation';
import classNames from 'classnames';
import { FormEvent, useRef } from 'react';
import './index.scss';

type ModalRemindWayProps = {
  receiveType: ReceiveType;
  onClickYes: (checked: ReceiveType) => void;
  onClickNo: () => void;
  confirmSentence: string;
  children: React.ReactNode;
  isPending?: boolean;
};

export default function ModalRemindWay({
  onClickYes,
  onClickNo,
  confirmSentence,
  receiveType,
  children,
  isPending = false,
}: ModalRemindWayProps) {
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  useModalClose(backgroundRef, onClickNo);
  return (
    <div
      className={classNames(
        `modal-remindway__wrapper`,
        'background-origin-white-100',
        'border-round',
      )}
      ref={backgroundRef}>
      <div className={classNames(`modal-remindway__content`)}>
        <div
          className={classNames(
            `font-size-lg`,
            `modal-remindway__content--header`,
          )}>
          {children}
        </div>
        <form
          className="modal-remindway__content--radio"
          onSubmit={(event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const checked = event.currentTarget.receiveType.value;
            onClickYes(checked);
          }}>
          <div className="modal-remindway__content--radio--items">
            <label className="modal-remindway__content--radio--item">
              <input
                disabled={isPending}
                type="radio"
                name="receiveType"
                value="email"
                defaultChecked={receiveType === 'email'}
              />
              이메일
            </label>
            <label className="modal-remindway__content--radio--item">
              <input
                disabled={isPending}
                type="radio"
                name="receiveType"
                value="kakao"
                defaultChecked={receiveType === 'kakao'}
              />
              카카오톡
            </label>
            <label className="modal-remindway__content--radio--item">
              <input
                disabled={isPending}
                type="radio"
                name="receiveType"
                value="both"
                defaultChecked={receiveType === 'both'}
              />
              카카오톡+이메일
            </label>
          </div>

          <div className="alert-text">
            <Icon name="WARNING" size="lg" />
            <span className="color-origin-primary">
              이메일로 리마인드를 받기 위해서는 이메일 인증이 필요합니다.
            </span>
          </div>

          <div className={classNames(`modal-remindway__content--button`)}>
            <Button
              type="submit"
              background="primary"
              color="white-100"
              border={false}>
              {confirmSentence}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
