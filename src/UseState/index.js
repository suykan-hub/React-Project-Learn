import { useState } from 'react';
function Counter() {
  const [count, setCount] = useState(0); // 初始值为0
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([
    { id: 1, text: '学习React', completed: false },
    { id: 2, text: '写代码', completed: false },
  ]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (!newTodo.trim()) return;
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo('');
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  const [user, setUser] = useState({
    name: '张三',
    age: 25,
    email: 'zhangsan@example.com',
  });

  const updateName = () => {
    setUser({
      ...user, // 保留其他属性不变
      name: '李四111', // 只更新name属性
      age: 100,
      email: 'lisi@example.com',
    });
  };
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`你输入的是: ${inputValue}`);
    setInputValue('');
  };
  return (
    <div className="useCallback">
      <h1>useState使用范例</h1>
      <h2>单数据处理</h2>
      <p>当前计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
      <button onClick={() => setCount(count - 1)}>减少</button>
      <button onClick={() => setCount(0)}>重置</button>
      <br />
      <br />
      <h2>对象数据</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="请输入内容"
        />
        <button type="submit">提交</button>
      </form>
      <div>
        <p>姓名: {user.name}</p>
        <p>年龄: {user.age}</p>
        <p>邮箱: {user.email}</p>
        <button onClick={updateName}>更改姓名</button>
      </div>
      <h2>数组数据</h2>
      <div>
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="添加新任务"
        />
        <button onClick={addTodo}>添加</button>
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Counter;
