import React, { forwardRef, useEffect, useRef } from 'react';
import '../index.css';
const ChildComponent = forwardRef((props, ref) => {
  // 将 ref 绑定到内部的 DOM 元素或组件
  return <input ref={ref}></input>;
});

// 父组件中使用
function ParentComponent() {
  const ref = useRef(null);

  useEffect(() => {
    ref.current.focus(); // 直接操作子组件的 DOM
  }, []);
  const handleClick = () => {
    ref.current.focus(); // 调用子组件的方法
    ref.current.value = 'hello world'; // 调用子组件的方法
  };
  return (
    <div className="useCallback">
      <h1>
        forwardRef 是 React 提供的一个高阶函数，用于将 ref
        属性转发（传递）到子组件内部的 DOM 元素或组件实例 访问子组件的 DOM
        元素（如 input, div） 暴露子组件的自定义方法（如 focus(), scrollTo()）
      </h1>
      <ChildComponent ref={ref} />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}

export default ParentComponent;
