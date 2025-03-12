import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google"; // ✅ GoogleLogin import 추가
import { jwtDecode } from "jwt-decode"; // ✅ jwtDecode import 수정
import axios from "axios";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSuccess = (response) => {
        const decoded = jwtDecode(response.credential);
        console.log("로그인 성공:", decoded);
        navigate("/home"); // 로그인 성공 후 홈으로 이동
        navigate("/home");
    };

    const handleFailure = (error) => {
        console.error("로그인 실패:", error);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, { email, password });
            const token = response.data;
            localStorage.setItem("token", token); // JWT 토큰 로컬 스토리지에 저장
            navigate("/");
        } catch (error) {
            setErrorMessage("Invalid email or password!");
        }
    };

    return (
        <div className="login-container">
            <h1 className="login-header">로그인</h1>

            <h1 className="login-header">로그인 페이지</h1>
            <div>
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
                    <button type="submit">Login</button>
                </form>
            </div>
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleFailure}
            />

            <button className="back-button" onClick={() => navigate("/signup")}>
                회원 가입
            </button>
            <button className="back-button" onClick={() => navigate("/")}>
                뒤로 가기
            </button>
        </div>
    );
}
export default Login;