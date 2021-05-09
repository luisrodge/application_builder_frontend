import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

interface IDrawerType {
  drawerType: string;
}

interface IDrawer {
  drawerType: string;
  drawerProps?: any;
  isOpen: boolean;
}

interface IChildDrawer extends IDrawer {}

interface DrawerState {
  drawer: IDrawer;
  childDrawer: IChildDrawer;
}

const initialState: DrawerState = {
  drawer: {} as IDrawer,
  childDrawer: {} as IChildDrawer,
};

export const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    showDrawer: (state, action: PayloadAction<IDrawerType>) => {
      const { drawerType } = action.payload;

      state.drawer.drawerType = drawerType;
      state.drawer.isOpen = true;
    },
    hideDrawer: (state) => {
      state.drawer = {} as IDrawer;
    },
    showChildDrawer: (state, action: PayloadAction<IDrawerType>) => {
      const { drawerType } = action.payload;

      state.childDrawer.drawerType = drawerType;
      state.childDrawer.isOpen = true;
    },
    hideChildDrawer: (state) => {
      state.childDrawer = {} as IDrawer;
    },
    hideDrawers: () => initialState,
  },
});

export const {
  showDrawer,
  hideDrawer,
  showChildDrawer,
  hideChildDrawer,
  hideDrawers,
} = drawerSlice.actions;

export const selectDrawer = (state: RootState) => state.drawer.drawer;
export const selectChildDrawer = (state: RootState) => state.drawer.childDrawer;

export default drawerSlice.reducer;
