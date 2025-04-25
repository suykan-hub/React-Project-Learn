import { createSlice } from '@reduxjs/toolkit';

/**
 * 初始状态
 * todos: 待办事项列表
 * filter: 过滤条件
 */
const initialState = {
  todos: [],
  filter: 'all', // 'all' | 'completed' | 'active'
};

/**
 * 创建 Todo Slice
 * 使用 createSlice 自动生成 action creators 和 action types
 */
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    /**
     * 添加待办事项
     * @param {object} state - 当前状态
     * @param {object} action - action 对象，包含新待办事项的信息
     */
    addTodo: (state, action) => {
      state.todos.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
        createdAt: new Date().toISOString(),
      });
    },

    /**
     * 切换待办事项状态
     * @param {object} state - 当前状态
     * @param {object} action - action 对象，包含待办事项 id
     */
    toggleTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },

    /**
     * 删除待办事项
     * @param {object} state - 当前状态
     * @param {object} action - action 对象，包含待办事项 id
     */
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },

    /**
     * 更新过滤条件
     * @param {object} state - 当前状态
     * @param {object} action - action 对象，包含新的过滤条件
     */
    setFilter: (state, action) => {
      state.filter = action.payload;
    },

    /**
     * 清除已完成的待办事项
     * @param {object} state - 当前状态
     */
    clearCompleted: (state) => {
      state.todos = state.todos.filter((todo) => !todo.completed);
    },
  },
});

// 导出 action creators
export const { addTodo, toggleTodo, removeTodo, setFilter, clearCompleted } =
  todoSlice.actions;

/**
 * 选择器函数
 * 用于从 store 中获取数据
 */
export const selectTodos = (state) => state.todos.todos;
export const selectFilter = (state) => state.todos.filter;
export const selectFilteredTodos = (state) => {
  const todos = selectTodos(state);
  const filter = selectFilter(state);

  switch (filter) {
    case 'completed':
      return todos.filter((todo) => todo.completed);
    case 'active':
      return todos.filter((todo) => !todo.completed);
    default:
      return todos;
  }
};

export default todoSlice.reducer;
