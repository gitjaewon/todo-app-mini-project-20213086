import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 1. 공통 API 주소 설정 (환경 변수 읽기)
// 만약 환경 변수가 없으면 기본값으로 localhost:5000을 쓰도록 세팅했습니다.
const API_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTodos = async () => {
    try {
      // 2. 고정 주소 대신 API_URL 변수 사용
      const response = await axios.get(`${API_URL}/api/todos`);
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
      // 3. POST 요청 주소 수정
      await axios.post(`${API_URL}/api/todos`, { title });
      setTitle("");
      fetchTodos();
    } catch (error) {
      console.error("추가 에러:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      // 4. DELETE 요청 주소 수정
      await axios.delete(`${API_URL}/api/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error("삭제 에러:", error);
    }
  };

  const toggleComplete = async (id, isCompleted) => {
    try {
      // 5. PUT 요청 주소 수정
      await axios.put(`${API_URL}/api/todos/${id}`, { isCompleted: !isCompleted });
      fetchTodos();
    } catch (error) {
      console.error("토글 에러:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center p-4 sm:p-8 font-pretendard">
      <div className="w-full max-w-lg bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 sm:p-12 border border-gray-50">
        <header className="mb-10">
          <h1 className="text-[2.5rem] font-extrabold text-gray-900 mb-2 tracking-tight">오늘 할 일</h1>
          <p className="text-gray-400 text-lg font-medium">깔끔하게 정리하고 집중해보세요.</p>
        </header>
        
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="오늘 꼭 해야 할 일은?" 
            className="flex-1 bg-gray-50 border-none rounded-2xl px-6 py-4.5 text-lg text-gray-700 placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
          />
          <button 
            onClick={addTodo}
            className="bg-[#1a1a1a] text-white px-8 py-4.5 rounded-2xl font-bold text-lg hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-gray-200"
          >
            추가
          </button>
        </div>

        <div className="space-y-3">
          {Array.isArray(todos) && todos.map(todo => (
            <div 
              key={todo._id} 
              className="flex items-center justify-between p-6 bg-white border border-gray-50 rounded-3xl hover:bg-gray-50/50 hover:shadow-sm transition-all group cursor-pointer"
              onClick={() => toggleComplete(todo._id, todo.isCompleted)}
            >
              <div className="flex items-center flex-1">
                <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${todo.isCompleted ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-200'}`}>
                  {todo.isCompleted && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className={`ml-4 text-[1.15rem] font-semibold transition-all ${todo.isCompleted ? 'text-gray-300 line-through' : 'text-gray-700'}`}>
                  {todo.title}
                </span>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTodo(todo._id);
                }}
                className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 p-2.5 transition-all rounded-xl hover:bg-red-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {(!todos || todos.length === 0) && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <p className="text-gray-400 text-lg font-medium">새로운 할 일을 추가해 보세요.</p>
          </div>
        )}

        {todos && todos.length > 0 && (
          <div className="mt-10 pt-8 border-t border-gray-50 flex justify-between items-center text-gray-400 font-medium">
            <span>총 {todos.length}개의 할 일</span>
            <span>{todos.filter(t => t.isCompleted).length}개 완료</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;