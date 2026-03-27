import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const TODOS_API_URL = '/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTodos = async () => {
    try {
      const response = await axios.get(TODOS_API_URL);
      setTodos(response.data);
    } catch (error) {
      console.error("데이터 로딩 에러:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!title) return;
    try {
      await axios.post(TODOS_API_URL, { title });
      setTitle("");
      fetchTodos();
    } catch (error) {
      console.error("추가 에러:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${TODOS_API_URL}/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error("삭제 에러:", error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      await axios.put(`${TODOS_API_URL}/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("토글 에러:", error);
    }
  };

  return (
    <div className="App">
      <main className="app-shell">
        <section className="todo-card" aria-label="할 일 목록 앱">
          <header className="todo-header">
            <h1 className="todo-title">나만의 Todo 리스트</h1>
          </header>

          <div className="input-box">
            <input
              className="todo-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="할 일을 입력하세요"
              aria-label="할 일 입력"
            />
            <button className="todo-submit" type="button" onClick={addTodo}>
              추가
            </button>
          </div>

          <ul className="todo-list">
            {todos.map((todo) => (
              <li
                key={todo._id}
                className={`todo-item${todo.isCompleted ? ' is-completed' : ''}`}
              >
                <label className="todo-main">
                  <input
                    className="todo-checkbox"
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={() => toggleComplete(todo._id)}
                  />
                  <span className="todo-text">{todo.title}</span>
                </label>

                <button
                  className="todo-delete"
                  type="button"
                  onClick={() => deleteTodo(todo._id)}
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
