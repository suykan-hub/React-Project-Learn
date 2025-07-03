import React, { useState, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import './index.css';

interface User {
  id: number;
  name: string;
  avatar: string;
  email: string;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: '张三',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    email: 'zhangsan@example.com',
  },
  {
    id: 2,
    name: '李四四',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
    email: 'lisi@example.com',
  },
  {
    id: 3,
    name: '王五',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
    email: 'wangwu@example.com',
  },
];

const RcMetions = () => {
  const [showUserList, setShowUserList] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(mockUsers);
  const editorRef = useRef<HTMLDivElement>(null);

  const getTextAndCursorPosition = () => {
    if (!editorRef.current) return { text: '', cursorPosition: 0 };

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0)
      return { text: '', cursorPosition: 0 };

    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(editorRef.current);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    const cursorPosition = preCaretRange.toString().length;
    const text = editorRef.current.textContent || '';

    return { text, cursorPosition };
  };

  const handleInput = () => {
    const { text, cursorPosition } = getTextAndCursorPosition();
    console.log('text:', text);
    //获取光标位置来判断@符号的位置
    console.log('cursorPosition:', cursorPosition);
    // 获取最新输入的@符号位置
    const lastAtIndex = text.lastIndexOf('@', cursorPosition);
    console.log('lastAtIndex', lastAtIndex);
    // 如果@符号存在，则获取@符号后的搜索文本
    if (lastAtIndex !== -1) {
      const searchText = text.slice(lastAtIndex + 1, cursorPosition).trim();
      console.log('searchText', searchText);
      // 只有当有搜索文本时才显示过滤后的用户列表
      if (searchText) {
        const filtered = mockUsers.filter(
          (user) =>
            user.name.includes(searchText) || user.email.includes(searchText)
        );
        console.log('filtered', filtered);
        setFilteredUsers(filtered);
        setShowUserList(true);
      } else {
        // 如果只有@符号，显示所有用户
        setFilteredUsers(mockUsers);
        setShowUserList(true);
      }
    } else {
      setShowUserList(false);
    }
  };

  const insertMention = (user: User) => {
    console.log('insertMention', user);
    if (!editorRef.current) return;

    const selection = window.getSelection();
    console.log('selection----', selection);
    console.log('selection.rangeCount', selection?.rangeCount);
    if (!selection || selection.rangeCount === 0) return;

    const { text, cursorPosition } = getTextAndCursorPosition();
    console.log('text', text);
    console.log('cursorPosition', cursorPosition);
    const lastAtIndex = text.lastIndexOf('@', cursorPosition);
    console.log('lastAtIndex', lastAtIndex); 
    if (lastAtIndex === -1) return;

    // 创建用户标签
    const mentionSpan = document.createElement('a');
    mentionSpan.className = 'mention-tag';
    mentionSpan.contentEditable = 'false';
    mentionSpan.textContent = `@${user.name}`;
    mentionSpan.dataset.userId = user.id.toString();
    mentionSpan.onclick = () => handleUserClick(user);
    console.log('mentionSpan-', mentionSpan);
    // 获取当前选区
    const range = selection.getRangeAt(0);
    console.log('range-', range);
    const startNode = range.startContainer;
    console.log('startNode-', startNode);
    const startOffset = range.startOffset;
    console.log('startOffset-', startOffset);

    // 创建一个新的 Range 对象，用于操作文档中的文本范围
    const newRange = document.createRange();
    console.log('newRange-', newRange);

    // 检查当前节点是否为文本节点
    console.log('startNode.nodeType', startNode.nodeType);
    console.log('Node.TEXT_NODE', Node.TEXT_NODE);

    // 如果当前节点是文本节点，执行以下操作
    if (startNode.nodeType === Node.TEXT_NODE) {
      const textContent = startNode.textContent || '';
      console.log('textContent', textContent);
      console.log('startOffset', startOffset);

      // 从光标位置向前搜索@符号
      let atIndex = -1;
      for (let i = startOffset - 1; i >= 0; i--) {
        if (textContent[i] === '@') {
          atIndex = i;
          break;
        }
      }

      if (atIndex !== -1) {
        // 设置范围的起始位置为@符号的位置
        newRange.setStart(startNode, atIndex);
        // 设置范围的结束位置为当前光标位置
        newRange.setEnd(startNode, startOffset);

        // 删除范围内的内容（包括@符号和搜索文本）
        newRange.deleteContents();

        // 在删除的位置插入用户标签元素
        newRange.insertNode(mentionSpan);

        // 创建一个包含空格的文本节点
        const space = document.createTextNode(' ');
        // 在用户标签后插入空格
        newRange.insertNode(space);

        // 将光标位置设置到空格之后
        newRange.setStartAfter(space);
        newRange.setEndAfter(space);

        // 清除当前所有选区
        selection.removeAllRanges();
        // 添加新的选区
        selection.addRange(newRange);
      }
    } else {
      // 如果当前节点不是文本节点，尝试找到最近的文本节点
      const walker = document.createTreeWalker(
        editorRef.current,
        NodeFilter.SHOW_TEXT,
        null
      );

      let node: Text | null;
      let found = false;
      while ((node = walker.nextNode() as Text)) {
        const textContent = node.textContent || '';
        const atIndex = textContent.lastIndexOf('@');

        if (atIndex !== -1) {
          // 设置范围从@符号开始到文本节点末尾
          newRange.setStart(node, atIndex);
          newRange.setEnd(node, textContent.length);

          // 删除@和搜索文本
          newRange.deleteContents();

          // 插入用户标签
          newRange.insertNode(mentionSpan);

          // 添加空格
          const space = document.createTextNode(' ');
          newRange.insertNode(space);

          // 移动光标到空格后面
          newRange.setStartAfter(space);
          newRange.setEndAfter(space);
          selection.removeAllRanges();
          selection.addRange(newRange);

          found = true;
          break;
        }
      }

      if (!found) {
        // 如果没有找到@符号，在光标位置插入
        newRange.setStart(startNode, startOffset);
        newRange.setEnd(startNode, startOffset);

        // 插入用户标签
        newRange.insertNode(mentionSpan);

        // 添加空格
        const space = document.createTextNode(' ');
        newRange.insertNode(space);

        // 移动光标到空格后面
        newRange.setStartAfter(space);
        newRange.setEndAfter(space);
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
    }
  };

  const handleUserSelect = (user: User) => {
    console.log('handleUserSelect', user);
    insertMention(user);
    setShowUserList(false);
    setSelectedUser(user);
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === '@') {
      setShowUserList(true);
      setFilteredUsers(mockUsers);
    }
  };

  return (
    <div className="rc-mentions">
      <div className="input-container">
        <div
          ref={editorRef}
          className="mention-editor"
          contentEditable
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          data-placeholder="输入@来提及用户..."
        />
        {showUserList && (
          <div className="user-list">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="user-item"
                onClick={() => handleUserSelect(user)}
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="user-avatar"
                />
                <span>{user.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedUser && (
        <div className="user-info">
          <h3>用户信息</h3>
          <div className="user-info-content">
            <img
              src={selectedUser.avatar}
              alt={selectedUser.name}
              className="user-avatar-large"
            />
            <div className="user-details">
              <p>
                <strong>姓名：</strong>
                {selectedUser.name}
              </p>
              <p>
                <strong>邮箱：</strong>
                {selectedUser.email}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RcMetions;
