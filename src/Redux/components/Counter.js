import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  increment,
  decrement,
  incrementByAmount,
  incrementAsync,
  selectCount,
  selectStatus
} from '../store/slices/counterSlice';

/**
 * 计数器组件
 * 展示如何在组件中使用 Redux 的同步和异步操作
 */
function Counter() {
  // 使用 useSelector 获取 Redux store 中的数据
  const count = useSelector(selectCount);
  const status = useSelector(selectStatus);
  
  // 获取 dispatch 函数
  const dispatch = useDispatch();

  return (
    <div className="counter">
      <h3>计数器示例</h3>
      
      {/* 显示计数值 */}
      <div className="count-display">
        当前计数: {count}
      </div>

      {/* 基本操作按钮 */}
      <div className="button-group">
        <button onClick={() => dispatch(decrement())}>
          减少
        </button>
        <button onClick={() => dispatch(increment())}>
          增加
        </button>
      </div>

      {/* 自定义数值增加 */}
      <div className="custom-increment">
        <button onClick={() => dispatch(incrementByAmount(5))}>
          增加 5
        </button>
      </div>

      {/* 异步操作 */}
      <div className="async-section">
        <button
          onClick={() => dispatch(incrementAsync(10))}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? '处理中...' : '异步增加 10'}
        </button>
        
        {/* 显示异步操作状态 */}
        {status !== 'idle' && (
          <div className="status-message">
            状态: {status}
          </div>
        )}
      </div>
    </div>
  );
}

export default Counter; 