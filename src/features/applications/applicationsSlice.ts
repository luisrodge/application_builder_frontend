import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";

import type { RootState } from "../../app/store";
import { Selector } from "../../shared/types";
import {
  ISection,
  IColumn,
  IRow,
  IInput,
  IApplication,
} from "./applications.interface";
import {
  CreateApplication,
  GetApplications,
  GetApplication,
  DeleteApplication,
  CreateSection,
  GetSection,
  DeleteSection,
  CreateRow,
  DeleteRow,
  DeleteColumn,
  CreateInput,
  DeleteInput,
} from "./services";

type LoadingType = "idle" | "pending" | "succeeded" | "failed";

interface ILoadingState {
  sectionLoading: LoadingType;
  applicationLoading: LoadingType;
}

interface ApplicationState {
  applications: IApplication[];
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

const initialState: ApplicationState = {
  applications: [],
  sections: [],
  rows: [],
  columns: [],
  inputs: [],
  error: null,
  loadingStatuses: initialLoadingState,
};

export const applicationsSlice = createSlice({
  name: "applications",
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
    builder.addCase(GetApplications.pending, (state) => {
      state.loadingStatuses.applicationLoading = "pending";
    });
    builder.addCase(GetApplications.fulfilled, (state, action) => {
      state.applications = action.payload;
      state.loadingStatuses.applicationLoading = "succeeded";
    });
    builder.addCase(GetApplication.pending, (state) => {
      state.loadingStatuses.applicationLoading = "pending";
    });
    builder.addCase(GetApplication.fulfilled, (state, action) => {
      const { application, sections, rows, columns, inputs } = action.payload;
      state.activeApplication = application;
      state.sections = sections;
      state.rows = rows;
      state.columns = columns;
      state.inputs = inputs;
      state.loadingStatuses.applicationLoading = "succeeded";
      state.loadingStatuses.sectionLoading = "idle";
    });
    builder.addCase(GetApplications.rejected, (state, action) => {
      // state.error = action.payload.message;
      state.loadingStatuses.applicationLoading = "idle";
    });
    builder.addCase(CreateApplication.pending, (state) => {
      state.loadingStatuses.applicationLoading = "pending";
    });
    builder.addCase(CreateApplication.fulfilled, (state) => {
      state.loadingStatuses.applicationLoading = "succeeded";
    });
    builder.addCase(CreateApplication.rejected, (state, action) => {
      if (action.payload) state.error = action.payload.message;
      state.loadingStatuses.applicationLoading = "idle";
    });
    builder.addCase(DeleteApplication.fulfilled, (state, action) => {
      const applicationId = action.payload;
      const applications = state.applications.filter(
        (application) => application.id != applicationId
      );
      state.applications = applications;
    });
    builder.addCase(DeleteApplication.rejected, (state, action) => {
      if (action.payload) state.error = action.payload.message;
    });
    builder.addCase(CreateSection.fulfilled, (state, action) => {
      const section = action.payload;
      state.sections.push(section);
      state.loadingStatuses.sectionLoading = "succeeded";
    });
    builder.addCase(CreateSection.rejected, (state, action) => {
      if (action.payload) state.error = action.payload.message;
      state.loadingStatuses.sectionLoading = "idle";
    });
    builder.addCase(GetSection.pending, (state) => {
      state.loadingStatuses.sectionLoading = "pending";
    });
    builder.addCase(GetSection.fulfilled, (state, action) => {
      const { section, rows, columns, inputs, application } = action.payload;

      state.activeSection = section;
      state.activeApplication = application;
      state.rows = rows;
      state.columns = columns;
      state.inputs = inputs;
      state.loadingStatuses.sectionLoading = "succeeded";
    });
    builder.addCase(GetSection.rejected, (state, action) => {
      // state.error = action.payload.message;
      state.loadingStatuses.sectionLoading = "failed";
    });
    builder.addCase(DeleteSection.fulfilled, (state, action) => {
      const sectionId = action.payload;
      const sections = state.sections.filter(
        (section) => section.id != sectionId
      );
      state.sections = sections;
    });
    builder.addCase(DeleteSection.rejected, (state, action) => {
      if (action.payload) state.error = action.payload.message;
    });
    builder.addCase(CreateRow.fulfilled, (state, action) => {
      const { row, columns } = action.payload;
      state.rows.push(row);
      state.columns.push(...columns);
    });
    builder.addCase(CreateRow.rejected, (state, action) => {
      if (action.payload) state.error = action.payload.message;
    });
    builder.addCase(DeleteRow.fulfilled, (state, action) => {
      const rowId = action.payload;
      const rows = state.rows.filter((row) => row.id != rowId);
      const columns = state.columns.filter((column) => column.rowId != rowId);
      state.rows = rows;
      state.columns = columns;
    });
    builder.addCase(DeleteRow.rejected, (state, action) => {
      if (action.payload) state.error = action.payload.message;
    });
    builder.addCase(DeleteColumn.fulfilled, (state, action) => {
      const { columnId, rowId } = action.payload;

      if (state.columns.filter((column) => column.rowId == rowId).length == 1) {
        const rows = state.rows.filter((row) => row.id != rowId);
        state.rows = rows;
      }
      const columns = state.columns.filter((column) => column.id != columnId);
      state.columns = columns;
    });
    builder.addCase(DeleteColumn.rejected, (state, action) => {
      if (action.payload) state.error = action.payload.message;
    });
    builder.addCase(CreateInput.fulfilled, (state, action) => {
      const input = action.payload;
      state.inputs.push(input);
    });
    builder.addCase(CreateInput.rejected, (state, action) => {
      if (action.payload) state.error = action.payload.message;
    });
    builder.addCase(DeleteInput.fulfilled, (state, action) => {
      const inputId = action.payload;
      const inputs = state.inputs.filter((input) => input.id != inputId);
      state.inputs = inputs;
    });
    builder.addCase(DeleteInput.rejected, (state, action) => {
      if (action.payload) state.error = action.payload.message;
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
} = applicationsSlice.actions;

export const selectApplications = (state: RootState) =>
  state.applications.applications;
export const selectSections = (state: RootState) => state.applications.sections;
export const selectRows = (state: RootState) => state.applications.rows;
export const selectColumns = (state: RootState) => state.applications.columns;
export const selectLoadingStatuses = (state: RootState) =>
  state.applications.loadingStatuses;

export const selectActiveApplication = (state: RootState) =>
  state.applications.activeApplication;
export const selectActiveSection = (state: RootState) =>
  state.applications.activeSection;
export const selectActiveRow = (state: RootState) =>
  state.applications.activeRow;
export const selectActiveColumn = (state: RootState) =>
  state.applications.activeColumn;
export const selectActiveInput = (state: RootState) =>
  state.applications.activeInput;

export const selectApplication = (
  applicationId: string
): Selector<IApplication | undefined> =>
  createSelector(
    [(state: RootState) => state.applications.applications],
    (applications: IApplication[]) =>
      applications.find((application) => application.id === applicationId)
  );

export const selectSection = (
  sectionId: string
): Selector<ISection | undefined> =>
  createSelector(
    [(state: RootState) => state.applications.sections],
    (sections: ISection[]) =>
      sections.find((section) => section.id == sectionId)
  );

export const selectSectionRows = (
  sectionId: string
): Selector<IRow[] | undefined> =>
  createSelector(
    [(state: RootState) => state.applications.rows],
    (rows: IRow[]) => rows.filter((row) => row.sectionId == sectionId)
  );

export const selectRowColumns = (
  rowId: string
): Selector<IColumn[] | undefined> =>
  createSelector(
    [(state: RootState) => state.applications.columns],
    (columns: IColumn[]) => columns.filter((column) => column.rowId == rowId)
  );

export const selectInput = (
  columnId: string | undefined
): Selector<IInput | undefined> =>
  createSelector(
    [(state: RootState) => state.applications.inputs],
    (inputs: IInput[]) => inputs.find((input) => input.columnId === columnId)
  );

export default applicationsSlice.reducer;
