import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './index.scss';
import first from '/public/loginPage/first.png';
import fourth from '/public/loginPage/fourth.png';
import second from '/public/loginPage/second.png';
import third from '/public/loginPage/third.png';

export default function IntroduceSwiper() {
  return (
    <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
      <SwiperSlide>
        <Image src={first} alt="소개1" />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={second} alt="소개1" />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={third} alt="소개1" />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={fourth} alt="소개1" />
      </SwiperSlide>
    </Swiper>
  );
}
