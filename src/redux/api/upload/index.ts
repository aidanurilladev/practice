import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (builder) => ({
    postUpl: builder.mutation<UPL.postUploadResponse, UPL.postUploadRequest>({
      query: (data) => ({
        url: "/upload/file",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["upload"],
    }),
  }),
});
export const { usePostUplMutation } = api;
