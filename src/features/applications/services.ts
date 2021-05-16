import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  IApplication,
  IErrorMessage,
  IApplicationAttributes,
} from "./applications.interface";

const BASE_URL = "http://localhost:3000";

export const GetApplications = createAsyncThunk(
  "applications/list",
  async () => {
    const response = await axios.get(`${BASE_URL}/applications`);
    return (await response.data) as IApplication[];
  }
);

export const GetApplication = createAsyncThunk(
  "applications/get",
  async (id: string) => {
    const response = await axios.get(`${BASE_URL}/applications/${id}`);
    return (await response.data) as IApplication;
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
  const response = await axios.post(`${BASE_URL}/applications`, application);
  if (response.status !== 200) {
    return thunkApi.rejectWithValue({
      message: "Failed to fetch applications.",
    } as IErrorMessage);
  }
  return (await response.data) as IApplication;
});
