import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";

import type { RootState } from "../../app/store";
import { Selector } from "../../shared/types";
import {
  ISection,
  IColumn,
  IRow,
  IInput,
  IApplication,
} from "../applications/applications.interface";
import { GetApplication } from "./services";

type LoadingType = "idle" | "pending" | "succeeded" | "failed";

interface ILoadingState {
  sectionLoading: LoadingType;
  applicationLoading: LoadingType;
}

interface ApplyState {
  sections: ISection[];
  rows: IRow[];
  columns: IColumn[];
  activeApplication?: IApplication;
  activeSection?: ISection;
  activeRow?: IRow;
  activeColumn?: IColumn;
  activeInput?: IInput;
  inputs: IInput[];
  error: string | null;
  loadingStatuses: ILoadingState;
}

const initialLoadingState = {
  sectionLoading: "idle",
  applicationLoading: "idle",
} as ILoadingState;

const initialState: ApplyState = {
  sections: [],
  rows: [],
  columns: [],
  inputs: [],
  error: null,
  loadingStatuses: initialLoadingState,
};

export const applySlice = createSlice({
  name: "apply",
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
    setActiveInput: (state, action: PayloadAction<IInput | undefined>) => {
      state.activeInput = action.payload;
    },
    resetSectionLoadingStatuses: (state) => {
      state.loadingStatuses.sectionLoading = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetApplication.pending, (state) => {
      state.loadingStatuses.applicationLoading = "pending";
    });
    builder.addCase(GetApplication.fulfilled, (state, action) => {
      const { application, sections, rows, columns, inputs } = action.payload;
      state.activeApplication = application;
      state.activeSection = sections[0];
      state.sections = sections;
      state.rows = rows;
      state.columns = columns;
      state.inputs = inputs;
      state.loadingStatuses.applicationLoading = "succeeded";
      state.loadingStatuses.sectionLoading = "idle";
    });
    builder.addCase(GetApplication.rejected, (state, action) => {
      // state.error = action.payload.message;
      state.loadingStatuses.applicationLoading = "idle";
    });
  },
});

export const {
  setActiveSection,
  setActiveRow,
  setActiveColumn,
  setActiveInput,
  setActiveApplication,
  resetSectionLoadingStatuses,
} = applySlice.actions;

export const selectSections = (state: RootState) => state.apply.sections;
export const selectRows = (state: RootState) => state.apply.rows;
export const selectColumns = (state: RootState) => state.apply.columns;
export const selectLoadingStatuses = (state: RootState) =>
  state.apply.loadingStatuses;

export const selectActiveApplication = (state: RootState) =>
  state.apply.activeApplication;
export const selectActiveSection = (state: RootState) =>
  state.apply.activeSection;
export const selectActiveRow = (state: RootState) => state.apply.activeRow;
export const selectActiveColumn = (state: RootState) =>
  state.apply.activeColumn;
export const selectActiveInput = (state: RootState) => state.apply.activeInput;

export const selectSection = (
  sectionId: string
): Selector<ISection | undefined> =>
  createSelector(
    [(state: RootState) => state.apply.sections],
    (sections: ISection[]) =>
      sections.find((section) => section.id == sectionId)
  );

export const selectSectionRows = (
  sectionId: string
): Selector<IRow[] | undefined> =>
  createSelector([(state: RootState) => state.apply.rows], (rows: IRow[]) =>
    rows.filter((row) => row.sectionId == sectionId)
  );

export const selectRowColumns = (
  rowId: string
): Selector<IColumn[] | undefined> =>
  createSelector(
    [(state: RootState) => state.apply.columns],
    (columns: IColumn[]) => columns.filter((column) => column.rowId == rowId)
  );

export const selectInput = (
  columnId: string | undefined
): Selector<IInput | undefined> =>
  createSelector(
    [(state: RootState) => state.apply.inputs],
    (inputs: IInput[]) => inputs.find((input) => input.columnId === columnId)
  );

export default applySlice.reducer;
