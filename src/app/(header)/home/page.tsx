'use client';

import { useGetMyPlansQuery } from '@/hooks/apis/useGetMyPlansQuery';
import { checkThisYear } from '@/utils/checkThisYear';
import classNames from 'classnames';
import MyPlan from './_components/MyPlan';
import './_components/index.scss';

export default function HomePage() {
  const { myPlans } = useGetMyPlansQuery();

  // const myPlans = {
  //   success: true,
  //   data: [
  //     // {
  //     //   year: 2023,
  //     //   totalAchieveRate: 50,
  //     //   getPlanList: [
  //     //     {
  //     //       title: '매일 운동하기',
  //     //       isRemindable: true,
  //     //       achieveRate: 90,
  //     //       icon: 5,
  //     //     },
  //     //     {
  //     //       title: '매일 코딩하기',
  //     //       isRemindable: true,
  //     //       achieveRate: 90,
  //     //       icon: 8,
  //     //     },
  //     //     {
  //     //       title: '매일 아침 9시에 일어나기',
  //     //       isRemindable: false,
  //     //       achieveRate: 20,
  //     //       icon: 3,
  //     //     },
  //     //   ],
  //     // },
  //     {
  //       year: 2022,
  //       totalAchieveRate: 80,
  //       getPlanList: [
  //         {
  //           title: '졸업 작품 끝내기',
  //           isRemindable: true,
  //           achieveRate: 90,
  //           icon: 7,
  //         },
  //         {
  //           title: '매일 아침 먹기',
  //           isRemindable: true,
  //           achieveRate: 70,
  //           icon: 2,
  //         },
  //         {
  //           title: '총 학점 4.0 이상 나오기',
  //           isRemindable: false,
  //           achieveRate: 50,
  //           icon: 3,
  //         },
  //       ],
  //     },
  //   ],
  // };
  if (!myPlans.data.length || myPlans.data[0].year !== checkThisYear()) {
    myPlans.data.unshift({
      year: checkThisYear(),
      totalAchieveRate: 0,
      getPlanList: [],
    });
  }

  return (
    <>
      <div className={classNames(`home__wrapper`)}>
        <MyPlan myPlans={myPlans} />
      </div>
    </>
  );
}
