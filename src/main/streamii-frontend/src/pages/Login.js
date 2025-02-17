import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("로그인 시도:", email, password);
        // 로그인 API 연동 후 성공하면 메인 페이지로 이동
        navigate("/home");
    };

    return (
        <div className="login-container">
            <h1 className="login-header">로그인</h1>
            <form className="login-form" onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">로그인</button>
            </form>
            <button className="back-button" onClick={() => navigate("/")}>
                뒤로 가기
            </button>
        </div>
    );
}

export default Login;
