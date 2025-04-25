import React, { useState, useCallback, memo } from 'react';
import './styles.css';

// 子组件：展示按钮
const Button = memo(({ onClick, children }) => {
  // React.StrictMode 触发两次渲染
  console.log(`Button "${children}" 重新渲染`, {
    time: new Date().toLocaleTimeString(),
    renderCount: React.useRef(0).current++,
  });
  return <button onClick={onClick}>{children}</button>;
});

// 子组件：展示列表
const ItemList = memo(({ items, onItemClick }) => {
  console.log('ItemList 组件重新渲染');
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index} onClick={() => onItemClick(item)}>
          {item}
        </li>
      ))}
    </ul>
  );
});

/**
 * UseCallback 示例组件
 * 展示 useCallback 在以下场景的应用：
 * 1. 防止子组件不必要的重渲染
 * 2. 事件处理函数的性能优化
 * 3. 依赖项变化时的回调更新
 */
function CallbackExample() {
  // 状态定义
  const [count, setCount] = useState(0);
  const [items, setItems] = useState(['苹果', '香蕉', '橙子']);
  const [selectedItem, setSelectedItem] = useState(null);

  /**
   * 示例 1: 计数器增加函数
   * 使用 useCallback 缓存函数，避免子组件不必要的重渲染
   * 由于没有依赖项，此函数引用永远保持不变
   */
  const handleIncrement = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []); // 空依赖数组，函数永远不会重新创建

  /**
   * 示例 2: 计数器减少函数
   * 不使用 useCallback 的情况，每次渲染都会创建新的函数引用
   */
  const handleDecrement = () => {
    setCount((prevCount) => prevCount - 1);
  };

  /**
   * 示例 3: 处理列表项点击
   * 使用 useCallback 并依赖 selectedItem，
   * 只有当 selectedItem 改变时才会创建新的函数
   */
  const handleItemClick = useCallback((item) => {
    console.log('选中项:', item);
    setSelectedItem(item);
  }, []);

  /**
   * 示例 4: 添加新水果
   * 使用 useCallback 并依赖 items 数组
   * 当 items 变化时更新函数引用
   */
  const handleAddFruit = useCallback(() => {
    const fruits = ['葡萄', '西瓜', '草莓', '樱桃'];
    const randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
    setItems((prevItems) => [...prevItems, randomFruit]);
  }, []);

  return (
    <div className="callback-example">
      <h2>UseCallback 示例</h2>

      {/* 示例 1: 使用 useCallback 的计数器 */}
      <section className="example-section">
        <h3>示例 1: 使用 useCallback 的按钮</h3>
        <p>当前计数: {count}</p>
        <Button onClick={handleIncrement}>增加 (使用 useCallback)</Button>
        <Button onClick={handleDecrement}>减少 (不使用 useCallback)</Button>
        <p className="note">提示：打开控制台查看按钮组件的重渲染情况</p>
      </section>

      {/* 示例 2: 列表与选中项 */}
      <section className="example-section">
        <h3>示例 2: 列表交互</h3>
        <ItemList items={items} onItemClick={handleItemClick} />
        <Button onClick={handleAddFruit}>添加随机水果</Button>
        {selectedItem && <p>已选中: {selectedItem}</p>}
      </section>

      {/* 性能说明 */}
      <section className="example-section">
        <h3>性能说明</h3>
        <ul className="info-list">
          <li>增加按钮使用了 useCallback，函数引用保持稳定</li>
          <li>减少按钮没有使用 useCallback，每次渲染都会创建新函数</li>
          <li>列表组件使用了 memo 和 useCallback 优化渲染</li>
        </ul>
      </section>
    </div>
  );
}

export default CallbackExample;
