'use client';

import { Modal, ModalExit } from '@/components';
import { CardPlans } from '@/types/apis/plan/GetAllPlans';
import classNames from 'classnames';
import Link from 'next/link';
import { useState } from 'react';
import Card from '../Card/Card';
import './index.scss';

type PlansProps = {
  flatLoadedPlans: CardPlans[];
  isLogin: boolean;
};

export default function Plans({ flatLoadedPlans, isLogin }: PlansProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleModal = (isOpen: boolean) => {
    if (!isLogin) {
      setIsOpenModal(isOpen);
    }
  };
  return (
    <div className={classNames('plans__wrapper')}>
      {flatLoadedPlans?.map((plan, index) => {
        return (
          <Link
            key={index}
            href={isLogin ? `/plans/${plan.id}` : {}}
            onClick={() => {
              handleModal(true);
            }}
            className={classNames('plans__wrapper--link')}>
            <Card key={index} plan={plan} />
          </Link>
        );
      })}
      {isOpenModal && (
        <Modal>
          <ModalExit
            exitLink={`/login`}
            closeModal={() => {
              setTimeout(() => {
                handleModal(false);
              }, 100);
            }}>
            상세 계획을 보려면 로그인이 필요합니다!<br></br>
            로그인 하시겠습니까?
          </ModalExit>
        </Modal>
      )}
    </div>
  );
}
