'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import ModalRestFeedbacks, {
  RestFeedback,
} from '../_components/ModalRestFeedbacks/ModalRestFeedbacks';
import './index.scss';
import sketch_book from '/public/sketch_book.svg';

const restFeedbacks: RestFeedback[] = [
  { planId: 23, dDay: 123, planTittle: '운동하기기딕직짇기지기' },
  {
    planId: 33,
    dDay: 3,
    planTittle: '운동하기기딕ㄱㅈㄱㄷㅈwrwrwerwrwreㄱ직짇기지기',
  },
  { planId: 25, dDay: 103, planTittle: '운동하기' },
  { planId: 2, dDay: 10003, planTittle: '운동하기기' },
  { planId: 2, dDay: 10003, planTittle: '운동하기기' },
  { planId: 2, dDay: 10003, planTittle: '운동하기기' },
  { planId: 2, dDay: 10003, planTittle: '운동하기기' },
  { planId: 2, dDay: 10003, planTittle: '운동하기기' },
  { planId: 2, dDay: 10003, planTittle: '운동하기기' },
];

//TODO dynamic 방법만 있나?
const PopoverMain = dynamic(
  () => import('@components/Popover/index').then((mod) => mod.Popover.Main),
  { ssr: false, loading: () => <p>...loading</p> },
);

const PopoverTrigger = dynamic(
  () => import('@components/Popover/index').then((mod) => mod.Popover.Trigger),
  { ssr: false },
);
const PopoverModalContent = dynamic(
  () =>
    import('@components/Popover/index').then((mod) => mod.Popover.ModalContent),
  { ssr: false },
);

export default function page() {
  return (
    <div className="feedback__container">
      <div className="feedback--d-day">
        <Image
          className="feedback--d-day--background"
          src={sketch_book}
          sizes="100%"
          fill
          quality={100}
          alt="background"
        />
        <div className="feedback--d-day--text font-size-md color-origin-primary">
          {`D-${restFeedbacks[0].dDay}`}
        </div>
      </div>
      <div className="feedback--plans">
        <PopoverMain>
          <PopoverTrigger>
            <div style={{ cursor: 'pointer' }}>
              <div className="font-size-lg">1일 1커밋하기</div>
              <div>외 피드백 하지 않은 계획 3건 {'>'}</div>
            </div>
          </PopoverTrigger>
          <PopoverModalContent
            renderModalContent={(handleClose) => (
              <ModalRestFeedbacks
                handleClose={handleClose}
                restFeedbacks={restFeedbacks}
              />
            )}
          />
        </PopoverMain>
      </div>
    </div>
  );
}
