import { useLayoutEffect, useState, useRef } from 'react';
import './styles.css'; // 我们将添加样式文件

/**
 * useLayoutEffect 示例组件
 * 
 * 本组件演示了 useLayoutEffect 的实际应用：
 * 1. DOM 元素尺寸的同步测量
 * 2. 窗口调整事件的处理
 * 3. 与 useRef 的结合使用
 * 
 * useLayoutEffect vs useEffect:
 * - useLayoutEffect 在 DOM 更新后同步执行
 * - 适用于需要在浏览器重绘前进行的 DOM 测量和修改
 * - 可以避免闪烁和布局抖动
 */
function MeasureExample() {
  // 存储测量得到的 DOM 元素尺寸
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isExpanded, setIsExpanded] = useState(false);
  
  // 创建 ref 用于引用 DOM 元素
  const divRef = useRef();

  /**
   * 使用 useLayoutEffect 进行 DOM 测量
   * 在 DOM 更新后立即同步执行测量
   */
  useLayoutEffect(() => {
    // 测量函数：获取 DOM 元素的实际尺寸
    const measure = () => {
      if (divRef.current) {
        const { offsetWidth, offsetHeight } = divRef.current;
        console.log('Measuring:', { width: offsetWidth, height: offsetHeight });
        setDimensions({
          width: offsetWidth,
          height: offsetHeight
        });
      }
    };

    // 初始测量
    measure();

    // 添加窗口调整事件监听器
    window.addEventListener('resize', measure);

    // 清理函数：移除事件监听器
    return () => {
      window.removeEventListener('resize', measure);
    };
  }, [isExpanded]); // 当展开状态改变时重新测量

  // 切换内容展开/收起状态
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="layout-effect-demo">
      <div ref={divRef} className="measure-container">
        {/* 说明文本 */}
        <h2>useLayoutEffect 尺寸测量示例</h2>

        {/* 显示测量结果 */}
        <div className="measurement-results">
          <p>容器宽度: {dimensions.width}px</p>
          <p>容器高度: {dimensions.height}px</p>
        </div>

        {/* 可展开/收起的测试内容 */}
        <div className={`test-content ${isExpanded ? 'expanded' : ''}`}>
          <p>这个容器的尺寸会被实时测量。</p>
          {isExpanded && (
            <div className="extra-content">
              <p>这是额外的内容，展开后会增加容器的高度。</p>
              <p>useLayoutEffect 会在 DOM 更新后立即测量新的尺寸。</p>
              <p>这个测量是同步的，所以不会看到尺寸变化的闪烁。</p>
            </div>
          )}
        </div>

        {/* 控制按钮 */}
        <button 
          onClick={toggleExpand}
          className="toggle-button"
        >
          {isExpanded ? '收起内容' : '展开更多'}
        </button>
      </div>
    </div>
  );
}

// 导出组件供其他文件使用
export default MeasureExample;
