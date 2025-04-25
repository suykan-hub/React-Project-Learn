import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import TodoList from './components/TodoList';
import Counter from './components/Counter';
import './styles.css';

/**
 * Redux 示例组件
 * 展示 Redux 在 React 应用中的完整使用方式
 */
function ReduxExample() {
  return (
    // 使用 Provider 包装应用，提供 Redux store
    <Provider store={store}>
      <div className="redux-example">
        <h2>Redux 使用示例</h2>

        {/* 计数器示例 */}
        <section className="example-section">
          <Counter />
        </section>

        {/* 待办事项示例 */}
        <section className="example-section">
          <h3>待办事项列表</h3>
          <TodoList />
        </section>

        {/* Redux 使用说明 */}
        <section className="example-section info">
          <h3>实现说明</h3>
          <ul className="info-list">
            <li>使用 Redux Toolkit 简化 Redux 的使用</li>
            <li>展示了同步和异步 action 的处理方式</li>
            <li>使用 createSlice 自动生成 action 和 reducer</li>
            <li>使用 useSelector 和 useDispatch 在组件中操作 Redux</li>
            <li>展示了复杂状态管理（待办事项）和简单状态管理（计数器）</li>
          </ul>
        </section>
      </div>
    </Provider>
  );
}

export default ReduxExample;
