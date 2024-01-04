'use client';

import { Button } from '@/components';
import { useGetFeedbacksQuery } from '@/hooks/apis/useGetFeedbacksQuery';
import { useScroll } from '@/hooks/useScroll';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './_components/index.scss';

export default function FeedbackPage() {
  const pathname = usePathname();
  const planId = parseInt(pathname.slice(10), 10);
  const { feedback } = useGetFeedbacksQuery(planId);
  console.log(feedback);
  const { achieveRate, planName } = feedback;
  const { handleScroll, scrollableRef } = useScroll();
  let plan_evaluate_text = '';

  if (achieveRate >= 80) {
    plan_evaluate_text = '매우 잘 지키고 있어요!';
  } else if (achieveRate >= 50) {
    plan_evaluate_text = '잘 지키고 있어요!';
  } else {
    plan_evaluate_text = '잘 지켜주세요!';
  }

  return (
    <div
      className={classNames('feedback')}
      ref={scrollableRef}
      onScroll={handleScroll}>
      <div className="feedback__breadcrumb font-size-base color-origin-text-100">
        <Link href="/home">홈</Link>
        &gt;
        <Link href={`/plans/${planId}`}>내 계획</Link>
        &gt;
        <span>피드백</span>
      </div>
      <div className={classNames('font-size-xl', 'feedback__title')}>
        피드백
      </div>
      <div className={classNames('feedback__evaluate')}>
        <CircularProgressbar
          value={achieveRate}
          text={`${achieveRate}%`}
          className={classNames('feedback__circular-progressbar')}
        />
        <div className={classNames('feedback__evaluate-text', 'font-size-md')}>
          <p
            className={classNames(
              'feedback__evaluate-title',
              'color-origin-primary',
            )}>
            {planName}
          </p>
          <span>계획을 </span>
          <span className={classNames('color-origin-primary')}>
            {plan_evaluate_text}
          </span>
        </div>
      </div>
      <Link
        href={`/plans/${planId}`}
        className={classNames('feedback__back-to-plans')}>
        <Button background="primary" color="white-100" border={false}>
          계획으로 돌아가기
        </Button>
      </Link>
    </div>
  );
}