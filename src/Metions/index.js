import React, { useState, useRef, useEffect } from 'react';
import UserModal from './UserModal'; // 用户详情弹窗组件
import './index.css';

const MentionsEditor = () => {
  const editorRef = useRef(null);
  const mentionsListRef = useRef(null);
  const [showMentions, setShowMentions] = useState(false);
  const [mentionPosition, setMentionPosition] = useState({ top: 0, left: 0 });
  const [mentionSearch, setMentionSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null); // 选中的用户（用于弹窗）
  const [comment, setComment] = useState(''); // 添加评论状态
  const [htmlContent, setHtmlContent] = useState(''); // 存储HTML内容
  const [textContent, setTextContent] = useState(''); // 存储文本内容
  const [currentPosition, setCurrentPosition] = useState(0); // 存储光标位置
  // 模拟用户数据
  const users = [
    {
      id: '1',
      name: '张三',
      email: 'zhangsan@example.com',
      role: '前端开发',
      department: '技术部',
    },
    {
      id: '2',
      name: '李四',
      email: 'lisi@example.com',
      role: '后端开发',
      department: '技术部',
    },
    {
      id: '3',
      name: '王五',
      email: 'wangwu@example.com',
      role: '产品经理',
      department: '产品部',
    },
    {
      id: '4',
      name: '赵六',
      email: 'zhaoliu@example.com',
      role: 'UI设计师',
      department: '设计部',
    },
  ];
  let filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(mentionSearch.toLowerCase())
  );

  // 获取所有文本的光标位置
  const getAllTextCursorPosition = () => {
    const editor = editorRef.current;
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    return range.startOffset;
  };
  // 处理编辑器输入
  const handleInput = () => {
    const editor = editorRef.current;
    const text = editor.innerText || '';
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const { text: text2, cursorPosition: cursorPosition2 } =
      getTextAndCursorPosition();
    console.log('text2', text2);
    console.log('cursorPosition2', cursorPosition2);
    setCurrentPosition(cursorPosition2);
    setTextContent(text2);
    // 计算真实的光标位置
    let cursorPosition = 0;
    let node = editor.firstChild;
    while (node) {
      if (node === range.startContainer) {
        cursorPosition += range.startOffset;
        break;
      }
      if (node.nodeType === Node.TEXT_NODE) {
        cursorPosition += node.textContent.length;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // 如果是a标签，计算其文本长度
        if (node.tagName.toLowerCase() === 'a') {
          cursorPosition += node.textContent.length;
        }
      }
      node = node.nextSibling;
    }

    console.log('handleInput=text', text);
    console.log('cursorPosition', cursorPosition);
    // 检查光标是否在a标签内
    let isInsideATag = false;
    let currentNode = range.startContainer;
    while (currentNode && currentNode !== editor) {
      if (currentNode.nodeName === 'A') {
        isInsideATag = true;
        break;
      }
      currentNode = currentNode.parentNode;
    }

    // 如果光标在a标签内，不显示提及列表
    if (isInsideATag) {
      setShowMentions(false);
      return;
    }

    // 检查光标前一个字符是否为@，且不在a标签内
    if (cursorPosition > 0 && text[cursorPosition - 1] === '@') {
      console.log('cursorPosition', cursorPosition);
      // 检查@符号是否在a标签内
      let atNode = range.startContainer;
      let atOffset = cursorPosition - 1;
      let isAtInsideATag = false;

      // 如果@在文本节点内
      if (atNode.nodeType === Node.TEXT_NODE) {
        let parent = atNode.parentNode;
        while (parent && parent !== editor) {
          if (parent.nodeName === 'A') {
            isAtInsideATag = true;
            break;
          }
          parent = parent.parentNode;
        }
      }

      if (!isAtInsideATag) {
        const rect = range.getBoundingClientRect();
        setMentionPosition({
          top: rect.top + window.scrollY - 5,
          left: rect.left + window.scrollX,
        });
        setShowMentions(true);
        setMentionSearch('');
        setSelectedIndex(0);
        return;
      }
    }
    // 检测是否正在输入@后的内容
    const atIndex = text.lastIndexOf('@');
    console.log('atIndex', atIndex);
    if (atIndex !== -1 && !text.substring(atIndex).match(/[\s\n]/)) {
      const searchTerm = text.substring(atIndex + 1);
      setMentionSearch(searchTerm);
      setShowMentions(true);
    } else {
      setShowMentions(false);
    }
  };
  const mentions = ['@张三', '@李四', '@王五', '@赵六'];
  const toDetail = (id) => {
    console.log('id', id);
    setSelectedUser(users.find((u) => u.id === id));
  };

  // 将toDetail函数暴露到window对象
  useEffect(() => {
    window.toDetail = (id) => {
      toDetail(id);
    };
    return () => {
      delete window.toDetail;
    };
  }, []);

  const replaceMentionsWithSpans = (input) => {
    // 创建一个正则表达式，匹配所有需要替换的提及
    const regex = new RegExp(
      `(${mentions.map((m) => `\\${m}`).join('|')})`,
      'g'
    );
    // 替换匹配的提及为a标签
    return input.replace(regex, (match) => {
      // 从匹配的文本中提取用户名
      const userName = match.substring(1); // 移除@符号
      // 查找对应的用户对象
      const user = users.find((u) => u.name === userName);

      if (user) {
        return `<a 
          contenteditable="false" 
          class="mention-tag" 
          data-user-id="${user.id}"
          onclick="window.toDetail('${user.id}')"
        >${match}</a>`;
      }
      return match;
    });
  };

  // 插入提及
  const insertMention = (user) => {
    const editor = editorRef.current;
    const text = editor.innerText || '';
    setTextContent(text);
    console.log('insertMention-text', text);
    // 123@
    // const atIndex = text.lastIndexOf('@');
    // console.log('insertMention-atIndex', atIndex);
    let atIndex = -1;
    for (let i = text.length - 1; i >= 0; i--) {
      if (text[i] === '@') {
        // 检查@是否在a标签内
        let isAtInsideATag = false;
        let node = editor.firstChild;
        let currentPos = 0;

        while (node) {
          if (node.nodeType === Node.TEXT_NODE) {
            if (currentPos <= i && i < currentPos + node.textContent.length) {
              let parent = node.parentNode;
              while (parent && parent !== editor) {
                if (parent.nodeName === 'A') {
                  isAtInsideATag = true;
                  break;
                }
                parent = parent.parentNode;
              }
              break;
            }
            currentPos += node.textContent.length;
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.tagName.toLowerCase() === 'a') {
              currentPos += node.textContent.length;
            }
          }
          node = node.nextSibling;
        }

        if (!isAtInsideATag) {
          atIndex = i;
          break;
        }
      }
    }
    console.log('insertMention-atIndex-光标位置', atIndex);
    if (atIndex !== -1) {
      // 保存选区
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);

      // 创建不可编辑的提及标签
      const mention = document.createElement('a');
      mention.contentEditable = 'false';
      mention.className = 'mention-tag';
      mention.dataset.userId = user.id;
      mention.textContent = `@${user.name}`;

      // 添加点击事件 - 显示用户详情弹窗
      // mention.addEventListener('click', (e) => {
      //   e.stopPropagation();
      //   setSelectedUser(user);
      // });
      const cursorPosition = range.startOffset;
      console.log('cursorPosition', cursorPosition);
      // 替换@及其后内容
      console.log('text', text);
      console.log('atIndex', atIndex);
      const beforeText = text.substring(0, currentPosition-1);
      console.log('beforeText', beforeText);
      const afterText = text.substring(currentPosition);
      console.log('afterText', afterText);
      // 重新设置内容
      editor.innerHTML = '';
      editor.appendChild(document.createTextNode(beforeText));
      editor.appendChild(mention);
      editor.appendChild(document.createTextNode(afterText + ' '));

      // 更新评论内容
      setComment(editor.innerText);
      console.log('editor.innerText', editor.innerText);
      const result = replaceMentionsWithSpans(editor.innerText);
      console.log('replaceMentionsWithSpans', result);
      document.getElementById('mention').innerHTML = result;
      setHtmlContent(result);
      const { text: text2, cursorPosition: cursorPosition2 } =
        getTextAndCursorPosition();
      setCurrentPosition(cursorPosition2);
      setTextContent(text2);
      // 恢复光标位置
      const newRange = document.createRange();
      newRange.setStartAfter(editor.lastChild);
      newRange.collapse(true);
      selection.removeAllRanges();
      selection.addRange(newRange);
    }

    setShowMentions(false);
  };
  const handleKeyDown = (e) => {
    if (!showMentions) return;
    // 上箭头
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(0, prev - 1));
      scrollToSelected();
      return;
    }
    // 下箭头
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(filteredUsers.length - 1, prev + 1));
      scrollToSelected();
      return;
    }

    // 回车选择
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredUsers[selectedIndex]) {
        insertMention(filteredUsers[selectedIndex]);
      }
      return;
    }
    // ESC关闭
    if (e.key === 'Escape') {
      e.preventDefault();
      setShowMentions(false);
      return;
    }
  };

  // 滚动到选中的用户
  const scrollToSelected = () => {
    if (mentionsListRef.current && filteredUsers.length > 0) {
      const selectedItem = mentionsListRef.current.children[selectedIndex];
      if (selectedItem) {
        selectedItem.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    }
  };

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        editorRef.current &&
        !editorRef.current.contains(e.target) &&
        mentionsListRef.current &&
        !mentionsListRef.current.contains(e.target)
      ) {
        setShowMentions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 获取所有文本内容
  const getAllTextContent = () => {
    const container = document.querySelector('.mentions-container');
    if (!container) return '';

    // 创建一个临时div来存储内容
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = container.innerHTML;

    // 获取所有文本节点
    const getTextNodes = (node) => {
      let text = '';
      if (node.nodeType === Node.TEXT_NODE) {
        text += node.textContent;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // 如果是a标签，保留其文本内容
        if (node.tagName.toLowerCase() === 'a') {
          text += node.textContent;
        } else {
          // 递归处理子节点
          for (let child of node.childNodes) {
            text += getTextNodes(child);
          }
        }
      }
      return text;
    };

    // 获取所有文本并清理
    let text = getTextNodes(tempDiv);

    // 清理多余的空格和换行
    text = text.replace(/\s+/g, ' ').trim();

    return text;
  };
  const getTextAndCursorPosition = () => {
    const editor = editorRef.current;
    if (!editor) return { text: '', cursorPosition: 0 };

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0)
      return { text: '', cursorPosition: 0 };

    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(editor);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    const cursorPosition = preCaretRange.toString().length;
    const text = editor.textContent || '';

    return { text, cursorPosition };
  };
  // 示例使用方法
  const handleGetText = () => {
    const text = getAllTextContent();
    return text;
  };

  // 清空内容方法
  const clearContainerContent = () => {
    // 清空编辑器内容
    if (editorRef.current) {
      editorRef.current.innerHTML = '';
    }

    // 清空HTML内容
    setHtmlContent('');

    // 清空评论内容
    setComment('');

    // 关闭提及列表
    setShowMentions(false);

    // 重置选中用户
    setSelectedUser(null);
  };

  // 示例使用方法
  const handleClear = () => {
    clearContainerContent();
  };

  return (
    <div className="mentions-container">
      <div className="mention-text">{textContent}</div>
      <div className="mention-text">{currentPosition}</div>
      <div
        ref={editorRef}
        id="mention"
        className="mention-editor"
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        placeholder="请输入内容..."
      ></div>
      {showMentions && (
        <div
          ref={mentionsListRef}
          className="mentions-list"
          style={{
            top: `${mentionPosition.top}px`,
            left: `${mentionPosition.left}px`,
          }}
        >
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <div
                key={user.id}
                className={`mention-item ${
                  index === selectedIndex ? 'selected' : ''
                }`}
                onClick={() => insertMention(user)}
              >
                <div className="mention-avatar">{user.name.charAt(0)}</div>
                <div className="mention-info">
                  <div className="mention-name">{user.name}</div>
                  <div className="mention-email">{user.email}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="mention-empty">没有匹配的用户</div>
          )}
        </div>
      )}
      <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
        <button onClick={handleGetText} className="submit-button">
          获取文本内容
        </button>
        <button
          onClick={handleClear}
          className="submit-button"
          style={{ backgroundColor: '#dc3545' }}
        >
          清空内容
        </button>
      </div>
    </div>
  );
};

export default MentionsEditor;
