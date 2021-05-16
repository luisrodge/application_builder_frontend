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
} from "./applications.interface";
import { CreateApplication, GetApplications, GetApplication } from "./services";

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
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ApplicationState = {
  applications: [],
  sections: [],
  rows: [],
  columns: [],
  elements: [],
  loading: "idle",
  error: null,
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
    setActiveElement: (state, action: PayloadAction<IElement | undefined>) => {
      state.activeElement = action.payload;
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
  extraReducers: (builder) => {
    builder.addCase(GetApplications.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(GetApplications.fulfilled, (state, action) => {
      state.applications = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(GetApplication.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(GetApplication.fulfilled, (state, action) => {
      state.activeApplication = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(GetApplications.rejected, (state, action) => {
      // state.error = action.payload.message;
      state.loading = "idle";
    });
    builder.addCase(CreateApplication.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(CreateApplication.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(CreateApplication.rejected, (state, action) => {
      if (action.payload) state.error = action.payload.message;
      state.loading = "idle";
    });
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
  addElement,
  removeElement,
  setActiveElement,
  setActiveApplication,
  resetActive,
} = applicationsSlice.actions;

export const selectApplications = (state: RootState) =>
  state.applications.applications;
export const selectSections = (state: RootState) => state.applications.sections;
export const selectRows = (state: RootState) => state.applications.rows;
export const selectColumns = (state: RootState) => state.applications.columns;
export const selectLoading = (state: RootState) => state.applications.loading;

export const selectActiveApplication = (state: RootState) =>
  state.applications.activeApplication;
export const selectActiveSection = (state: RootState) =>
  state.applications.activeSection;
export const selectActiveRow = (state: RootState) =>
  state.applications.activeRow;
export const selectActiveColumn = (state: RootState) =>
  state.applications.activeColumn;
export const selectActiveElement = (state: RootState) =>
  state.applications.activeElement;

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

export const selectElement = (
  columnId: string | undefined
): Selector<IElement | undefined> =>
  createSelector(
    [(state: RootState) => state.applications.elements],
    (elements: IElement[]) =>
      elements.find((element) => element.columnId === columnId)
  );

export default applicationsSlice.reducer;
