import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';

/**
 * 自定义输入框组件
 * 使用 forwardRef 和 useImperativeHandle 暴露指定的方法给父组件
 */
const CustomInput = forwardRef((props, ref) => {
  // 内部状态
  const [value, setValue] = useState('');
  
  // 内部 ref，用于直接访问 input 元素
  const inputRef = useRef(null);

  /**
   * 使用 useImperativeHandle 自定义暴露给父组件的实例值
   * 这样可以限制父组件对子组件的访问，只暴露必要的功能
   */
  useImperativeHandle(ref, () => ({
    // 聚焦方法
    focus: () => {
      inputRef.current.focus();
    },
    // 清空输入值
    clear: () => {
      setValue('');
      inputRef.current.focus();
    },
    // 获取当前值
    getValue: () => {
      return value;
    },
    // 设置新值
    setValue: (newValue) => {
      setValue(newValue);
    }
  }), [value]); // 依赖项包含 value，确保返回的方法总是使用最新的值

  return (
    <div className="custom-input">
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="请输入内容..."
      />
      <span className="char-count">{value.length} 个字符</span>
    </div>
  );
});

export default CustomInput; 