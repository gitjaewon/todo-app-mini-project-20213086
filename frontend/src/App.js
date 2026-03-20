import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/todos');
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
      await axios.post('http://localhost:5000/api/todos', { title });
      setTitle("");
      fetchTodos();
    } catch (error) {
      console.error("추가 에러:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error("삭제 에러:", error);
    }
  };

  const toggleComplete = async (id, isCompleted) => {
    try {
      await axios.put(`http://localhost:5000/api/todos/${id}`, { isCompleted: !isCompleted });
      fetchTodos();
    } catch (error) {
      console.error("토글 에러:", error);
    }
  };

  return (
    <div className="App">
      <h1>나만의 Todo 리스트</h1>
      <div className="input-box">
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="할 일을 입력하세요" 
        />
        <button onClick={addTodo}>추가</button>
      </div>

      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '300px', margin: '10px auto' }}>
            <input 
              type="checkbox" 
              checked={todo.isCompleted} 
              onChange={() => toggleComplete(todo._id, todo.isCompleted)} 
            />
            <span style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}>
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo._id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;