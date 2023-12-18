import React from 'react';
import { Modal, ModalBasic } from '..';

interface ModalFixRemindDateProps {
  fixedMonthList: number[];
  fixedDate: number;
  onClickYes: () => void;
  onClickNo: () => void;
}

export default function ModalFixRemindDate({
  fixedMonthList,
  fixedDate,
  onClickYes,
  onClickNo,
}: ModalFixRemindDateProps) {
  return (
    <Modal>
      <ModalBasic
        onClickYes={() => {
          //TODO: 세션에 날짜 - 메세지 리스트 저장하기
          onClickYes();
        }}
        onClickNo={() => {
          onClickNo;
        }}
        confirmSentense="진행하기">
        <div>
          올해 총 {fixedMonthList.length}번 해당 월 {fixedDate}일마다 리마인드를
          받게 됩니다.
        </div>

        <div>이대로 진행하시겠습니까 ?</div>
      </ModalBasic>
    </Modal>
  );
}
