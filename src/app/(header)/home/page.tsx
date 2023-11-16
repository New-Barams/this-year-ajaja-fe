// import { getMyPlans } from '@/hooks/apis/plans/useMyPlansQuery';
import classNames from 'classnames';
import NewPlan from './_components/NewPlan/NewPlan';
import Plan from './_components/Plan/Plan';
import ProgressBar from './_components/ProgressBar/ProgressBar';
import YearDropdown from './_components/YearDropdown';
import './_components/index.scss';

export default async function HomePage() {
  // const { data } = await getMyPlans('1');
  // console.log(data.getPlanList);
  const maxLength = 4;
  const getPlanList = [
    { title: '매일 운동하기', isRemindable: true, achieveRate: 90, icon: 1 },
    { title: '매일 코딩하기', isRemindable: true, achieveRate: 60, icon: 2 },
    {
      title: '매일 아침 9시에 일어나기',
      isRemindable: false,
      achieveRate: 20,
      icon: 3,
    },
  ];
  return (
    <>
      <div className={classNames(`home__wrapper`)}>
        <YearDropdown />
        <ProgressBar percent={50} />
        <div
          className={classNames(
            `home__wrapper--year`,
            `font-size-base`,
            `color-origin-gray-200`,
          )}>
          전체 달성률 : {50}%
        </div>
        <div className={classNames('home__plans')}>
          {getPlanList.map((plan, index) => {
            return (
              <Plan
                key={index}
                title={plan.title}
                achieveRate={plan.achieveRate}
                icon={plan.icon}
              />
            );
          })}
          {Array.from({ length: maxLength - getPlanList.length }, (_, i) => {
            return <NewPlan key={i} />;
          })}
        </div>
      </div>
    </>
  );
}
