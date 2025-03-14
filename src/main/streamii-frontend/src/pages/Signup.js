import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from '../styles/Signup.module.css'

function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [colorId, setColorId] = useState("");
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
            await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/user/register`,
                {
                    email,
                    password,
                    name,
                    authType,
                    colorId,
                },
            );
            setErrorMessage("");
            setSuccessMessage("성공적으로 회원가입 했습니다!");
            setEmail("");
            setPassword("");
            setName("");
            setColorId("");
            navigate("/login");
        } catch (error) {
            setErrorMessage("이미 사용 중인 이메일입니다.");
        }
    };

    return (
        <div>
            <p
                className={styles.header}
                onClick={(e) => navigate("/")}
            >
                Streamii
            </p>
            <div className={styles.formContainer}>
                {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
                {successMessage && (
                    <div style={{ color: "green" }}>{successMessage}</div>
                )}
                <form onSubmit={handleRegister}>
                    <div className={styles.formList}>
                        <div className={styles.inputWrapper}>
                            <input
                                type="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="이메일 주소"
                                className={styles.inputField}
                                required
                            />
                            <svg height="24px" viewBox="0 -960 960 960" width="22px" fill="#4573A8" className={styles.pwIcon}><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/></svg>
                            <svg height="20px" viewBox="0 -960 960 960" width="20px" fill="#4573A8" className={styles.mailIcon}><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"/></svg>
                            <svg height="24px" viewBox="0 -960 960 960" width="24px" fill="#4573A8" className={styles.personIcon}><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="비밀번호"
                                className={styles.inputField}
                                required
                            />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="이름"
                                className={styles.inputField}
                                required
                            />
                        </div>
                    </div>
                    <div className={styles.colorForm}>
                        <input
                            type="text"
                            value={colorId}
                            onChange={(e) => setColorId(e.target.value)}
                            className={styles.colorField}
                            placeholder="색상코드"
                            required
                        />
                    </div>
                    <button type="submit" className={styles.submitBtn}>등록</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
