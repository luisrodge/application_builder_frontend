import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

interface IDrawer {
  drawerType: string;
  drawerProps?: any;
}

interface DrawerState {
  drawerType: string | null;
  drawerProps: any;
  isOpen: boolean;
}

const initialState: DrawerState = {
  drawerType: null,
  drawerProps: {},
  isOpen: false,
};

export const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    showDrawer: (state, action: PayloadAction<IDrawer>) => {
      const { drawerProps, drawerType } = action.payload;

      state.drawerProps = drawerProps;
      state.drawerType = drawerType;
      state.isOpen = true;
    },
    hideDrawer: () => initialState,
  },
});

export const { showDrawer, hideDrawer } = drawerSlice.actions;

export const selectDrawer = (state: RootState) => state.drawer;

export default drawerSlice.reducer;
