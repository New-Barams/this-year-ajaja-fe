import classNames from 'classnames';
import React from 'react';
import { Modal, ModalBasic } from '..';
import './index.scss';

interface ModalFixRemindDateProps {
  fixedMonthList: number[];
  fixedDate: number;
  onClickYes: () => void;
  onClickNo: () => void;
  isPeriodOrTermChanged?: boolean;
}

const everyMonthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const isSelectedMonth = (month: number, monthList: number[]) => {
  return monthList.includes(month);
};

export default function ModalFixRemindDate({
  fixedMonthList,
  fixedDate,
  onClickYes,
  onClickNo,
  isPeriodOrTermChanged = false,
}: ModalFixRemindDateProps) {
  return (
    <Modal>
      <ModalBasic
        onClickYes={onClickYes}
        onClickNo={onClickNo}
        confirmSentense="진행하기">
        <div className={classNames(['fix-remind-modal'])}>
          {isPeriodOrTermChanged && (
            <div
              className={classNames([
                'fix-remind-modal__isChanged',
                'font-size-md',
                'color-origin-primary',
              ])}>
              <p>리마인드 기간/주기가 변경되어 </p>
              <p>작성했던 리마인드 메세지가 삭제됩니다.</p>
            </div>
          )}
          <div
            className={classNames([
              'fix-remind-modal__title',
              'font-size-base',
            ])}>
            <p>
              2024년 총{' '}
              <span className={classNames(['color-origin-primary'])}>
                {fixedMonthList.length}
              </span>
              번
            </p>
            <p>
              해당 월{' '}
              <span className={classNames(['color-origin-primary'])}>
                {fixedDate}
              </span>
              일에 리마인드를 받게 됩니다.
            </p>
          </div>

          <ul
            className={classNames([
              'fix-remind-modal__month-list',
              'color-origin-secondary',
            ])}>
            {everyMonthList.map((month) => {
              return (
                <li
                  key={month}
                  className={classNames([
                    'fix-remind-modal__month-item',
                    {
                      'fix-remind-modal__month-item--active': isSelectedMonth(
                        month,
                        fixedMonthList,
                      ),
                    },
                  ])}>
                  {month}월
                </li>
              );
            })}
          </ul>

          <p
            className={classNames([
              'fix-remind-modal__warning',
              'font-size-xs',
              'color-origin-primary',
            ])}>
            {
              '단, 선택된 날짜가 선택된 월에 없으면 해당 월의 말일에 리마인드를 받습니다. ex) 2월 31일 => 2월 28일'
            }
          </p>

          <p
            className={classNames([
              'fix-remind-modal__proceed',
              ,
              'font-size-md',
            ])}>
            이대로 진행하시겠습니까?
          </p>
        </div>
      </ModalBasic>
    </Modal>
  );
}
