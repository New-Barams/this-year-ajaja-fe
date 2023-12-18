'use client';

import CreatePlanRemindDate from '@/components/CreatePlanRemindDate/CreatePlanRemindDate';
import classNames from 'classnames';
import { useState } from 'react';

export default function NewCreatePage() {
  const [nowStep, setNowStep] = useState(1);

  const goToNextStep = () => {
    if (nowStep < 4) {
      setNowStep(nowStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (nowStep > 1) {
      setNowStep(nowStep - 1);
    }
  };

  return (
    <div className={classNames('new-create-page')}>
      <div className="stepper" style={{ height: '2rem' }}>
        스테퍼 - 현재 단계 : {nowStep}
      </div>

      <CreatePlanRemindDate />

      <div className="button-group">
        <button onClick={goToPreviousStep}>이전 단계</button>
        <button onClick={goToNextStep}>다음 단계</button>
      </div>
    </div>
  );
}
