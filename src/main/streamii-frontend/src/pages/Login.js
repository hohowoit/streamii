import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google"; // ✅ GoogleLogin import 추가
import { jwtDecode } from "jwt-decode"; // ✅ jwtDecode import 수정
import axios from "axios";
import "../styles/login.css";

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
            const response = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
                { email, password },
            );
            const token = response.data;
            localStorage.setItem("token", token); // JWT 토큰 로컬 스토리지에 저장
            navigate("/");
        } catch (error) {
            setErrorMessage("Invalid email or password!");
        }
    };

    return (
        <div className="login-container">
            <div className="contentContainer">
                <div>
                    <p
                        className="header"
                        onClick={(e) => navigate("/")}
                    >
                        Streamii
                    </p>
                    <form onSubmit={handleLogin}>
                        <div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@naver.com"
                                className="inputContainer"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="password"
                                className="inputContainer"
                                required
                            />
                        </div>
                        {errorMessage && (
                            <div style={{ color: "red" }}>{errorMessage}</div>
                        )}
                        <button type="submit" className="submitBtn">로그인</button>
                    </form>
                </div>
                <button
                    className="signupBtn"
                    onClick={() => navigate("/signup")}
                >
                    회원가입
                </button>

                <div className="GoogleBtn">
                    <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={handleFailure}
                    />
                </div>
            </div>
        </div>
    );
}
export default Login;
