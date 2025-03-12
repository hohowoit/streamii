import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // 전역 스타일 가져오기
import "./styles/intro.css";
import App from "./App"; // 메인 컴포넌트(App.js) 불러오기
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);

reportWebVitals();
