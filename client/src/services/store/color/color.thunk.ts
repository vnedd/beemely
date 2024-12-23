import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../config/client";
import { IColor } from "../product/product.model";
import { IThunkPayload } from "@/shared/utils/shared-interfaces";

const colorPrefix = "/api/client/color";

export const getAllColor = createAsyncThunk("colors/getAllColor", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IColor[]>(colorPrefix, payload);
    return response.status >= 400 ? rejectWithValue(data) : data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});