import { useSelector, useDispatch } from 'react-redux';

import { Modal } from '_components';
import { setModalOpen } from '_store/ui';

export const useModal = () => {
  const reducer = (state) => state.uiReducer;
  const { isOpenModal } = useSelector(reducer);
  const dispatch = useDispatch();
  const openModal = () => {
    dispatch(setModalOpen(true));
  };
  const closeModal = () => {
    dispatch(setModalOpen(false));
  };

  return { Modal, openModal, closeModal, isOpenModal };
};
