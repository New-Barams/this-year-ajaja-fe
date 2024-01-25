'use client';

import { getMyPlans } from '@/apis/client/getMyPlans';
import { Icon } from '@/components';
import { ajajaToast } from '@/components/Toaster/customToast';
import { maxPlan } from '@/constants/plan';
import { canMakeNewPlanStore } from '@/stores/canMakeNewPlanStore';
import { isMyPlanStore } from '@/stores/isMyPlanStore';
import { checkIsSeason } from '@/utils/checkIsSeason';
import { checkThisYear } from '@/utils/checkThisYear';
import classNames from 'classnames';
import { hasCookie } from 'cookies-next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import './index.scss';

export default function Navigation({ hasAuth }: { hasAuth: boolean }) {
  const pathName = usePathname();
  const [isLogin, setIsLogin] = useState(hasAuth);
  const [canMakeNewPlan, setCanMakeNewPlan] =
    useRecoilState(canMakeNewPlanStore);
  const [isMyPlan] = useRecoilState(isMyPlanStore);
  const isEdit = /^\/plans\/edit\/\d+/;
  const isPlan = /^\/plans\/\d+/;
  const isRemind = /^\/reminds\/.*$/;
  const isFeedback = /^\/feedback\/\d+/;
  const isFeedbackEvaluate = /^\/feedback\/evaluate/;

  if (!hasCookie('auth')) {
    setTimeout(() => {
      setIsLogin(hasCookie('auth'));
    }, 1000);
  }

  const handleCreate = () => {
    if (!canMakeNewPlan) {
      ajajaToast.error('생성할 수 있는 계획의 수가 최대입니다.');
    }
  };

  useEffect(() => {
    async function isMaxPlan() {
      const data = await getMyPlans();
      if (data.data[0]?.year === checkThisYear()) {
        setCanMakeNewPlan(!!(maxPlan - data.data[0].getPlanList.length));
      }
    }
    isMaxPlan();
  }, [setCanMakeNewPlan]);
  return (
    <div className={classNames('navigation')}>
      <Link href="/home" className={classNames('navigation-icon')}>
        <Icon
          name="HOME"
          isFilled={true}
          size="xl"
          color={
            pathName === '/home' ||
            isRemind.test(pathName) ||
            (isMyPlan && isPlan.test(pathName)) ||
            isEdit.test(pathName) ||
            isFeedback.test(pathName) ||
            isFeedbackEvaluate.test(pathName)
              ? 'primary'
              : 'text-300'
          }
        />
        <p
          className={classNames(
            'font-size-xs',
            pathName === '/home' ||
              isRemind.test(pathName) ||
              (isMyPlan && isPlan.test(pathName)) ||
              isEdit.test(pathName) ||
              isFeedback.test(pathName) ||
              isFeedbackEvaluate.test(pathName)
              ? 'color-origin-primary'
              : 'color-origin-text-300',
          )}>
          홈
        </p>
      </Link>
      <Link
        href={canMakeNewPlan ? '/create' : ''}
        onClick={handleCreate}
        className={classNames('navigation-icon', {
          'color-origin-primary': pathName === '/create',
          'color-origin-text-300': pathName !== '/create',
        })}>
        <Icon
          name="CREATE_NEW_PLAN"
          isFilled={true}
          size="xl"
          color={pathName === '/create' ? 'primary' : 'text-300'}
        />
        <p className={classNames('font-size-xs')}>
          {checkIsSeason() ? '계획 작성' : '피드백하기'}
        </p>
      </Link>
      <Link href="/explore" className={classNames('navigation-icon')}>
        <Icon
          name="OTHER_PLAN"
          isFilled={true}
          size="xl"
          color={
            pathName === '/explore' || (!isMyPlan && isPlan.test(pathName))
              ? 'primary'
              : 'text-300'
          }
        />
        <p
          className={classNames(
            'font-size-xs',
            pathName === '/explore' || (!isMyPlan && isPlan.test(pathName))
              ? 'color-origin-primary'
              : 'color-origin-text-300',
          )}>
          둘러보기
        </p>
      </Link>
      <Link
        href={isLogin ? '/my' : '/login'}
        className={classNames('navigation-icon', {
          'color-origin-primary': pathName === '/my' || pathName === '/login',
          'color-origin-text-300': pathName !== '/my' && pathName !== '/login',
        })}>
        <Icon
          name={isLogin ? 'PROFILE' : 'LOGIN'}
          isFilled={true}
          size="xl"
          color={
            pathName === '/my' || pathName === '/login' ? 'primary' : 'text-300'
          }
        />
        <p className={classNames('font-size-xs')}>
          {isLogin ? '마이페이지' : '로그인하기'}
        </p>
      </Link>
    </div>
  );
}
