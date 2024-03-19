import Link from 'next/link';
import './index.scss';

const footprints = [
  { title: '나는 왜이렇게 살았는가!@', date: '2020.02.20' },
  { title: '나는 왜이렇게 살았는가!@', date: '2020.02.20' },
  { title: '나는 왜이렇게 살았는가!@', date: '2020.02.20' },
  {
    title: 'ererewrwerwerewrwerw왜이렇게 살았는가!@',
    date: '2020.02.20',
  },
  { title: '나는 왜이렇게 살았는가!@', date: '2020.02.20' },
  { title: '나는 왜이렇게 살았는가!@', date: '2020.02.20' },
  { title: '나는 왜이렇게 살았는가!@', date: '2020.02.20' },
];
// TODO d아이템 클릭시 해당 발자취로 이동
export default function Page() {
  return (
    <div className="footprint__container">
      {footprints.map((footprint) => (
        <Link href={''} key={footprint.title} className="footprint__item">
          <span className="footprint__item--title">{footprint.title}</span>
          <span className="footprint__item--date color-origin-text-300 font-size-sm">
            {footprint.date}
          </span>
        </Link>
      ))}
    </div>
  );
}
