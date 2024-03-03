'use client';

import {
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { Modal } from '..';

const contextDefaultValue = {
  isModalOpen: false,
  handleOpenModal: () => {},
  handleCloseModal: () => {},
};
//popover 안에서 공유할 값을 context를 통해서 공유한다.
const PopoverContext = createContext<{
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
}>(contextDefaultValue);

const Main = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  return (
    <PopoverContext.Provider
      value={{
        isModalOpen,
        handleOpenModal,
        handleCloseModal,
      }}>
      {children}
    </PopoverContext.Provider>
  );
};
//popover의 trigger역할
const Trigger = ({ children }: { children: ReactNode }) => {
  const contextValue = useContext(PopoverContext);

  return <div onClick={contextValue.handleOpenModal}>{children}</div>;
};
//실제 모달이 들어올 컴포넌트 현재 modal 구현상 render함수를 받고 있다.
const ModalContent = ({
  container,
  renderModalContent,
}: {
  container: HTMLDivElement | null;
  renderModalContent: (onClickNo: () => void) => ReactElement;
}) => {
  const contextValue = useContext(PopoverContext);
  return (
    <>
      {contextValue.isModalOpen &&
        createPortal(
          <Modal>{renderModalContent(contextValue.handleCloseModal)}</Modal>,
          container!,
        )}
    </>
  );
};

export { ModalContent, Trigger, Main };
