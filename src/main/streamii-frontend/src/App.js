import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Intro from "./pages/Intro";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./styles/home.css";  // 스타일 추가

const CLIENT_ID = "1019024653112-hce0qde0jjrp7lir05nfbi2i90smbflb.apps.googleusercontent.com"; // 여기에 본인의 클라이언트 ID 입력

function App() {
    return (
        <GoogleOAuthProvider clientId={CLIENT_ID}>
            <Router>
                <Routes>
                    <Route path="/" element={<Intro />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </Router>
        </GoogleOAuthProvider>
    );
}

export default App;
