import Image from 'next/image';
import './index.scss';

export default function SearchingPlan() {
  return (
    <div className="searching-plan__wrapper">
      <Image
        className="searching-plan__image"
        width={350}
        height={250}
        src={'/threeAnimals.png'}
        alt="searching-plan"
      />

      <h1 className="font-size-xl">계획 찾는 중..... </h1>
    </div>
  );
}
