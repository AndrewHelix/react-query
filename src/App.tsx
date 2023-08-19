import { useQueryClient } from "@tanstack/react-query";
import "./App.css";
import { useTodosQuery } from "./hooks/useTodosQuery";

function App() {
  const { data, isLoading, isSuccess } = useTodosQuery();

  const queryClient = useQueryClient();

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (!isSuccess) {
    return <h3>Smth went worng...</h3>;
  }

  return (
    <>
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
