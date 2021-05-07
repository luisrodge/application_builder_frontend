import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import type { RootState } from "../../app/store";
import { ISection, IColumn, IRow } from "./designer.interface";

interface DesignerState {
  sections: ISection[];
  rows: IRow[];
  columns: IColumn[];
}

// Define the initial state using that type
const initialState: DesignerState = {
  sections: [],
  rows: [],
  columns: [],
};

export const designerSlice = createSlice({
  name: "designer",
  initialState,
  reducers: {
    addSection: (state, action: PayloadAction<ISection>) => {
      const section = action.payload;
      const row = { id: uuidv4(), sectionId: section.id } as IRow;

      const columns = [...Array(section.numOfCols)].map(() => ({
        id: uuidv4(),
        rowId: row.id,
        sectionId: section.id,
      }));

      state.sections.push(section);
      state.rows.push(row);
      state.columns.push(...columns);
    },
  },
});

export const { addSection } = designerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSections = (state: RootState) => state.designer.sections;
export const selectRows = (state: RootState) => state.designer.rows;
export const selectColumns = (state: RootState) => state.designer.columns;

type Selector<S> = (state: RootState) => S;

export const selectSection = (
  sectionId: string
): Selector<ISection | undefined> =>
  createSelector(
    [(state: RootState) => state.designer.sections],
    (sections: ISection[]) =>
      sections.find((section) => section.id == sectionId)
  );

export const selectSectionRows = (
  sectionId: string
): Selector<IRow[] | undefined> =>
  createSelector([(state: RootState) => state.designer.rows], (rows: IRow[]) =>
    rows.filter((row) => row.sectionId == sectionId)
  );

export const selectRowColumns = (
  rowId: string
): Selector<IColumn[] | undefined> =>
  createSelector(
    [(state: RootState) => state.designer.columns],
    (columns: IColumn[]) => columns.filter((column) => column.rowId == rowId)
  );

export default designerSlice.reducer;
