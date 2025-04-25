import React, { useState } from 'react';
import { ThemeContext, themes } from './ThemeContext';
import { UserContext, mockUsers } from './UserContext';
import './styles.css';

/**
 * Context 示例组件
 * 演示了 Context 在 React 中的使用方式：
 * 1. 主题切换功能 - 使用 ThemeContext
 * 2. 用户信息共享 - 使用 UserContext
 * 3. 多个 Context 的组合使用
 */
function ContextExample() {
  // =============== 状态定义 ===============
  const [theme, setTheme] = useState('light');
  const [currentUser, setCurrentUser] = useState(mockUsers[0]);

  // 主题切换函数
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // 切换用户函数
  const switchUser = () => {
    setCurrentUser((prevUser) => {
      const currentIndex = mockUsers.findIndex(
        (user) => user.id === prevUser.id
      );
      const nextIndex = (currentIndex + 1) % mockUsers.length;
      return mockUsers[nextIndex];
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <UserContext.Provider
        value={{ user: currentUser, updateUser: switchUser }}
      >
        <ContextDemo />
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

/**
 * 使用 Context 的示例组件
 * 展示了如何在子组件中消费 Context 的值
 */
function ContextDemo() {
  return (
    <div className="context-demo">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

/**
 * 页头组件
 * 展示当前用户信息和主题切换按钮
 */
function Header() {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  const { user } = React.useContext(UserContext);
  const currentTheme = themes[theme];

  return (
    <header
      style={{
        background: currentTheme.background,
        color: currentTheme.text,
        borderBottom: `1px solid ${currentTheme.border}`,
      }}
    >
      <div className="user-info">
        <span className="avatar">{user.avatar}</span>
        <span className="name">{user.name}</span>
        <span className="role">{user.role}</span>
      </div>
      <button
        onClick={toggleTheme}
        style={{
          background: currentTheme.buttonBg,
          color: currentTheme.buttonText,
        }}
      >
        切换到{theme === 'light' ? '深色' : '浅色'}主题
      </button>
    </header>
  );
}

/**
 * 主要内容组件
 * 展示主题和用户信息的使用方式
 */
function MainContent() {
  const { theme } = React.useContext(ThemeContext);
  const { user, updateUser } = React.useContext(UserContext);
  const currentTheme = themes[theme];

  return (
    <main
      style={{
        background: currentTheme.background,
        color: currentTheme.text,
      }}
    >
      <h2>Context 使用示例</h2>
      <div className="content-section">
        <h3>当前主题：{theme}</h3>
        <p>主题颜色会影响整个应用的外观</p>
      </div>
      <div className="content-section">
        <h3>当前用户信息：</h3>
        <p>用户名：{user.name}</p>
        <p>角色：{user.role}</p>
        <button
          onClick={updateUser}
          style={{
            background: currentTheme.buttonBg,
            color: currentTheme.buttonText,
          }}
        >
          切换用户
        </button>
      </div>
    </main>
  );
}

/**
 * 页脚组件
 * 展示主题的应用
 */
function Footer() {
  const { theme } = React.useContext(ThemeContext);
  const currentTheme = themes[theme];

  return (
    <footer
      style={{
        background: currentTheme.background,
        color: currentTheme.text,
        borderTop: `1px solid ${currentTheme.border}`,
      }}
    >
      <p>使用 Context 实现的主题系统示例</p>
    </footer>
  );
}

export default ContextExample;
