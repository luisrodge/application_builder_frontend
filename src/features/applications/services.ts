import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IApplication } from "./applications.interface";

const BASE_URL = "http://localhost:3000";

export const GetApplications = createAsyncThunk(
  "applications/getApplications",
  async () => {
    const response = await axios.get(`${BASE_URL}/applications`);
    return (await response.data) as IApplication[];
  }
);
