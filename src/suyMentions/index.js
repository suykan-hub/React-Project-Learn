import React, { useState } from 'react';
import { Mentions } from 'suy-mentions';

const { Option } = Mentions;

const SuyMentionsExample = () => {
  const [value, setValue] = useState('');

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleSelect = (option) => {
    console.log('selected', option);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Mentions Demo</h1>
      <div style={{ marginBottom: '20px' }}>
        <Mentions
          style={{ width: '100%', height: '100px' }}
          placeholder="输入 @ 来触发提及"
          value={value}
          onChange={handleChange}
          onSelect={handleSelect}
        >
          <Option value="afc163">afc163</Option>
          <Option value="zombieJ">zombieJ</Option>
          <Option value="yesmeck">yesmeck</Option>
        </Mentions>
      </div>
      <div>
        <h3>当前输入内容：</h3>
        <pre>{value}</pre>
      </div>
    </div>
  );
};

export default SuyMentionsExample;
