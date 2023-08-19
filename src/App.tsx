import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import "./App.css";
import { useTodosQuery } from "./hooks/useTodosQuery";

import TodoService from "./services/todo";

function App() {
  const { data, isLoading, isSuccess } = useTodosQuery();
  const [title, setTitle] = useState("");

  const queryClient = useQueryClient();

  const { mutate } = useMutation(["create todo"], (title: string) => TodoService.createTodo(title), {
    onSuccess: (data) => {
      setTitle("");
      console.log(data);
    },
  });

  const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(title);
  };

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (!isSuccess) {
    return <h3>Smth went worng...</h3>;
  }

  return (
    <>
      <form onSubmit={submitFormHandler}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Todo title" />
        <button type="submit">SEND NEW TODO</button>
      </form>
      <br />
      <button onClick={() => queryClient.invalidateQueries(["todos"])}>UPDATE DATA</button>
      {!!data.length &&
        data.map((todo) => (
          <div key={todo.id}>
            <h4>{todo.title}</h4>
            <p>{todo.completed}</p>
            <p>by {todo.userId}</p>
          </div>
        ))}
    </>
  );
}

export default App;
