import { Todo } from "./../types/todo";
import axios from "axios";

class TodoService {
  private readonly url = "https://jsonplaceholder.typicode.com/todos/";

  getTodoById(id: number) {
    return axios.get<Todo>(this.url + id);
  }

  getTodos() {
    return axios.get<Todo[]>(`${this.url}?_start=0&_limit=5`);
  }

  createTodo(title: string) {
    return axios
      .post<Todo>(this.url, {
        data: {
          title,
          userId: 1,
          completed: false,
        },
      })
      .then((data) => data.data);
  }
}

export default new TodoService();
