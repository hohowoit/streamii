import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // 전역 스타일 가져오기
import './styles/intro.css';
import App from './App'; // 메인 컴포넌트(App.js) 불러오기
import reportWebVitals from './reportWebVitals';

// React 애플리케이션을 HTML의 "root"에 렌더링
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App /> {/* App.js 실행 */}
  </React.StrictMode>
);

// 웹 성능 측정 (선택 사항)
reportWebVitals();
