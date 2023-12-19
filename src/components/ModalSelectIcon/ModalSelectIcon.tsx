'use client';

import { planIcons } from '@/constants/planIcons';
import { useModalClose } from '@/hooks/useModalClose';
import classNames from 'classnames';
import Image from 'next/image';
import React, { useRef } from 'react';
import './index.scss';

interface ModalSelectIconProps {
  setIconNumber: (iconNumber: number) => void;
  closeModal: () => void;
}

const PLAN_ICON_LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function ModalSelectIcon({
  setIconNumber,
  closeModal,
}: ModalSelectIconProps) {
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  useModalClose(backgroundRef, closeModal);

  return (
    <div
      className={classNames([
        'select-icon-modal__wrapper',
        'background-origin-white-100',
      ])}
      ref={backgroundRef}>
      <div className={classNames(['select-icon-modal__content'])}>
        <ul className={classNames(['select-icon-modal__icon-list'])}>
          {PLAN_ICON_LIST.map((iconNumber, index) => {
            return (
              <li
                key={`${index}-${planIcons[iconNumber]}`}
                className={classNames('select-icon-modal__icon-item')}>
                <Image
                  src={`/animal/${planIcons[iconNumber]}.png`}
                  width={40}
                  height={40}
                  alt="example plan icon"
                  className={classNames('select-icon-modal__icon-image')}
                  onClick={() => {
                    setIconNumber(iconNumber);
                    closeModal();
                  }}
                />
              </li>
            );
          })}
        </ul>
        <p className={classNames(['select-icon-modal__text'])}>
          아이콘을 클릭해 선택해주세요!
        </p>
      </div>
    </div>
  );
}
