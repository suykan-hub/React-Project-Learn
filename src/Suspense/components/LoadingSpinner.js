import React from 'react';

/**
 * 加载中显示的组件
 */
function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>加载中...</p>
    </div>
  );
}

export default LoadingSpinner;
