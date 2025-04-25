import { createContext } from 'react';

// 创建主题上下文
// 默认值包含主题状态和切换主题的函数
export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

// 预定义主题样式
export const themes = {
  light: {
    background: '#ffffff',
    text: '#000000',
    border: '#e0e0e0',
    buttonBg: '#1890ff',
    buttonText: '#ffffff',
  },
  dark: {
    background: '#222222',
    text: '#ffffff',
    border: '#444444',
    buttonBg: '#177ddc',
    buttonText: '#ffffff',
  },
}; 