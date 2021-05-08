import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import type { RootState } from "../../app/store";
import { ISection, IColumn, IRow } from "./designer.interface";

interface DesignerState {
  sections: ISection[];
  rows: IRow[];
  columns: IColumn[];
  activeSection?: ISection;
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
    setActiveSection: (state, action: PayloadAction<ISection>) => {
      state.activeSection = action.payload;
    },
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
    addRow: (state, action: PayloadAction<IRow>) => {
      const row = action.payload;

      const columns = [...Array(row.numOfCols)].map(() => ({
        id: uuidv4(),
        rowId: row.id,
        sectionId: row.sectionId,
      }));

      state.rows.push(row);
      state.columns.push(...columns);
    },
    removeSection: (state, action: PayloadAction<ISection>) => {
      const { id } = action.payload;

      const newSections = state.sections.filter((section) => section.id != id);
      const newRows = state.rows.filter((row) => row.sectionId != id);
      const newColumns = state.columns.filter(
        (column) => column.sectionId != id
      );

      state.sections = newSections;
      state.rows = newRows;
      state.columns = newColumns;
    },
    removeRow: (state, action: PayloadAction<IRow>) => {
      const { id, sectionId } = action.payload;

      if (state.rows.filter((row) => row.sectionId == sectionId).length == 1) {
        const newSections = state.sections.filter(
          (section) => section.id != sectionId
        );
        state.sections = newSections;
      }

      const newRows = state.rows.filter((row) => row.id != id);
      const newColumns = state.columns.filter((column) => column.rowId != id);

      state.rows = newRows;
      state.columns = newColumns;
    },
    removeColumn: (state, action: PayloadAction<IColumn>) => {
      const { id, rowId, sectionId } = action.payload;

      if (state.columns.filter((column) => column.rowId == rowId).length == 1) {
        const newRows = state.rows.filter((row) => row.id != rowId);
        state.rows = newRows;
        if (
          state.rows.filter((row) => row.sectionId == sectionId).length == 0
        ) {
          const newSections = state.sections.filter(
            (section) => section.id != sectionId
          );
          state.sections = newSections;
        }
      }

      const newColumns = state.columns.filter((column) => column.id != id);
      state.columns = newColumns;
    },
  },
});

export const {
  addSection,
  addRow,
  removeSection,
  removeRow,
  removeColumn,
  setActiveSection,
} = designerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSections = (state: RootState) => state.designer.sections;
export const selectRows = (state: RootState) => state.designer.rows;
export const selectColumns = (state: RootState) => state.designer.columns;
export const selectActiveSection = (state: RootState) =>
  state.designer.activeSection;

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
