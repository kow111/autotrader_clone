import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { FilterOptions } from "@/types/type";
import { API_BASE_URL } from "@/config/apiBaseUrl";

export const filterOptionsApi = createApi({
  reducerPath: "filterOptionsApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    getFilterOptions: builder.query<FilterOptions, void>({
      query: () => "/cars/filters",
    }),
  }),
});

export const { useGetFilterOptionsQuery } = filterOptionsApi;
