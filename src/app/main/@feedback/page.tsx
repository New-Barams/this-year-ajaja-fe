'use client';

import { Popover } from '@/components';
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

const DynamicPopoverModalContent = dynamic(
  () =>
    import('@components/Popover/index').then((mod) => mod.Popover.ModalContent),
  { ssr: false },
);

export default function Page() {
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
        <Popover.Main>
          <Popover.Trigger>
            <div className="feedback--plans__trigger">
              <div className="font-size-lg">1일 1커밋하기</div>
              <div>외 피드백 하지 않은 계획 3건 {'>'}</div>
            </div>
          </Popover.Trigger>
          <DynamicPopoverModalContent
            renderModalContent={(handleClose) => (
              <ModalRestFeedbacks
                handleClose={handleClose}
                restFeedbacks={restFeedbacks}
              />
            )}
          />
        </Popover.Main>
      </div>
    </div>
  );
}
