import React from 'react';
import { Stepper } from 'react-form-stepper';
import './index.scss';

interface CreatePlanStepperProps {
  nowStep: number;
}

export default function CreatePlanStepper({ nowStep }: CreatePlanStepperProps) {
  return (
    <Stepper
      steps={[{}, {}, {}, {}]}
      activeStep={nowStep}
      connectorStateColors={true}
      connectorStyleConfig={{
        size: 1.5,
        style: 'solid',
        completedColor: '#f76c5e',
        activeColor: '#f76c5e',
        disabledColor: '#eee',
      }}
      styleConfig={{
        size: '2rem',
        circleFontSize: '1rem',
        labelFontSize: '1rem',
        borderRadius: '50%',
        fontWeight: '500',
        activeBgColor: '#f76c5e',
        completedBgColor: '#f76c5e',
        inactiveBgColor: '#eee',
        activeTextColor: '#ffffff',
        completedTextColor: '#ffffff',
        inactiveTextColor: '#ffffff',
      }}
      className={'stepper'}
      stepClassName={'stepper__step'}
    />
  );
}
