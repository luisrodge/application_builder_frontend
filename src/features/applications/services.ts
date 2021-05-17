import { createAsyncThunk } from "@reduxjs/toolkit";
import { normalize, schema } from "normalizr";

import api from "../../utils/api";

import {
  IApplication,
  IErrorMessage,
  IApplicationAttributes,
  ISection,
  IRow,
  IColumn,
  IApplicationWithChildren,
} from "./applications.interface";

export const GetApplications = createAsyncThunk(
  "applications/list",
  async () => {
    const response = await api.get(`applications`);
    return (await response.data) as IApplication[];
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
    const normalizedData = normalize(data, applicationSchema);

    const {
      applications,
      sections: normedSections,
      rows: normedRows,
      columns: normedColumns,
    } = normalizedData.entities;

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
  // Return type of the payload creator
  IApplication,
  // First argument to the payload creator
  IApplicationAttributes,
  // Types for ThunkAPI
  {
    rejectValue: IErrorMessage;
  }
>("applications/create", async (application, thunkApi) => {
  const response = await api.post(`applications`, application);
  if (response.status !== 200) {
    return thunkApi.rejectWithValue({
      message: "Failed to fetch application.",
    } as IErrorMessage);
  }
  return (await response.data) as IApplication;
});
