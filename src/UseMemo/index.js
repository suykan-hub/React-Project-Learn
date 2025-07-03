import React, { useState, useMemo } from 'react';
import './styles.css';

/**
 * UseMemo 示例组件
 * 展示 useMemo 在以下场景的应用：
 * 1. 复杂计算的缓存
 * 2. 大数组的过滤
 * 3. 对象引用的稳定性
 */
function MemoExample() {
  // 状态定义
  const [numbers, setNumbers] = useState([1]);
  const [threshold, setThreshold] = useState(5);
  const [darkMode, setDarkMode] = useState(false);

  /**
   * 示例 1: 复杂计算的缓存
   * 计算数组中所有数字的阶乘之和
   * 使用 useMemo 缓存计算结果，只有当 numbers 变化时才重新计算
   */
  const calculateFactorial = (num) => {
    console.log(`计算 ${num} 的阶乘`);
    if (num === 0) return 1;
    let result = 1;
    for (let i = 1; i <= num; i++) {
      result *= i;
    }
    return result;
  };

  // 使用 useMemo 缓存计算结果，只有当 numbers 变化时才重新计算
  const factorialSum = useMemo(() => {
    console.log('重新计算阶乘之和');
    return numbers.reduce((sum, num) => sum + calculateFactorial(num), 0);
  }, [numbers]); // 仅在 numbers 数组变化时重新计算

  /**
   * 示例 2: 大数组的过滤
   * 过滤出大于阈值的数字
   * 使用 useMemo 缓存过滤结果，只有当 numbers 或 threshold 变化时才重新过滤
   */
  const filteredNumbers = useMemo(() => {
    console.log('重新过滤数组');
    return numbers.filter(num => num > threshold);
  }, [numbers, threshold]); // 依赖于 numbers 和 threshold

  /**
   * 示例 3: 对象引用的稳定性
   * 创建一个样式对象，在 darkMode 改变时更新
   * 使用 useMemo 确保样式对象的引用稳定性
   */
  const containerStyle = useMemo(() => ({
    backgroundColor: darkMode ? '#333' : '#fff',
    color: darkMode ? '#fff' : '#333',
  }), [darkMode]); // 仅在 darkMode 变化时更新样式对象

  // 添加新数字到数组
  const addNumber = () => {
    const newNumber = Math.floor(Math.random() * 10) + 1;
    console.log('添加新数字', newNumber);
    setNumbers([...numbers, newNumber]);
  };

  return (
    <div className="memo-example" style={containerStyle}>
      <h2>UseMemo 示例</h2>

      {/* 示例 1: 展示复杂计算的结果 */}
      <section className="example-section">
        {numbers.join(',')}
        <h3>示例 1: 复杂计算缓存</h3>
        <p>数组中所有数字的阶乘之和: {factorialSum}</p>
        <button onClick={addNumber}>添加随机数字</button>
      </section>

      {/* 示例 2: 展示过滤结果 */}
      <section className="example-section">
        <h3>示例 2: 数组过滤缓存</h3>
        <div>
          <label>
            阈值:
            <input
              type="number"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
            />
          </label>
        </div>
        <p>大于阈值的数字: {filteredNumbers.join(', ')}</p>
      </section>

      {/* 示例 3: 主题切换 */}
      <section className="example-section">
        <h3>示例 3: 样式对象缓存</h3>
        <button onClick={() => setDarkMode(!darkMode)}>
          切换{darkMode ? '亮色' : '暗色'}主题
        </button>
      </section>

      {/* 当前状态展示 */}
      <section className="example-section">
        <h3>当前状态</h3>
        <p>数组: [{numbers.join(', ')}]</p>
        <p>阈值: {threshold}</p>
        <p>主题: {darkMode ? '暗色' : '亮色'}</p>
      </section>
    </div>
  );
}

export default MemoExample;
