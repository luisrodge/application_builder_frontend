import { createAsyncThunk } from "@reduxjs/toolkit";
import { normalize } from "normalizr";

import api from "../../utils/api";
import {
  IApplication,
  IErrorMessage,
  ICreateApplicationAttributes,
  ISection,
  IRow,
  IColumn,
  IApplicationWithChildren,
  ICreateSectionAttributes,
  ISectionWithChildren,
  IRowWithChildren,
  ICreateRowAttributes,
  IDeleteColumnResult,
  IInput,
  ICreateInputAttributes,
} from "./applications.interface";
import { ApplicationSchema, RowSchema, SectionSchema } from "./schemas";

export const GetApplications = createAsyncThunk(
  "applications/list",
  async () => {
    const response = await api.get(`applications`);
    return response.data as IApplication[];
  }
);

export const GetApplication = createAsyncThunk(
  "applications/get",
  async (id: string) => {
    const { data } = await api.get(`applications/${id}`);

    const { entities } = normalize(data, ApplicationSchema);

    const {
      applications,
      sections: normedSections,
      rows: normedRows,
      columns: normedColumns,
      inputs: normedInputs,
    } = entities;

    const application = applications![id];
    const sections =
      normedSections == undefined
        ? []
        : Object.keys(normedSections).map((id) => normedSections[id]);
    const rows =
      normedRows == undefined
        ? []
        : Object.keys(normedRows).map((id) => normedRows[id]);
    const columns =
      normedColumns == undefined
        ? []
        : Object.keys(normedColumns).map((id) => normedColumns[id]);
    const inputs =
      normedInputs == undefined
        ? []
        : Object.keys(normedInputs).map((id) => normedInputs[id]);

    const applicationData = {
      application: application as IApplication,
      sections: sections as ISection[],
      rows: rows as IRow[],
      columns: columns as IColumn[],
      inputs: inputs as IInput[],
    };

    console.log(data);
    return applicationData as IApplicationWithChildren;
  }
);

export const CreateApplication = createAsyncThunk<
  IApplication,
  ICreateApplicationAttributes,
  {
    rejectValue: IErrorMessage;
  }
>("applications/create", async (application, thunkApi) => {
  const response = await api.post(`applications`, application);
  if (response.status !== 200) {
    return thunkApi.rejectWithValue({
      message: "Failed to create application.",
    } as IErrorMessage);
  }
  return response.data as IApplication;
});

export const DeleteApplication = createAsyncThunk<
  string,
  string,
  {
    rejectValue: IErrorMessage;
  }
>("applications/delete", async (applicationId, thunkApi) => {
  const response = await api.delete(`applications/${applicationId}`);
  if (response.status !== 200) {
    return thunkApi.rejectWithValue({
      message: "Failed to delete application.",
    } as IErrorMessage);
  }
  return applicationId;
});

export const CreateSection = createAsyncThunk<
  ISection,
  ICreateSectionAttributes,
  {
    rejectValue: IErrorMessage;
  }
>("sections/create", async (section, thunkApi) => {
  const response = await api.post("sections", section);
  if (response.status !== 200) {
    return thunkApi.rejectWithValue({
      message: "Failed to create section.",
    } as IErrorMessage);
  }
  return response.data as ISection;
});

export const GetSection = createAsyncThunk<
  ISectionWithChildren,
  string,
  {
    rejectValue: IErrorMessage;
  }
>("sections/get", async (id, thunkApi) => {
  const { data, status } = await api.get(`sections/${id}`);

  if (status !== 200) {
    return thunkApi.rejectWithValue({
      message: "Failed to load section.",
    } as IErrorMessage);
  }

  const { entities } = normalize(data, SectionSchema);

  const {
    sections,
    applications,
    rows: normedRows,
    columns: normedColumns,
    inputs: normedInputs,
  } = entities;
  const section = sections![id];
  const application = applications![section.application];

  const rows =
    normedRows == undefined
      ? []
      : Object.keys(normedRows).map((id) => normedRows[id]);
  const columns =
    normedColumns == undefined
      ? []
      : Object.keys(normedColumns).map((id) => normedColumns[id]);
  const inputs =
    normedInputs == undefined
      ? []
      : Object.keys(normedInputs).map((id) => normedInputs[id]);

  const sectionData = {
    section: section as ISection,
    rows: rows as IRow[],
    columns: columns as IColumn[],
    inputs: inputs as IInput[],
    application: application as IApplication,
  };

  return sectionData as ISectionWithChildren;
});

export const DeleteSection = createAsyncThunk<
  string,
  string,
  {
    rejectValue: IErrorMessage;
  }
>("sections/delete", async (sectionId, thunkApi) => {
  const response = await api.delete(`sections/${sectionId}`);
  if (response.status !== 200) {
    return thunkApi.rejectWithValue({
      message: "Failed to delete section.",
    } as IErrorMessage);
  }
  return sectionId;
});

export const CreateRow = createAsyncThunk<
  IRowWithChildren,
  ICreateRowAttributes,
  {
    rejectValue: IErrorMessage;
  }
>("rows/create", async (newRow, thunkApi) => {
  const response = await api.post("rows", { row: newRow });
  if (response.status !== 200) {
    return thunkApi.rejectWithValue({
      message: "Failed to create row.",
    } as IErrorMessage);
  }

  const { entities } = normalize(response.data, RowSchema);
  const { rows: normedRows, columns: normedColumns } = entities;

  const row = normedRows![Object.keys(normedRows!)[0]];

  const columns =
    normedColumns == undefined
      ? []
      : Object.keys(normedColumns).map((id) => normedColumns[id]);

  const rowData = {
    row: row as IRow,
    columns: columns as IColumn[],
  };

  return rowData as IRowWithChildren;
});

export const DeleteRow = createAsyncThunk<
  string,
  string,
  {
    rejectValue: IErrorMessage;
  }
>("rows/delete", async (rowId, thunkApi) => {
  const response = await api.delete(`rows/${rowId}`);
  if (response.status !== 200) {
    return thunkApi.rejectWithValue({
      message: "Failed to delete row.",
    } as IErrorMessage);
  }
  return rowId;
});

export const DeleteColumn = createAsyncThunk<
  IDeleteColumnResult,
  IColumn,
  {
    rejectValue: IErrorMessage;
  }
>("columns/delete", async (column, thunkApi) => {
  const response = await api.delete(`columns/${column.id}`);
  if (response.status !== 200) {
    return thunkApi.rejectWithValue({
      message: "Failed to delete column.",
    } as IErrorMessage);
  }
  return { columnId: column.id, rowId: column.rowId };
});

export const CreateInput = createAsyncThunk<
  IInput,
  ICreateInputAttributes,
  {
    rejectValue: IErrorMessage;
  }
>("inputs/create", async (input, thunkApi) => {
  const response = await api.post("inputs", input);
  if (response.status !== 200) {
    return thunkApi.rejectWithValue({
      message: "Failed to add input",
    } as IErrorMessage);
  }

  return response.data as IInput;
});

export const DeleteInput = createAsyncThunk<
  string,
  string,
  {
    rejectValue: IErrorMessage;
  }
>("inputs/delete", async (inputId, thunkApi) => {
  const response = await api.delete(`inputs/${inputId}`);
  if (response.status !== 200) {
    return thunkApi.rejectWithValue({
      message: "Failed to delete input",
    } as IErrorMessage);
  }
  return inputId;
});
