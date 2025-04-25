import React, { Suspense, lazy, useState } from 'react';
import LoadingSpinner from './components/LoadingSpinner';
import './styles.css';

/**
 * 使用 React.lazy 动态导入组件
 * 只有在组件需要渲染时才会加载对应的代码
 */
const HeavyComponent = lazy(() => import('./components/HeavyComponent'));
const DataComponent = lazy(() => import('./components/DataComponent'));

/**
 * Suspense 和 Lazy 加载示例组件
 * 展示以下特性：
 * 1. 组件的懒加载
 * 2. 加载状态的处理
 * 3. 错误边界的使用
 * 4. 条件加载
 */
function SuspenseExample() {
  // 状态：控制组件的显示
  const [showHeavy, setShowHeavy] = useState(false);
  const [showData, setShowData] = useState(false);

  return (
    <div className="suspense-example">
      <h2>Suspense 和 Lazy 加载示例</h2>

      {/* 示例 1: 基础的懒加载 */}
      <section className="example-section">
        <h3>示例 1: 组件懒加载</h3>
        <button onClick={() => setShowHeavy(!showHeavy)}>
          {showHeavy ? '隐藏' : '显示'}大型组件
        </button>
        
        {showHeavy && (
          <Suspense fallback={<LoadingSpinner />}>
            <HeavyComponent />
          </Suspense>
        )}
      </section>

      {/* 示例 2: 数据加载组件 */}
      <section className="example-section">
        <h3>示例 2: 数据加载</h3>
        <button onClick={() => setShowData(!showData)}>
          {showData ? '隐藏' : '显示'}数据组件
        </button>

        {showData && (
          <Suspense fallback={<LoadingSpinner />}>
            <DataComponent />
          </Suspense>
        )}
      </section>

      {/* 使用说明 */}
      <section className="example-section info">
        <h3>实现说明</h3>
        <ul className="info-list">
          <li>
            使用 React.lazy 动态导入组件，减少初始包大小
          </li>
          <li>
            Suspense fallback 属性显示加载状态
          </li>
          <li>
            组件只在需要时才会加载，提高首次加载性能
          </li>
          <li>
            可以在 Network 面板查看动态加载的文件
          </li>
        </ul>
      </section>
    </div>
  );
}

export default SuspenseExample; 