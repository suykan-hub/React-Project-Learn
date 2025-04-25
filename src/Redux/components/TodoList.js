import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addTodo,
  toggleTodo,
  removeTodo,
  setFilter,
  clearCompleted,
  selectFilteredTodos,
  selectFilter
} from '../store/slices/todoSlice';

/**
 * 待办事项列表组件
 * 展示如何在组件中使用 Redux 状态和操作
 */
function TodoList() {
  const [newTodo, setNewTodo] = useState('');
  
  // 使用 useSelector 获取 Redux store 中的数据
  const todos = useSelector(selectFilteredTodos);
  const currentFilter = useSelector(selectFilter);
  
  // 获取 dispatch 函数
  const dispatch = useDispatch();

  /**
   * 处理添加待办事项
   * @param {Event} e - 表单提交事件
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo.trim()));
      setNewTodo('');
    }
  };

  return (
    <div className="todo-list">
      {/* 添加待办事项表单 */}
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="添加新的待办事项..."
        />
        <button type="submit">添加</button>
      </form>

      {/* 过滤器 */}
      <div className="filters">
        {['all', 'active', 'completed'].map(filter => (
          <button
            key={filter}
            className={currentFilter === filter ? 'active' : ''}
            onClick={() => dispatch(setFilter(filter))}
          >
            {filter === 'all' ? '全部' : filter === 'active' ? '进行中' : '已完成'}
          </button>
        ))}
        <button 
          className="clear-completed"
          onClick={() => dispatch(clearCompleted())}
        >
          清除已完成
        </button>
      </div>

      {/* 待办事项列表 */}
      <ul className="todo-items">
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(toggleTodo(todo.id))}
            />
            <span className="todo-text">{todo.text}</span>
            <button
              className="delete-btn"
              onClick={() => dispatch(removeTodo(todo.id))}
            >
              删除
            </button>
          </li>
        ))}
      </ul>

      {/* 统计信息 */}
      <div className="todo-stats">
        总计: {todos.length} 项
      </div>
    </div>
  );
}

export default TodoList; 