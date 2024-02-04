'use client';

import { ToTopFloatingButton } from '@/components';
import { COLOR } from '@/constants';
import classNames from 'classnames';
import InfiniteScroll from 'react-infinite-scroller';
import { FadeLoader } from 'react-spinners';
import Plans from './Plans/Plans';
import Tab from './Tab/Tab';
import { useExplorePlans } from './hooks';
import './index.scss';

export default function ExplorePlans() {
  const {
    fetchNextPage,
    flatLoadedPlans,
    handleSort,
    handleYear,
    hasNextPage,
  } = useExplorePlans();
  return (
    <div className={classNames('explore-plans')}>
      <div className={classNames('explore-plans__wrapper')}>
        <Tab handleSort={handleSort} handleYear={handleYear} />
        <div className={classNames('explore-plans__plans')}>
          <InfiniteScroll
            pageStart={0}
            loadMore={() => fetchNextPage()}
            hasMore={hasNextPage}
            loader={
              <FadeLoader
                key="loader"
                color={COLOR.PRIMARY}
                speedMultiplier={1}
                className={classNames('explore-plans__loader')}
              />
            }
            useWindow={false}>
            <Plans flatLoadedPlans={flatLoadedPlans} />
          </InfiniteScroll>
          <ToTopFloatingButton />
        </div>
      </div>
    </div>
  );
}
