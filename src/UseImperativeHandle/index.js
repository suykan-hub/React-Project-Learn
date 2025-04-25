import React, { useRef } from 'react';
import CustomInput from './components/CustomInput';
import Timer from './components/Timer';
import './styles.css';

/**
 * UseImperativeHandle 示例组件
 * 展示如何使用 useImperativeHandle 在父组件中控制子组件
 */
function UseImperativeHandleDemo() {
  // 创建 refs 用于访问子组件暴露的方法
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  /**
   * 示例 1: 控制自定义输入框
   */
  const handleInputControl = (action) => {
    switch (action) {
      case 'focus':
        inputRef.current.focus();
        break;
      case 'clear':
        inputRef.current.clear();
        break;
      case 'setValue':
        inputRef.current.setValue('Hello, World!');
        break;
      case 'getValue':
        alert('当前值: ' + inputRef.current.getValue());
        break;
      default:
        break;
    }
  };

  /**
   * 示例 2: 控制计时器
   */
  const handleTimerControl = (action) => {
    switch (action) {
      case 'start':
        timerRef.current.start();
        break;
      case 'pause':
        timerRef.current.pause();
        break;
      case 'reset':
        timerRef.current.reset();
        break;
      case 'getCount':
        alert('当前计数: ' + timerRef.current.getCurrentCount());
        break;
      default:
        break;
    }
  };

  return (
    <div className="imperative-handle-demo">
      <h2>UseImperativeHandle 示例</h2>

      {/* 示例 1: 自定义输入框控制 */}
      <section className="example-section">
        <h3>示例 1: 自定义输入框</h3>
        <CustomInput ref={inputRef} />
        <div className="button-group">
          <button onClick={() => handleInputControl('focus')}>聚焦</button>
          <button onClick={() => handleInputControl('clear')}>清空</button>
          <button onClick={() => handleInputControl('setValue')}>设置值</button>
          <button onClick={() => handleInputControl('getValue')}>获取值</button>
        </div>
      </section>

      {/* 示例 2: 计时器控制 */}
      <section className="example-section">
        <h3>示例 2: 计时器控制</h3>
        <Timer ref={timerRef} />
        <div className="button-group">
          <button onClick={() => handleTimerControl('start')}>开始</button>
          <button onClick={() => handleTimerControl('pause')}>暂停</button>
          <button onClick={() => handleTimerControl('reset')}>重置</button>
          <button onClick={() => handleTimerControl('getCount')}>
            获取计数
          </button>
        </div>
      </section>

      {/* 实现说明 */}
      <section className="example-section info">
        <h3>实现说明</h3>
        <ul className="info-list">
          <li>使用 forwardRef 包装子组件，使其能够接收 ref</li>
          <li>通过 useImperativeHandle 自定义暴露给父组件的方法</li>
          <li>子组件内部状态对父组件保持隐藏，只暴露必要的操作方法</li>
          <li>可以在复杂组件中精确控制暴露的功能，提高封装性</li>
        </ul>
      </section>
    </div>
  );
}

export default UseImperativeHandleDemo;
