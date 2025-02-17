import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);

    // 예제 데이터
    const rooms = ["🎧 Chill Vibes", "🎸 Rock Party", "🎶 K-Pop Zone"];
    const playlist = [
        { title: "Stay", artist: "The Kid LAROI & Justin Bieber" },
        { title: "Butter", artist: "BTS" },
        { title: "Levitating", artist: "Dua Lipa" }
    ];

    return (
        <div className="home-container">
            {/* 헤더 */}
            <header className="home-header">
                <h1>🎵 Streamii</h1>

                {/* 프로필 아이콘 (유저 메뉴) */}
                <div className="profile-menu">
                    <div className="profile-circle" onClick={() => setShowMenu(!showMenu)}>
                        {/* 동그란 프로필 아이콘 */}
                        <img src="https://via.placeholder.com/40" alt="User" className="profile-img" />
                    </div>
                    {showMenu && (
                        <div className="dropdown-menu">
                            <button onClick={() => navigate("/profile")}>프로필</button>
                            <button onClick={() => navigate("/settings")}>설정</button>
                            <button onClick={() => alert("로그아웃")}>로그아웃</button>
                        </div>
                    )}
                </div>
            </header>

            {/* 방 목록 */}
            <section className="room-list">
                <h2>🎤 참여 가능한 방</h2>
                <ul>
                    {rooms.map((room, index) => (
                        <li key={index} className="room-item">{room}</li>
                    ))}
                </ul>
            </section>

            {/* 플레이리스트 */}
            <section className="playlist">
                <h2>🎵 현재 플레이리스트</h2>
                <ul>
                    {playlist.map((track, index) => (
                        <li key={index} className="playlist-item">
                            {track.title} - {track.artist}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}

export default Home;
