import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false, // Trạng thái modal ban đầu
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true; // Mở modal
    },
    closeModal: (state) => {
      state.isModalOpen = false; // Đóng modal
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
