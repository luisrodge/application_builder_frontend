import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";

import type { RootState } from "../../app/store";
import { Selector } from "../../shared/types";
import {
  ISection,
  IColumn,
  IRow,
  IInput,
  IApplication,
  IErrorMessage,
} from "../applications/applications.interface";
import {
  IFieldData,
  IFilledInputAttributes,
  ISectionFields,
  ISetSectionFieldsAttributes,
  ISubmissionColumnAttributes,
  ISubmissionRowAttributes,
  ISubmissionSectionAttributes,
} from "./apply.interface";
import {
  CreateSubmission,
  GetApplication,
  GetApplicationSlugByShortUrl,
} from "./services";

type LoadingType = "idle" | "pending" | "succeeded" | "failed";

interface ILoadingState {
  sectionLoading: LoadingType;
  applicationLoading: LoadingType;
  applySubmitLoading: LoadingType;
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
  error: IErrorMessage | null;
  loadingStatuses: ILoadingState;
  sectionFields: ISectionFields;
  currentStep: number;
  submission: ICreateSubmissionAttributes;
  redirectApplicationSlug?: string;
}

const initialLoadingState = {
  sectionLoading: "idle",
  applicationLoading: "idle",
} as ILoadingState;

interface ICreateSubmissionAttributes {
  applicationId: number;
  email?: string;
  submissionSectionsAttributes: ISubmissionSectionAttributes[];
}

const initialState: ApplyState = {
  sections: [],
  rows: [],
  columns: [],
  inputs: [],
  error: null,
  loadingStatuses: initialLoadingState,
  sectionFields: {},
  currentStep: 0,
  submission: {} as ICreateSubmissionAttributes,
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
    setSectionFields: (
      state,
      action: PayloadAction<ISetSectionFieldsAttributes>
    ) => {
      const { sectionId, fields } = action.payload;
      state.sectionFields[sectionId] = fields;
    },
    resetSectionLoadingStatuses: (state) => {
      state.loadingStatuses.sectionLoading = "idle";
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setSubmissionAttributes: (state) => {
      const submissionSectionsAttributes: ISubmissionSectionAttributes[] = [];

      for (const section of state.sections) {
        let submissionSectionAttributes = {
          sectionId: section.id,
          title: section.title,
          details: section.details,
          submissionRowsAttributes: [],
        } as ISubmissionSectionAttributes;

        const sectionRows = state.rows.filter(
          (row) => row.sectionId === section.id
        );
        for (const row of sectionRows) {
          let submissionRowsAttributes = {
            rowId: row.id,
            submissionColumnsAttributes: [],
          } as ISubmissionRowAttributes;
          const columns = state.columns.filter(
            (column) => column.rowId === row.id
          );
          for (const column of columns) {
            const input = state.inputs.find(
              (input) => input.columnId === column.id
            );
            const sectionFields = state.sectionFields[section.id];
            const field = sectionFields.find(
              (field) => field.name[0] === input!.name
            );

            // Not working properly when removing file, value still contains {file: {...}, fileList: []}
            // Should actually contain an empty string
            const value =
              field?.value.hasOwnProperty("fileList") &&
              field?.value.fileList.length
                ? field?.value.fileList[0].name
                : field?.value;

            const file =
              field?.value.hasOwnProperty("fileList") &&
              field?.value.fileList.length
                ? field?.value.fileList[0]
                : undefined;

            const filledInputAttributes = {
              name: field?.name[0],
              value,
              file,
              inputId: input?.id,
            } as IFilledInputAttributes;

            const submissionColumnAttributes: ISubmissionColumnAttributes = {
              columnId: column.id,
              filledInputAttributes,
            };
            submissionRowsAttributes.submissionColumnsAttributes.push(
              submissionColumnAttributes
            );
          }
          submissionSectionAttributes.submissionRowsAttributes.push(
            submissionRowsAttributes
          );
        }
        submissionSectionsAttributes.push(submissionSectionAttributes);
      }
      state.submission = {
        applicationId: state.activeApplication!.id,
        submissionSectionsAttributes,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(CreateSubmission.pending, (state) => {
      state.loadingStatuses.applySubmitLoading = "pending";
    });
    builder.addCase(CreateSubmission.fulfilled, (state) => {
      state.loadingStatuses.applySubmitLoading = "succeeded";
    });
    builder.addCase(CreateSubmission.rejected, (state) => {
      state.loadingStatuses.applySubmitLoading = "failed";
    });
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

      // Construct state object to keep track of input changes
      const sectionFields = {} as ISectionFields;
      for (const section of sections) {
        const sectionInputs = inputs
          .filter((input) => input.sectionId === section.id)
          .map((inputValue) => ({
            name: inputValue.name,
            value: "",
          })) as IFieldData[];
        sectionFields[section.id] = [...sectionInputs];
      }
      state.sectionFields = sectionFields;
    });
    builder.addCase(GetApplication.rejected, (state, action) => {
      if (action.payload) state.error = action.payload;
      state.loadingStatuses.applicationLoading = "failed";
    });
    builder.addCase(GetApplicationSlugByShortUrl.fulfilled, (state, action) => {
      const { applicationSlug } = action.payload;
      state.redirectApplicationSlug = applicationSlug;
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
  setSectionFields,
  setCurrentStep,
  setSubmissionAttributes,
} = applySlice.actions;

export const selectSections = (state: RootState) => state.apply.sections;
export const selectRows = (state: RootState) => state.apply.rows;
export const selectColumns = (state: RootState) => state.apply.columns;
export const selectInputs = (state: RootState) => state.apply.inputs;
export const selectLoadingStatuses = (state: RootState) =>
  state.apply.loadingStatuses;
export const selectCurrentStep = (state: RootState) => state.apply.currentStep;
export const selectFields = (state: RootState) => state.apply.sectionFields;
export const selectRedirectSlug = (state: RootState) =>
  state.apply.redirectApplicationSlug;
export const selectError = (state: RootState) => state.apply.error;

export const selectActiveApplication = (state: RootState) =>
  state.apply.activeApplication;
export const selectActiveSection = (state: RootState) =>
  state.apply.activeSection;
export const selectActiveRow = (state: RootState) => state.apply.activeRow;
export const selectActiveColumn = (state: RootState) =>
  state.apply.activeColumn;
export const selectActiveInput = (state: RootState) => state.apply.activeInput;

export const selectSection = (
  sectionId: number
): Selector<ISection | undefined> =>
  createSelector(
    [(state: RootState) => state.apply.sections],
    (sections: ISection[]) =>
      sections.find((section) => section.id === sectionId)
  );

export const selectSectionRows = (
  sectionId: number
): Selector<IRow[] | undefined> =>
  createSelector([(state: RootState) => state.apply.rows], (rows: IRow[]) =>
    rows.filter((row) => row.sectionId === sectionId)
  );

export const selectRowColumns = (
  rowId: number
): Selector<IColumn[] | undefined> =>
  createSelector(
    [(state: RootState) => state.apply.columns],
    (columns: IColumn[]) => columns.filter((column) => column.rowId === rowId)
  );

export const selectInput = (
  columnId: number | undefined
): Selector<IInput | undefined> =>
  createSelector(
    [(state: RootState) => state.apply.inputs],
    (inputs: IInput[]) => inputs.find((input) => input.columnId === columnId)
  );

export const selectSectionFields = (
  sectionId: number
): Selector<IFieldData[]> =>
  createSelector(
    [(state: RootState) => state.apply.sectionFields],
    (sectionFields: ISectionFields) => sectionFields[sectionId]
  );

export default applySlice.reducer;
