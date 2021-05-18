import { createAsyncThunk } from "@reduxjs/toolkit";
import { normalize, schema } from "normalizr";

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
} from "./applications.interface";

export const GetApplications = createAsyncThunk(
  "applications/list",
  async () => {
    const response = await api.get(`applications`);
    return response.data as IApplication[];
  }
);

const columnSchema = new schema.Entity("columns");
const rowSchema = new schema.Entity("rows", {
  columns: [columnSchema],
});
const sectionSchema = new schema.Entity("sections", {
  rows: [rowSchema],
});
const applicationSchema = new schema.Entity("applications", {
  sections: [sectionSchema],
});

export const GetApplication = createAsyncThunk(
  "applications/get",
  async (id: string) => {
    const { data } = await api.get(`applications/${id}`);

    const { entities } = normalize(data, applicationSchema);

    const {
      applications,
      sections: normedSections,
      rows: normedRows,
      columns: normedColumns,
    } = entities;

    // console.log(normalizedData);

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

    const applicationData = {
      application: application as IApplication,
      sections: sections as ISection[],
      rows: rows as IRow[],
      columns: columns as IColumn[],
    };

    console.log(applicationData);

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
