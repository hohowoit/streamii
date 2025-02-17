import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intro from "./pages/Intro";
import Login from "./pages/Login";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Intro />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<h1>🎵 음악을 함께 즐겨보세요!</h1>} />
            </Routes>
        </Router>
    );
}

export default App;
