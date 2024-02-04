'use client';

import { Button } from '@/components';
import FeedbackItem from '@/components/FeedbackItem/FeedbackItem';
import classNames from 'classnames';
import Link from 'next/link';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { usePlanIdPage } from './_components/hooks';
import './_components/index.scss';

export default function FeedbackPage({
  params,
}: {
  params: { planId: string };
}) {
  const {
    planId,
    feedback,
    achieveRate,
    feedbacks,
    plan_evaluate_text,
    title,
  } = usePlanIdPage({
    params,
  });
  return (
    <div className={classNames('feedback')}>
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
            {title}
          </p>
          <span>계획을 </span>
          <span className={classNames('color-origin-primary')}>
            {plan_evaluate_text}
          </span>
        </div>
      </div>
      <div className={classNames('feedback__evaluate-item')}>
        {feedbacks.map((item) => {
          return (
            <FeedbackItem
              data={item}
              title={title}
              planId={parseInt(planId, 10)}
              remindTime={feedback.remindTime}
              createdYear={feedback.createdYear}
              key={item.remindMonth}
            />
          );
        })}
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
