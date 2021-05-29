import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface IModalType {
  modalType: string;
}

interface ModalState {
  modalType: string;
  modalProps?: any;
  isOpen: boolean;
}

const initialState: ModalState = {
  modalType: "",
  modalProps: null,
  isOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<IModalType>) => {
      const { modalType } = action.payload;

      state.modalType = modalType;
      state.isOpen = true;
    },
    hideModal: () => initialState,
  },
});

export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;

export const selectModal = (state: RootState) => state.modal;
