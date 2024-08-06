import { api as index } from "..";

const ENDPOINT = process.env.NEXT_PUBLIC_API_END;
const api = index.injectEndpoints({
  endpoints: (builder) => ({
    getTodo: builder.query<TODO.getTodoResponse, TODO.getTodoRequest>({
      query: () => ({
        url: ENDPOINT,
        method: "GET",
      }),
      providesTags: ["todo"],
    }),
    postTodo: builder.mutation<TODO.postTodoResponse, TODO.postTodoRequest>({
      query: (data) => ({
        url: ENDPOINT,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["todo"],
    }),
    updateTodo: builder.mutation<TODO.editTodoResponse, TODO.editTodoRequest>({
      query: ({ _id, updateTodo }) => ({
        url: `${ENDPOINT}/${_id}`,
        method: "PATCH",
        body: updateTodo,
      }),
      invalidatesTags: ["todo"],
    }),
    deleteTodo: builder.mutation<
      TODO.deleteTodoResponse,
      TODO.deleteTodoRequest
    >({
      query: (_id) => ({
        url: `${ENDPOINT}/${_id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTodoQuery,
  usePostTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = api;
