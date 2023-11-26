'use client';

import { Dropdown, Icon, Modal, ModalVerification, Tag } from '@/components';
import { GetMyPlansResponse } from '@/types/apis/plan/GetMyPlans';
import { useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import NewPlan from './NewPlan/NewPlan';
import Plan from './Plan/Plan';
import ProgressBar from './ProgressBar/ProgressBar';

type MyPlanProps = {
  myPlans: GetMyPlansResponse;
};

export default function MyPlan({ myPlans }: MyPlanProps) {
  const maxLength = 4;
  const queryClient = useQueryClient();
  const { data: myPlansData } = myPlans;
  const yearList = myPlansData.map((x) => x.year);
  const [period, setPeriod] = useState(yearList[0]);
  const [yearData, setYearData] = useState(myPlansData[0]);
  const email_isVerified = myPlansData[0].getPlanList[0].isVerified;
  const [isOpenEmailModal, setIsOpenEmailModal] = useState(false);
  const PERIOD_OPTIONS = yearList.map((x) => {
    return { value: x, name: `${x}년 계획` };
  });

  const handleOpenEmailVerificationModal = () => {
    if (!email_isVerified) {
      setIsOpenEmailModal(true);
    }
  };
  const handleCloseEmailVerificationModal = () => {
    setIsOpenEmailModal(false);
  };
  const handleSetVerifiedEmail = () => {
    queryClient.invalidateQueries({ queryKey: ['getMyPlans'] });
  };

  useEffect(() => {
    setYearData(myPlansData.find((x) => x.year === period)!);
  }, [period, myPlansData]);

  return (
    <>
      <div className={classNames(`home__wrapper-dropdown`)}>
        <Dropdown
          dropdownId="homePageDropdown"
          options={PERIOD_OPTIONS}
          selectedValue={period}
          setSelectedValue={setPeriod}
        />
      </div>
      <div
        className={classNames(
          `home__wrapper--year`,
          `font-size-3xl`,
          `color-origin-gray-300`,
        )}>
        {period}년 나의 계획은?
      </div>
      <ProgressBar percent={myPlansData[0].totalAchieveRate} />
      <div
        className={classNames(
          `home__wrapper--year`,
          `font-size-base`,
          `color-origin-gray-200`,
        )}>
        전체 달성률 : {myPlansData[0].totalAchieveRate}%
      </div>
      <div className={classNames('home__plans')}>
        {yearData.getPlanList.map((plan, index) => {
          return (
            <Plan
              key={index}
              title={plan.title}
              planId={plan.planId}
              achieveRate={plan.achieveRate}
              icon={plan.icon}
            />
          );
        })}
        {Array.from(
          { length: maxLength - yearData.getPlanList.length },
          (_, i) => {
            return (
              <NewPlan
                key={i}
                email_isVerified={email_isVerified}
                handleOpenEmailVerificationModal={
                  handleOpenEmailVerificationModal
                }
              />
            );
          },
        )}
      </div>
      {email_isVerified ? (
        <h1 className={classNames('home-email-isVerified')}>
          현재 <Tag color="green-300">이메일</Tag>을 통해서 리마인드를 받고
          있어요
        </h1>
      ) : (
        <h1 className={classNames('home-email-isVerified')}>
          <Icon name="WARNING" size="xl" />
          현재 인증된 이메일이 없습니다.
        </h1>
      )}
      {isOpenEmailModal && (
        <Modal>
          <ModalVerification
            handleCloseModal={handleCloseEmailVerificationModal}
            setVerifiedEmail={handleSetVerifiedEmail}
          />
        </Modal>
      )}
    </>
  );
}
