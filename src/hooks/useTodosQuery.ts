import { useQuery } from "@tanstack/react-query";

import TodoService from "../services/todo";

export const useTodosQuery = () =>
  useQuery(["todos"], () => TodoService.getTodos(), {
    select: (data) => data.data,
    retry: 3,
    onSuccess(data) {
      console.log(data.length);
    },
    onError: (err) => {
      console.log(err);
    },
  });
