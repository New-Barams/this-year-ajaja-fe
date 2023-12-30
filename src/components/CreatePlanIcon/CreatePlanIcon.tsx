'use client';

import { SESSION_STORAGE_KEY, planIcons } from '@/constants';
import { useScroll } from '@/hooks/useScroll';
import classNames from 'classnames';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { CreatePlanIconExample, Modal, ModalSelectIcon } from '..';
import { useSessionStorage } from './../../hooks/useSessionStorage';
import './index.scss';

interface CreatePlanIconProps {
  setIsFirstStepDataAllExist: (isExist: boolean) => void;
}

export default function CreatePlanIcon({
  setIsFirstStepDataAllExist,
}: CreatePlanIconProps) {
  const [iconNumber, setIconNumber] = useSessionStorage<number | null>({
    key: SESSION_STORAGE_KEY.STEP_1,
    initialValue: null,
  });

  useEffect(() => {
    if (iconNumber) {
      setIsFirstStepDataAllExist(true);
    } else {
      setIsFirstStepDataAllExist(false);
    }
  }, [iconNumber, setIsFirstStepDataAllExist]);

  const { handleScroll, scrollableRef } = useScroll();

  const [isSelectIconModalOpen, setIsSelectIconModalOpen] = useState(false);

  return (
    <div
      className={classNames('create-plan-icon')}
      ref={scrollableRef}
      onScroll={handleScroll}>
      <div
        className={classNames('create-plan-icon__question', 'font-size-base')}>
        계획을 대표할 아이콘을 정해볼까요?
      </div>

      {iconNumber ? (
        <>
          <Image
            src={`/animal/${planIcons[iconNumber]}.png`}
            width={90}
            height={90}
            alt="Plan Icon"
            className={classNames('create-plan-icon__icon-image')}
            onClick={() => {
              setIsSelectIconModalOpen(true);
            }}
          />
          <div
            className={classNames(
              'create-plan-icon__icon-text',
              'font-size-xs',
            )}>
            클릭하면 다른 아이콘으로 변경할 수 있어요
          </div>
        </>
      ) : (
        <div
          className={classNames('create-plan-icon__select-box')}
          onClick={() => {
            setIsSelectIconModalOpen(true);
          }}>
          <span className={classNames('font-size-base')}>아이콘 선택하기</span>
        </div>
      )}

      <div className={classNames('create-plan-icon__example')}>
        <div
          className={classNames(
            'create-plan-icon__example__text',
            'font-size-xs',
          )}>
          선택된 아이콘은 계획이 생성되었을 때 다음과 같이 보여요!
        </div>
        <CreatePlanIconExample />
      </div>

      {isSelectIconModalOpen && (
        <Modal>
          <ModalSelectIcon
            setIconNumber={setIconNumber}
            closeModal={() => {
              setIsSelectIconModalOpen(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
}
