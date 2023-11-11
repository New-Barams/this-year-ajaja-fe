import classNames from 'classnames';
import React, { useState } from 'react';

const percents = ['0', '25', '50', '75', '100'];
const list: Record<string, string> = {
  '0': '전혀 못함',
  '25': '대체로 못함',
  '50': '보통',
  '75': '잘함',
  '100': '매우 잘함',
};

export default function ModalRadio() {
  const [feedbackResult, setFeedbackResult] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setFeedbackResult(e.target.value);
    //value를 평가완료 버튼 클릭시 send할 예정
    console.log(feedbackResult);
  };
  return (
    <fieldset className={classNames('modal__radio')}>
      {percents.map((percent) => {
        return (
          <React.Fragment key={percent}>
            <div className={classNames('modal__radio-wrapper')}>
              <p>{percent}%</p>
              <div className={classNames(`modal__radio--${percent}`)}>
                <input
                  id={`radio-${percent}`}
                  type="radio"
                  name="contact"
                  value={percent}
                  onChange={handleChange}
                  style={{ display: 'none' }}
                />
                <label htmlFor={`radio-${percent}`} />
              </div>
              <p>{list[percent]}</p>
            </div>
          </React.Fragment>
        );
      })}
    </fieldset>
  );
}
