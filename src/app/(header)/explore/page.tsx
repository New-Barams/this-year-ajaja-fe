import classNames from 'classnames';
import ExplorePlans from './_components/ExplorePlans';
import './_components/index.scss';

export default function ExplorePage() {
  return (
    <div className={classNames('explore-plans')}>
      <ExplorePlans />
    </div>
  );
}
