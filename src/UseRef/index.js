import React, { useRef, useState, useEffect } from 'react';
import './styles.css';

/**
 * UseRef 示例组件
 * 展示 useRef 在以下场景的应用：
 * 1. DOM 元素引用：直接访问和操作 DOM 元素
 * 2. 保存前一个值：在重渲染之间保存数据
 * 3. 计时器引用：管理 setInterval/setTimeout
 * 4. 跨渲染周期保存可变值
 */
function UseRefExample() {
  // 状态定义
  const [inputValue, setInputValue] = useState('');
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Ref 定义
  const inputRef = useRef(null); // 用于 DOM 引用
  const previousCountRef = useRef(null); // 用于保存前一个值
  const timerRef = useRef(null); // 用于保存定时器ID
  const clickCountRef = useRef(0); // 用于在渲染间保存数据

  /**
   * 示例 1: DOM 引用
   * 使用 useRef 获取输入框的引用，实现自动聚焦
   */
  const handleFocusInput = () => {
    // 直接访问 DOM 元素并调用其方法
    inputRef.current.focus();
    // 也可以修改其他 DOM 属性
    inputRef.current.style.border = '2px solid #1890ff';
  };

  /**
   * 示例 2: 保存前一个值
   * 使用 useRef 在组件重渲染之间保存 count 的前一个值
   */
  useEffect(() => {
    console.log('count 改变', count);
    previousCountRef.current = count;
  }, [count]); // 当 count 改变时更新 previousCountRef

  /**
   * 示例 3: 定时器管理
   * 使用 useRef 保存定时器ID，便于清理
   */
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setCount((c) => c + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    }
  };

  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  /**
   * 示例 4: 跨渲染周期保存值
   * 使用 useRef 记录按钮点击次数，此值更新不会触发重渲染
   */
  const handleClick = () => {
    clickCountRef.current += 1;
    console.log('按钮被点击次数：', clickCountRef.current);
  };

  return (
    <div className="ref-example">
      <h2>UseRef 示例</h2>

      {/* 示例 1: DOM 引用 */}
      <section className="example-section">
        <h3>示例 1: DOM 引用</h3>
        <div className="input-group">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="点击按钮使我获得焦点"
          />
          <button onClick={handleFocusInput}>聚焦输入框</button>
        </div>
      </section>

      {/* 示例 2: 保存前一个值 */}
      <section className="example-section">
        <h3>示例 2: 保存前一个值</h3>
        <p>当前计数: {count}</p>
        <p>前一个计数: {previousCountRef.current}</p>
        <button onClick={() => setCount(count + 1)}>增加计数</button>
      </section>

      {/* 示例 3: 定时器管理 */}
      <section className="example-section">
        <h3>示例 3: 定时器管理</h3>
        <p>定时器计数: {count}</p>
        <div className="button-group">
          <button onClick={startTimer} disabled={isRunning}>
            开始计时
          </button>
          <button onClick={stopTimer} disabled={!isRunning}>
            停止计时
          </button>
        </div>
      </section>

      {/* 示例 4: 跨渲染周期保存值 */}
      <section className="example-section">
        <h3>示例 4: 跨渲染周期保存值{  clickCountRef.current}</h3>
        <button onClick={handleClick}>点击我 (查看控制台输出)</button>
        <p className="note">提示：点击次数保存在 ref 中，更新不会触发重渲染</p>
      </section>
    </div>
  );
}

export default UseRefExample;
