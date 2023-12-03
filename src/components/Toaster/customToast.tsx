import classNames from 'classnames';
import { toast } from 'react-hot-toast';
import { ErrorToast, SuccessToast } from '..';
import './index.scss';

export const ajajaToast = {
  success: (message: string) => {
    toast(() => (
      <div className={classNames('toast-wrapper')}>
        <SuccessToast width="32px" height="32px" color="#58b368" />
        <span className={classNames('toast-message')}>{message}</span>
      </div>
    ));
  },
  error: (message: string) => {
    toast(() => (
      <div className={classNames('toast-wrapper')}>
        <ErrorToast width="32px" height="32px" color="#f76c5e" />
        <span className={classNames('toast-message')}>{message}</span>
      </div>
    ));
  },
} as const;
