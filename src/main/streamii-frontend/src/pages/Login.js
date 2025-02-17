import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google"; // ✅ GoogleLogin import 추가
import { jwtDecode } from "jwt-decode"; // ✅ jwtDecode import 수정

function Login() {
    const navigate = useNavigate();

    const handleSuccess = (response) => {
        const decoded = jwtDecode(response.credential);
        console.log("로그인 성공:", decoded);
        navigate("/home"); // 로그인 성공 후 홈으로 이동
    };

    const handleFailure = (error) => {
        console.error("로그인 실패:", error);
    };

    return (
        <div className="login-container">
            <h1 className="login-header">로그인</h1>

            <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleFailure}
            />

            <button className="back-button" onClick={() => navigate("/")}>
                뒤로 가기
            </button>
        </div>
    );
}

export default Login;
