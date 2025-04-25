import React, { useEffect, useState } from 'react';

/**
 * 模拟一个需要加载数据的组件
 */
function DataComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟数据加载
    const fetchData = async () => {
      try {
        // 故意延迟2秒，模拟网络请求
        await new Promise(resolve => setTimeout(resolve, 2000));
        setData({
          title: '加载完成的数据',
          items: ['项目1', '项目2', '项目3']
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>组件内部加载中...</div>;
  }

  return (
    <div className="data-component">
      <h3>{data.title}</h3>
      <ul>
        {data.items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default DataComponent; 