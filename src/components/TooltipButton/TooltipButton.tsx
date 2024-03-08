'use client';

import { useModalClose } from '@/hooks';
import classNames from 'classnames';
import {
  ReactElement,
  createContext,
  useContext,
  useRef,
  useState,
} from 'react';
import './index.scss';

const contextDefaultValue = {
  isOpen: false,
  handleSetIsOpen: () => {},
  handleCloseTooltip: () => {},
  optionsPosition: 'top' as Position,
};

type Position = 'top' | 'bottom';

const TooltipButtonContext = createContext<{
  isOpen: boolean;
  handleSetIsOpen: () => void;
  handleCloseTooltip: () => void;
  optionsPosition: Position;
}>(contextDefaultValue);

interface MainProps {
  className?: string;
  children: ReactElement[];
}

const Main = ({ children, className }: MainProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const optionsPosition = children[0].type === Options ? 'top' : 'bottom';
  const handleCloseTooltip = () => {
    setIsOpen(false);
  };
  const handleSetIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={classNames('tooltip-button__main', className)}>
      <TooltipButtonContext.Provider
        value={{
          handleCloseTooltip,
          optionsPosition,
          isOpen,
          handleSetIsOpen,
        }}>
        {children}
      </TooltipButtonContext.Provider>
    </div>
  );
};

interface TriggerProps {
  children: ReactElement;
  className?: string;
}

const Trigger = ({ children, className }: TriggerProps) => {
  const { handleSetIsOpen, handleCloseTooltip } =
    useContext(TooltipButtonContext);
  const triggerRef = useRef(null);
  useModalClose(triggerRef, handleCloseTooltip);
  return (
    <button
      ref={triggerRef}
      onClick={handleSetIsOpen}
      className={classNames(className, 'tooltip-button__trigger')}>
      {children}
    </button>
  );
};

interface OptionsProps {
  className?: string;
  children: ReactElement[] | ReactElement;
}

const Options = ({ className, children }: OptionsProps) => {
  const { isOpen, handleCloseTooltip, optionsPosition } =
    useContext(TooltipButtonContext);
  return (
    <ul
      className={classNames(
        className,
        'tooltip-button__list',
        `position-${optionsPosition}`,
        isOpen ? 'open' : 'close',
      )}>
      {Array.isArray(children) ? (
        children.map((component, index) => (
          <li
            data-order={index + 1}
            className={classNames(
              'tooltip-button__list__item',
              isOpen ? 'open' : 'close',
            )}
            key={index}
            onClick={handleCloseTooltip}>
            {component}
          </li>
        ))
      ) : (
        <li
          className="tooltip-button__list__item "
          onClick={handleCloseTooltip}>
          {children}
        </li>
      )}
    </ul>
  );
};

export { Main, Options, Trigger };
