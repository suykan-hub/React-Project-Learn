import React, { useState } from 'react';

/**
 * 模拟一个较重的组件
 * 包含图片加载和数据处理
 */
function HeavyComponent() {
  const [count, setCount] = useState(0);

  return (
    <div className="heavy-component">
      <h3>大型组件</h3>
      <div className="content">
        <img 
          src="https://picsum.photos/400/300"
          alt="随机图片"
          loading="lazy"
        />
        <p>这是一个模拟的大型组件，通过懒加载引入</p>
        <button onClick={() => setCount(count + 1)}>
          点击计数: {count}
        </button>
      </div>
    </div>
  );
}

export default HeavyComponent; 