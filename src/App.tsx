import "./App.css";
import { useQuery } from "@tanstack/react-query";
import TodoService from "./services/todo";

function App() {
  const { data, isSuccess, isLoading } = useQuery(["todo"], () => TodoService.getTodos(), {
    select: (data) => data.data,
    onSuccess(data) {
      console.log(data.length)
    },
    onError: (err) => {
      console.log(err)
    }
  });

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (!isSuccess) {
    return <h3>Smth went worng...</h3>;
  }

  return (
    <>
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
