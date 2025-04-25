import { createContext } from 'react';

// 创建用户上下文
// 默认值包含用户信息和更新用户信息的函数
export const UserContext = createContext({
  user: null,
  updateUser: () => {},
});

// 模拟用户数据
export const mockUsers = [
  {
    id: 1,
    name: '张三',
    role: '管理员',
    avatar: '👨‍💼',
  },
  {
    id: 2,
    name: '李四',
    role: '开发者',
    avatar: '👩‍💻',
  },
  {
    id: 3,
    name: '王五',
    role: '访客',
    avatar: '👦🏻',
  },
];
