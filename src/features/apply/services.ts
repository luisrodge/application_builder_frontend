import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { normalize } from "normalizr";
import { serialize } from "object-to-formdata";

import api, { API_HOST } from "../../utils/api";
import {
  IApplication,
  IApplicationWithChildren,
  IColumn,
  ICreateSubmissionParams,
  IErrorMessage,
  IExpandedShortUrl,
  IInput,
  IRow,
  ISection,
} from "../applications/applications.interface";
import { ApplicationSchema } from "../applications/schemas";
import { RootState } from "../../app/store";

export const GetApplication = createAsyncThunk<
  IApplicationWithChildren,
  string,
  {
    rejectValue: IErrorMessage;
  }
>("applications/get", async (slug, thunkApi) => {
  try {
    const { data } = await api.get(`applications/${slug}`);

    const { entities } = normalize(data, ApplicationSchema);

    const {
      applications,
      sections: normedSections,
      rows: normedRows,
      columns: normedColumns,
      inputs: normedInputs,
    } = entities;

    const appliactionId = data.id;

    const application = applications![appliactionId];
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

export const CreateSubmission = createAsyncThunk<
  IApplication,
  ICreateSubmissionParams,
  {
    rejectValue: IErrorMessage;
    state: RootState;
  }
>("submissions/create", async (params, { rejectWithValue, getState }) => {
  const { submission } = getState().apply;

  const finalSubmission = { ...submission, ...params };

  const response = await axios.post(
    `${API_HOST}/submissions`,
    serialize({ submission: finalSubmission })
  );

  if (response.status !== 200) {
    return rejectWithValue({
      message: "Failed to submit application.",
    } as IErrorMessage);
  }
  return {} as IApplication;
});

export const GetApplicationSlugByShortUrl = createAsyncThunk(
  "short_url/expand",
  async (shortUrl: string) => {
    const { data } = await api.get(`s/${shortUrl}`);

    return { applicationSlug: data } as IExpandedShortUrl;
  }
);
