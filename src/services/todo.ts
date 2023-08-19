import { Todo } from "./../types/todo";
import axios from "axios";

class TodoService {
  private readonly url = "https://jsonplaceholder.typicode.com/todos/";

  getTodoById(id: number) {
    return axios.get<Todo>(this.url + id);
  }

  getTodos() {
    return axios.get<Todo[]>(this.url);
  }
}

export default new TodoService();
