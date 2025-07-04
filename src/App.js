import {
  ContainerOutlined,
  DesktopOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import './App.css';

// 创建示例页面组件
import UseStateDemo from './UseState';
import UseEffectDemo from './UseEffect';
import UseLayoutEffectDemo from './UseLayoutEffect';
import UseContextDemo from './UseContext';
import UseReducerDemo from './UseReducer';
import UseMemoDemo from './UseMemo';
import UseCallbackDemo from './UseCallback';
import UseRefDemo from './UseRef';
import UseImperativeHandleDemo from './UseImperativeHandle';
import SuspenseDemo from './Suspense';
import ReduxExample from './Redux';
import MetionsExample from './Metions';
import RcMetionsExample from './RcMetions/index.tsx';
import SuyMentionsExample from './suyMentions';
import EditableProTable from './EditableProTable/index.tsx';

function AppContent() {
  const { Header, Footer, Sider, Content } = Layout;
  const navigate = useNavigate();
  const location = useLocation();

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const items = [
    getItem('suy-mentions', 'suy-mentions', <PieChartOutlined />),
    getItem('editable', 'editable', <PieChartOutlined />),
    getItem('useState', 'useState', <PieChartOutlined />),
    getItem('useEffect', 'useEffect', <DesktopOutlined />),
    getItem('useLayoutEffect', 'useLayoutEffect', <ContainerOutlined />),
    getItem('useContext', 'useContext', <ContainerOutlined />),
    getItem('useReducer', 'useReducer', <ContainerOutlined />),
    getItem('useMemo', 'useMemo', <ContainerOutlined />),
    getItem('useCallback', 'useCallback', <ContainerOutlined />),
    getItem('useRef', 'useRef', <ContainerOutlined />),
    getItem('suspense', 'suspense', <ContainerOutlined />),
    getItem('forwardRef', 'forwardRef', <ContainerOutlined />),
    getItem('redux', 'redux', <ContainerOutlined />),
    getItem('metions', 'metions', <ContainerOutlined />),
    getItem('rcMetions', 'rcMetions', <ContainerOutlined />),
  ];

  const handleMenuClick = ({ key }) => {
    navigate(`/${key}`);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="APP-Header">
        <div className="app-title">React学习系统</div>
      </Header>
      <Layout style={{ marginTop: 64 }}>
        <Sider
          width={200}
          style={{
            background: '#fff',
            height: '100%',
            position: 'fixed',
            left: 0,
            overflow: 'auto',
          }}
        >
          <div>
            <Menu
              selectedKeys={[location.pathname.slice(1)]}
              mode="inline"
              theme="light"
              items={items}
              onClick={handleMenuClick}
            />
          </div>
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Content
            style={{
              margin: '10px 5px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
            <Routes>
              <Route path="/editable" element={<EditableProTable />} />
              <Route path="/suy-mentions" element={<SuyMentionsExample />} />
              <Route path="/useState" element={<UseStateDemo />} />
              <Route path="/useEffect" element={<UseEffectDemo />} />
              <Route
                path="/useLayoutEffect"
                element={<UseLayoutEffectDemo />}
              />
              <Route path="/useContext" element={<UseContextDemo />} />
              <Route path="/useReducer" element={<UseReducerDemo />} />
              <Route path="/useMemo" element={<UseMemoDemo />} />
              <Route path="/useCallback" element={<UseCallbackDemo />} />
              <Route path="/useRef" element={<UseRefDemo />} />
              <Route path="/suspense" element={<SuspenseDemo />} />
              <Route path="/forwardRef" element={<UseImperativeHandleDemo />} />
              <Route path="/redux" element={<ReduxExample />} />
              <Route path="/metions" element={<MetionsExample />} />
              <Route path="/rcMetions" element={<RcMetionsExample />} />
              <Route path="/" element={<UseStateDemo />} />
            </Routes>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
              background: '#f0f2f5',
              padding: '10px',
            }}
          >
            <div className="footer">
              React + Ant Design Vue Demo ©2024 Created by suykan
            </div>
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
