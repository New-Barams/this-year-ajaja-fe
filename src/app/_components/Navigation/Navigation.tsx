'use client';

import { Icon } from '@/components';
import { address } from '@/constants';
import { checkIsSeason } from '@/utils/checkIsSeason';
import classNames from 'classnames';
import Link from 'next/link';
import { useNavigation } from '../hooks';
import './index.scss';

export default function Navigation({ hasAuth }: { hasAuth: boolean }) {
  const {
    pathName,
    canMakeNewPlan,
    isLogin,
    isMyPlan,
    isRealLogin,
    handleCreate,
  } = useNavigation({
    hasAuth,
  });
  const { isEdit, isFeedback, isFeedbackEvaluate, isPlan, isRemind } = address;

  isRealLogin();

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
        href={canMakeNewPlan && checkIsSeason() ? '/create' : ''}
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
          {/* {checkIsSeason() ? '계획 작성' : '피드백하기'} */}
          계획 작성
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
