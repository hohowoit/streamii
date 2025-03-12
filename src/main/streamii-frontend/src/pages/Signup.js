import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("")
    const [colorId, setColorId] = useState("")
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const authType = "general";

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        // 이메일 유효성 검사
        if (!validateEmail(email)) {
            setSuccessMessage("유효하지 않은 이메일 형식입니다.");
            return;
        } else {
            setSuccessMessage("");
        }

        // 비밀번호 유효성 검사
        if (password.length < 6) {
            setSuccessMessage("비밀번호는 최소 6자 이상이어야 합니다.");
            return;
        } else {
            setSuccessMessage("");
        }

        try {
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/register`, { email, password, name, authType, colorId });
            setErrorMessage("");
            setSuccessMessage("성공적으로 회원가입 했습니다!");
            setEmail("");
            setPassword("");
            setName("");
            setColorId("");
            navigate("/login")
        } catch (error) {
            setErrorMessage("이미 사용 중인 이메일입니다.");
        }
    };

    return (
        <div>
            <h2>회원 가입 페이지</h2>
            {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
                {successMessage && (
                    <div style={{ color: "green" }}>{successMessage}</div>
            )}
            <form onSubmit={handleRegister}>
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
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>ColorPick</label>
                    <input
                        type="text"
                        value={colorId}
                        onChange={(e) => setColorId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">등록</button>
            </form>
        </div>
    );
}

export default Signup;