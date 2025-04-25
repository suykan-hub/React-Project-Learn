import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './slices/todoSlice';
import counterReducer from './slices/counterSlice';

/**
 * 创建 Redux Store
 * 使用 Redux Toolkit 的 configureStore 方法配置 store
 * 自动配置了 Redux DevTools 和 redux-thunk 中间件
 */
const store = configureStore({
  // 合并多个 reducer
  reducer: {
    todos: todoReducer,    // 待办事项的 reducer
    counter: counterReducer // 计数器的 reducer
  },
  // 可以在这里添加自定义中间件
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // 忽略日期序列化检查
        ignoredActions: ['todos/addTodo'],
      },
    }),
});

// 导出 store 类型，用于 TypeScript 类型推断
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store; 