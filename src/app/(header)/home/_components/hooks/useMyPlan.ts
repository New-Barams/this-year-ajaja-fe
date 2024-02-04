import { maxPlan } from '@/constants/plan';
import { canMakeNewPlanStore } from '@/stores/canMakeNewPlanStore';
import { GetMyPlansResponse } from '@/types/apis';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

export default function useMyPlan({
  myPlans,
}: {
  myPlans: GetMyPlansResponse;
}) {
  const { data: myPlansData } = myPlans;
  const yearList = myPlansData.map((x) => x.year);
  const setCanMakeNewPlan = useSetRecoilState(canMakeNewPlanStore);
  const [year, setYear] = useState(yearList[0]);
  const [yearData, setYearData] = useState(myPlansData[0]);
  const [yearDataLength, setYearDataLength] = useState(
    myPlansData[0].getPlanList.length,
  );

  const PERIOD_OPTIONS = yearList.map((x) => {
    return { value: x, name: `${x}년 계획` };
  });

  useEffect(() => {
    const chosenYearData = myPlansData.find((x) => x.year === year)!;
    setYearData(chosenYearData);
    setYearDataLength(chosenYearData.getPlanList.length);
    setCanMakeNewPlan(!!(maxPlan - chosenYearData.getPlanList.length));
  }, [year, myPlansData, setYearDataLength, setCanMakeNewPlan]);
  return {
    myPlansData,
    yearList,
    setCanMakeNewPlan,
    year,
    setYear,
    yearData,
    setYearData,
    yearDataLength,
    setYearDataLength,
    PERIOD_OPTIONS,
  };
}
