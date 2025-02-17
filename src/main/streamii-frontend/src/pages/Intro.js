import React from "react";
import { useNavigate } from "react-router-dom";

function Intro() {
    const navigate = useNavigate();

    return (
        <div className="intro-container">
            <h1 className="intro-header">Streamii</h1>

            <div className="button-group">
                <button className="login-button" onClick={() => navigate("/login")}>
                    로그인하기
                </button>
                <button className="guest-button" onClick={() => navigate("/home")}>
                    게스트로 입장
                </button>
            </div>
        </div>
    );
}

export default Intro;
