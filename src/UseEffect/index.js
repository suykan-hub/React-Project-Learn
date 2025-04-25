import { useEffect, useState } from 'react';

/**
 * useEffect Hook 示例组件
 * 演示 useEffect 的不同使用场景和生命周期管理
 */
function MyComponent() {
  // 状态声明
  const [val1, setVal] = useState(0); // 用于演示组件挂载/卸载时的状态变化
  const [count, setCount] = useState(0); // 用于演示依赖项变化时的副作用

  /**
   * Effect 1: 监听 count 变化的副作用
   * 执行时机：
   * 1. 组件首次渲染时（即使 count 是初始值）
   * 2. count 值发生变化时
   * 3. 组件卸载时（执行清理函数）
   *
   * 执行顺序：
   * 1. 首次渲染：执行 effect
   * 2. count 更新：先执行清理函数，再执行 effect
   * 3. 组件卸载：执行清理函数
   */
  useEffect(() => {
    console.log('=== Effect 执行 ===');
    console.log(`当前 count 值: ${count}`);
    document.title = `当前计数: ${count}`;

    // 清理函数
    return () => {
      console.log('=== 清理函数执行 ===');
      console.log(`清理时的 count 值: ${count}`);
    };
  }, [count]); // 依赖数组：首次渲染和 count 变化时执行

  /**
   * Effect 2: 仅在组件挂载和卸载时执行
   * 执行时机：
   * 1. 组件挂载时执行一次
   * 2. 组件卸载时执行清理函数一次
   */
  useEffect(() => {
    console.log('组件已挂载 - 只执行一次');
    setVal(100);

    return () => {
      console.log('组件将卸载 - 只执行一次');
      setVal(0);
    };
  }, []); // 空依赖数组：只在挂载和卸载时执行

  return (
    <div className="effect-demo">
      <div className="effect-info">
        <h2>useEffect 执行说明</h2>
        <p>1. 组件首次渲染时，两个 useEffect 都会执行</p>
        <p>2. count 变化时，只有第一个 useEffect 会执行</p>
        <p>3. 组件卸载时，两个 useEffect 的清理函数都会执行</p>
      </div>

      <div className="state-display">
        <h3>状态值: {val1}</h3>
        <div className="counter">
          <p>计数: {count}</p>
          <button
            onClick={() => setCount((c) => c + 1)}
            className="counter-button"
          >
            增加计数
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyComponent;
