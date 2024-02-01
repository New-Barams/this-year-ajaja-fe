'use client';

import Link from 'next/link';
import React from 'react';
import './index.scss';

export default function NoticePage() {
  return (
    <div className="notice-page__wrapper">
      <h1 className="notice-page__title font-size-xl">공지사항</h1>

      <div className="notice-page__content">
        <p className="notice-page__content__title font-size-lg">
          개인정보 처리방침 도입 안내
        </p>

        <p className="notice-page__content__date font-size-base color-origin-secondary">
          2024.01.19
        </p>

        <p className="notice-page__content__description">
          <p>
            안녕하세요! 모든 사람들의 갓생을 꿈꾸는 뉴바람스입니다. 이용약관 및
            개인정보 처리방침이 도입되어서 안내 드리고자 공지사항 남깁니다.
          </p>
          <br />

          <p>
            주요 변경 사항은 다음과 같습니다.
            <br />
            - 회원가입 시 전화번호 수집 <br />- 목적: 카카오톡으로 계획 리마인드
            발송을 위함{' '}
          </p>
          <br />

          <p>
            자세한 내용은 다음 페이지를 통해서 확인할 수 있습니다. <br />
            <Link href="https://sites.google.com/view/ajaja-policy-privacy">
              - 개인정보 처리방침
            </Link>
            <br />
            <Link href="https://sites.google.com/view/ajaja-policy-term">
              - 이용약관
            </Link>
          </p>
          <br />

          <p>
            이용약관과 개인정보 처리방침은 24년 1월 12일부터 시행되었습니다.
            감사합니다! 올해도 아좌좌 🔥
          </p>
        </p>
      </div>
    </div>
  );
}
