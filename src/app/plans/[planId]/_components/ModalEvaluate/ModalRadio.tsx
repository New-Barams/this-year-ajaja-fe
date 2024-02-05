import classNames from 'classnames';
import React from 'react';

const percents = [0, 25, 50, 75, 100];
const list: Record<string, string> = {
  '0': '전혀 못함',
  '25': '대체로 못함',
  '50': '보통',
  '75': '대체로 잘함',
  '100': '매우 잘함',
};

interface ModalRadioProp {
  rate: number;
  setRate: (rate: number) => void;
}

export default function ModalRadio({ rate, setRate }: ModalRadioProp) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRate(parseInt(e.target.value, 10));
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
                  checked={percent === rate}
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
