import classNames from 'classnames';
import Plans from './Plans/Plans';
import Tab from './Tab/Tab';
import './index.scss';

export default function ExplorePlans() {
  return (
    <div className={classNames('explore-plans__wrapper')}>
      <Tab />
      <Plans />
    </div>
  );
}
