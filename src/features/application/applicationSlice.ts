import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import type { RootState } from "../../app/store";
import { Selector } from "../../shared/types";
import {
  ISection,
  IColumn,
  IRow,
  IElement,
  IApplication,
} from "./application.interface";

interface ApplicationState {
  applications: IApplication[];
  sections: ISection[];
  rows: IRow[];
  columns: IColumn[];
  activeApplication?: IApplication;
  activeSection?: ISection;
  activeRow?: IRow;
  activeColumn?: IColumn;
  activeElement?: IElement;
  elements: IElement[];
}

const initialState: ApplicationState = {
  applications: [],
  sections: [],
  rows: [],
  columns: [],
  elements: [],
};

export const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setActiveApplication: (
      state,
      action: PayloadAction<IApplication | undefined>
    ) => {
      state.activeApplication = action.payload;
    },
    setActiveSection: (state, action: PayloadAction<ISection | undefined>) => {
      state.activeSection = action.payload;
    },
    setActiveRow: (state, action: PayloadAction<IRow | undefined>) => {
      state.activeRow = action.payload;
    },
    setActiveColumn: (state, action: PayloadAction<IColumn | undefined>) => {
      state.activeColumn = action.payload;
    },
    setActiveElement: (state, action: PayloadAction<IElement | undefined>) => {
      state.activeElement = action.payload;
    },
    addApplication: (state, action: PayloadAction<IApplication>) => {
      const newApplication = action.payload;
      state.applications.push(newApplication);
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
    addElement: (state, action: PayloadAction<IElement>) => {
      const element = action.payload;

      state.elements.push(element);
    },
    removeElement: (state, action: PayloadAction<IElement>) => {
      const element = action.payload;

      const elements = state.elements.filter(
        (e) => e.columnId != element.columnId
      );

      state.elements = elements;
    },
    resetActive: (state) => {
      state.activeSection = undefined;
      state.activeRow = undefined;
      state.activeColumn = undefined;
      state.activeElement = undefined;
    },
  },
});

export const {
  addApplication,
  addSection,
  addRow,
  removeSection,
  removeRow,
  removeColumn,
  setActiveSection,
  setActiveRow,
  setActiveColumn,
  addElement,
  removeElement,
  setActiveElement,
  setActiveApplication,
  resetActive,
} = applicationSlice.actions;

export const selectSections = (state: RootState) => state.application.sections;
export const selectRows = (state: RootState) => state.application.rows;
export const selectColumns = (state: RootState) => state.application.columns;

export const selectActiveApplication = (state: RootState) =>
  state.application.activeApplication;
export const selectActiveSection = (state: RootState) =>
  state.application.activeSection;
export const selectActiveRow = (state: RootState) =>
  state.application.activeRow;
export const selectActiveColumn = (state: RootState) =>
  state.application.activeColumn;
export const selectActiveElement = (state: RootState) =>
  state.application.activeElement;

export const selectApplication = (
  applicationId: string
): Selector<IApplication | undefined> =>
  createSelector(
    [(state: RootState) => state.application.applications],
    (applications: IApplication[]) =>
      applications.find((application) => application.id === applicationId)
  );

export const selectSection = (
  sectionId: string
): Selector<ISection | undefined> =>
  createSelector(
    [(state: RootState) => state.application.sections],
    (sections: ISection[]) =>
      sections.find((section) => section.id == sectionId)
  );

export const selectSectionRows = (
  sectionId: string
): Selector<IRow[] | undefined> =>
  createSelector(
    [(state: RootState) => state.application.rows],
    (rows: IRow[]) => rows.filter((row) => row.sectionId == sectionId)
  );

export const selectRowColumns = (
  rowId: string
): Selector<IColumn[] | undefined> =>
  createSelector(
    [(state: RootState) => state.application.columns],
    (columns: IColumn[]) => columns.filter((column) => column.rowId == rowId)
  );

export const selectElement = (
  columnId: string | undefined
): Selector<IElement | undefined> =>
  createSelector(
    [(state: RootState) => state.application.elements],
    (elements: IElement[]) =>
      elements.find((element) => element.columnId === columnId)
  );

export default applicationSlice.reducer;
