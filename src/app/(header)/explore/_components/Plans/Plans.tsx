'use client';

// import { useAllPlansQuery } from '@/hooks/apis/plans/useAllPlansQuery';
import Card from '../Card/Card';

export default function Plans() {
  // const { allPlans } = useAllPlansQuery();
  // console.log(allPlans.data);
  const allPlans = {
    success: true,
    data: [
      {
        id: 0,
        userId: 1,
        nickname: '춤추는 고래',
        title:
          '올해도 아좌좌 아좌좌 아좌좌 아좌좌 아좌좌 아좌좌 아좌좌 아좌좌 ',
        ajajas: 255,
        tags: ['태그', '태그태그', '태태태태태태그'],
        createdAt: '2023-??',
      },
      {
        id: 1,
        userId: 2,
        nickname: '윈드밀하는 미어캣zooooooooooo',
        title:
          '올해도 아좌좌 아좌좌 아좌좌 김수한무거북이와두루미암튼모르겠는데긴이름름이름이다',
        ajajas: 0,
        tags: [
          '태그',
          '태그태그',
          '태태태태태태그',
          '태태태태태태그',
          '태태태태그태태태태그',
        ],
        createdAt: '2023-??',
      },
      {
        id: 1,
        userId: 2,
        nickname: '윈드밀하는 미어캣',
        title: '올해도 아좌좌 아좌좌',
        ajajas: 1000,
        tags: [
          '태그',
          '태그태그',
          '태태태태태태그',
          '태태태태태태그',
          '태태태태그태태태태그',
        ],
        createdAt: '2023-??',
      },
      {
        id: 1,
        userId: 2,
        nickname: '윈드밀하는 미어캣',
        title: '올해도 아좌좌 아좌좌',
        ajajas: 2231,
        tags: ['태그', '태그', '태태', '태태', '태태'],
        createdAt: '2023-??',
      },
    ],
  };
  return (
    <>
      {allPlans.data.map((plan, index) => {
        return <Card key={index} plan={plan} />;
      })}
    </>
  );
}
