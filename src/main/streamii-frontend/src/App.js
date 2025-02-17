import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Intro from "./pages/Intro";
import Login from "./pages/Login";

const CLIENT_ID = "1019024653112-hce0qde0jjrp7lir05nfbi2i90smbflb.apps.googleusercontent.com"; // 여기에 본인의 클라이언트 ID 입력

function App() {
    return (
        <GoogleOAuthProvider clientId={CLIENT_ID}>
            <Router>
                <Routes>
                    <Route path="/" element={<Intro />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<h1>🎵 음악을 함께 즐겨보세요!</h1>} />
                </Routes>
            </Router>
        </GoogleOAuthProvider>
    );
}

export default App;
