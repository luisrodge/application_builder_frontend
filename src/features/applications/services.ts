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
  IUpdateApplicationAttributes,
} from "./applications.interface";
import { ApplicationSchema, RowSchema, SectionSchema } from "./schemas";

export const GetApplications = createAsyncThunk(
  "applications/list",
  async () => {
    const response = await api.get(`admin/applications`);
    return response.data as IApplication[];
  }
);

export const GetApplication = createAsyncThunk<
  IApplicationWithChildren,
  string,
  {
    rejectValue: IErrorMessage;
  }
>("applications/get", async (slug, thunkApi) => {
  try {
    const { data } = await api.get(`admin/applications/${slug}`);

    const { entities } = normalize(data, ApplicationSchema);

    const {
      applications,
      sections: normedSections,
      rows: normedRows,
      columns: normedColumns,
      inputs: normedInputs,
    } = entities;

    const applicationId = data.id;

    const application = applications![applicationId];
    const sections =
      normedSections === undefined
        ? []
        : Object.keys(normedSections).map((id) => normedSections[id]);
    const rows =
      normedRows === undefined
        ? []
        : Object.keys(normedRows).map((id) => normedRows[id]);
    const columns =
      normedColumns === undefined
        ? []
        : Object.keys(normedColumns).map((id) => normedColumns[id]);
    const inputs =
      normedInputs === undefined
        ? []
        : Object.keys(normedInputs).map((id) => normedInputs[id]);

    const applicationData = {
      application: application as IApplication,
      sections: sections as ISection[],
      rows: rows as IRow[],
      columns: columns as IColumn[],
      inputs: inputs as IInput[],
    };

    return applicationData as IApplicationWithChildren;
  } catch (error) {
    return thunkApi.rejectWithValue({
      message: "Failed to load application.",
      status: error.response.status,
    } as IErrorMessage);
  }
});

export const CreateApplication = createAsyncThunk<
  IApplication,
  ICreateApplicationAttributes,
  {
    rejectValue: IErrorMessage;
  }
>("applications/create", async (application, thunkApi) => {
  const response = await api.post(`admin/applications`, application);
  if (response.status !== 200) {
    return thunkApi.rejectWithValue({
      message: "Failed to create application.",
    } as IErrorMessage);
  }
  return response.data as IApplication;
});

export const UpdateApplication = createAsyncThunk<
  IApplication,
  IUpdateApplicationAttributes,
  {
    rejectValue: IErrorMessage;
  }
>("applications/update", async (application, thunkApi) => {
  const response = await api.put(
    `admin/applications/${application.id}`,
    application
  );
  if (response.status !== 200) {
    return thunkApi.rejectWithValue({
      message: "Failed to update application.",
    } as IErrorMessage);
  }
  return response.data as IApplication;
});

export const DeleteApplication = createAsyncThunk<
  number,
  number,
  {
    rejectValue: IErrorMessage;
  }
>("applications/delete", async (applicationId, thunkApi) => {
  const response = await api.delete(`admin/applications/${applicationId}`);
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
  const response = await api.post("admin/sections", section);
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
  try {
    const { data } = await api.get(`admin/sections/${id}`);

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
      normedRows === undefined
        ? []
        : Object.keys(normedRows).map((id) => normedRows[id]);
    const columns =
      normedColumns === undefined
        ? []
        : Object.keys(normedColumns).map((id) => normedColumns[id]);
    const inputs =
      normedInputs === undefined
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
  } catch (error) {
    return thunkApi.rejectWithValue({
      message: "Failed to load application.",
      status: error.response.status,
    } as IErrorMessage);
  }
});

export const DeleteSection = createAsyncThunk<
  number,
  number,
  {
    rejectValue: IErrorMessage;
  }
>("sections/delete", async (sectionId, thunkApi) => {
  const response = await api.delete(`admin/sections/${sectionId}`);
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
  const response = await api.post("admin/rows", { row: newRow });
  if (response.status !== 200) {
    return thunkApi.rejectWithValue({
      message: "Failed to create row.",
    } as IErrorMessage);
  }

  const { entities } = normalize(response.data, RowSchema);
  const { rows: normedRows, columns: normedColumns } = entities;

  const row = normedRows![Object.keys(normedRows!)[0]];

  const columns =
    normedColumns === undefined
      ? []
      : Object.keys(normedColumns).map((id) => normedColumns[id]);

  const rowData = {
    row: row as IRow,
    columns: columns as IColumn[],
  };

  return rowData as IRowWithChildren;
});

export const DeleteRow = createAsyncThunk<
  number,
  number,
  {
    rejectValue: IErrorMessage;
  }
>("rows/delete", async (rowId, thunkApi) => {
  const response = await api.delete(`admin/rows/${rowId}`);
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
  const response = await api.delete(`admin/columns/${column.id}`);
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
  const response = await api.post("admin/inputs", input);
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
  const response = await api.delete(`admin/inputs/${inputId}`);
  if (response.status !== 200) {
    return thunkApi.rejectWithValue({
      message: "Failed to delete input",
    } as IErrorMessage);
  }
  return inputId;
});

export const Publish = createAsyncThunk<
  string,
  string,
  {
    rejectValue: IErrorMessage;
  }
>("applications/publish", async (applicationSlug, thunkApi) => {
  const response = await api.patch(
    `admin/applications/${applicationSlug}/publish`
  );
  if (response.status !== 200) {
    return thunkApi.rejectWithValue({
      message: "Failed to publish application.",
    } as IErrorMessage);
  }
  return applicationSlug;
});
