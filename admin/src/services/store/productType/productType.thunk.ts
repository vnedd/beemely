import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProductType } from "./productType.model";
import { IThunkPayload } from "@/shared/utils/shared-interfaces";
import { client } from "@/services/config/client";
import { messageCreator } from "@/services/config/message-creator";

const dataKeys: { [key in keyof Omit<IProductType, "id" | "productCount">]: string } = {
  name: "Tên productTypes",
  imageUrl: "Hình ảnh",
  slug: "Slug",
};

const prefix = "/api/product-types";

export const getAllProductTypes = createAsyncThunk("productTypes/get-all-productTypes", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.get<IProductType[]>(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const getProductTypeById = createAsyncThunk(
  "productTypes/get-productTypes-by-id",
  async (payload: IThunkPayload, { rejectWithValue }) => {
    try {
      const { response, data } = await client.get<IProductType>(prefix, payload);
      return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
    } catch (error: any) {
      return rejectWithValue(messageCreator(error.response.data, dataKeys));
    }
  },
);

export const createProductType = createAsyncThunk("productTypes/create-productTypes", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.post<IProductType[]>(prefix, payload); // ! IproductTypes[]
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const updateProductType = createAsyncThunk("productTypes/update-productTypes", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.patch<IProductType[]>(prefix, payload); // ! IproductTypes[]
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : data;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});

export const deleteProductType = createAsyncThunk("productTypes/delete-productTypes", async (payload: IThunkPayload, { rejectWithValue }) => {
  try {
    const { response, data } = await client.delete(prefix, payload);
    return response.status >= 400 ? rejectWithValue(messageCreator(data, dataKeys)) : payload.param;
  } catch (error: any) {
    return rejectWithValue(messageCreator(error.response.data, dataKeys));
  }
});
