import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../../app/store";

interface ISection {
  id: number;
  numOfCols: number;
}

// Define a type for the slice state
interface DesignerState {
  sections: ISection[];
}

// Define the initial state using that type
const initialState: DesignerState = {
  sections: [],
};

export const designerSlice = createSlice({
  name: "designer",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addSection: (state, action: PayloadAction<ISection>) => {
      state.sections.push(action.payload);
    },
  },
});

export const { addSection } = designerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSections = (state: RootState) => state.designer.sections;

export default designerSlice.reducer;
