import { SortType } from './apis';

export type TabProps = {
  handleSort: (condition: SortType) => void;
  handleYear: (isNewYear: boolean) => void;
};
