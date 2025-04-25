import React, { forwardRef, useImperativeHandle, useState, useRef, useEffect } from 'react';

/**
 * 计时器组件
 * 展示如何使用 useImperativeHandle 暴露复杂的控制方法
 */
const Timer = forwardRef((props, ref) => {
  // 内部状态
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  // 保存定时器ID
  const timerRef = useRef(null);

  /**
   * 暴露给父组件的方法
   * 包括：开始、暂停、重置、获取当前值等
   */
  useImperativeHandle(ref, () => ({
    // 开始计时
    start: () => {
      if (!isRunning) {
        setIsRunning(true);
      }
    },
    // 暂停计时
    pause: () => {
      if (isRunning) {
        setIsRunning(false);
      }
    },
    // 重置计时器
    reset: () => {
      setIsRunning(false);
      setCount(0);
    },
    // 获取当前计数
    getCurrentCount: () => {
      return count;
    },
    // 获取计时器状态
    isRunning: () => {
      return isRunning;
    }
  }), [count, isRunning]);

  // 处理计时器逻辑
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setCount(c => c + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // 清理函数
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);

  return (
    <div className="timer">
      <div className="timer-display">
        {Math.floor(count / 60).toString().padStart(2, '0')}:
        {(count % 60).toString().padStart(2, '0')}
      </div>
      <div className="timer-status">
        状态: {isRunning ? '运行中' : '已暂停'}
      </div>
    </div>
  );
});

export default Timer; 