import classNames from 'classnames';
import './index.scss';

export default function Card() {
  return (
    <div className={classNames('card__wrapper')}>
      <div
        className={classNames(
          'card__background',
          'border-round',
          'background-origin-orange-300',
        )}></div>
      <div
        className={classNames(
          'card__contents',
          'border-round',
          'border-origin-orange-300',
          'background-origin-white-300',
        )}></div>
    </div>
  );
}
