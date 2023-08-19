import { useQuery } from "@tanstack/react-query";

import TodoService from "../services/todo";

export const useTodoQuery = (todoId: number) => {
  return useQuery(["todos", todoId], () => TodoService.getTodoById(todoId), {
    select: (data) => data.data,
    enabled: !!todoId,
  });
};
