import React from 'react';
import './index.scss';

export default function NoticePage() {
  return (
    <div className="notice-page__wrapper">
      <h1 className="notice-page__title font-size-xl">공지사항</h1>

      <p className="notice-page__notice-title font-size-lg">
        개인정보 처리방침 변경 안내
      </p>

      <p className="notice-page__notice-date font-size-base color-origin-secondary">
        2024.01.23
      </p>

      <p className="notice-page__notice-content">
        개인정보 처리방침 변경이 변경되어 전화번호를 무조건 수집해야합니다.
        개인정보 처리방침 변경이 변경되어 전화번 호 를 무조건 수집해야합니다.
      </p>
    </div>
  );
}
