import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import type { RootState } from "../../app/store";
import { Selector } from "../../shared/types";
import { ISection, IColumn, IRow, IElement } from "./designer.interface";

interface DesignerState {
  sections: ISection[];
  rows: IRow[];
  columns: IColumn[];
  activeSection?: ISection;
  activeRow?: IRow;
  activeColumn?: IColumn;
  elements: IElement[];
}

const initialState: DesignerState = {
  sections: [],
  rows: [],
  columns: [],
  elements: [],
};

export const designerSlice = createSlice({
  name: "designer",
  initialState,
  reducers: {
    setActiveSection: (state, action: PayloadAction<ISection | undefined>) => {
      state.activeSection = action.payload;
    },
    setActiveRow: (state, action: PayloadAction<IRow | undefined>) => {
      state.activeRow = action.payload;
    },
    setActiveColumn: (state, action: PayloadAction<IColumn | undefined>) => {
      state.activeColumn = action.payload;
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
      state.activeSection = section;
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
  setActiveRow,
  setActiveColumn,
} = designerSlice.actions;

export const selectSections = (state: RootState) => state.designer.sections;
export const selectRows = (state: RootState) => state.designer.rows;
export const selectColumns = (state: RootState) => state.designer.columns;
export const selectActiveSection = (state: RootState) =>
  state.designer.activeSection;
export const selectActiveRow = (state: RootState) => state.designer.activeRow;
export const selectActiveColumn = (state: RootState) =>
  state.designer.activeColumn;

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
