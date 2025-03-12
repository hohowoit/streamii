import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [albums, setAlbums] = useState([]);
    const [rooms, setRooms] = useState([
        "🎧 Chill Vibes",
        "🎸 Rock Party",
        "🎶 K-Pop Zone",
    ]);

    // 플레이리스트 목록
    const [playlists, setPlaylists] = useState([
        "My Playlist 1",
        "My Playlist 2",
    ]);

    // 새 플레이리스트 생성 모달
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedTracks, setSelectedTracks] = useState([]);

    // 모달 열기
    const openCreateModal = () => {
        setShowCreateModal(true);
        setNewPlaylistName("");
        setSearchQuery("");
        setSearchResults([]);
        setSelectedTracks([]);
    };

    // 모달 닫기
    const closeCreateModal = () => {
        setShowCreateModal(false);
    };

    // 검색하기
    const handleSearch = () => {
        const encodedQuery = encodeURIComponent(searchQuery);
        fetch(`http://localhost:8080/api/spotify/search?q=${encodedQuery}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.tracks && data.tracks.items) {
                    setSearchResults(data.tracks.items);
                } else {
                    setSearchResults([]);
                }
            })
            .catch((err) => console.error("검색 실패:", err));
    };

    // 곡 선택
    const toggleTrackSelection = (trackId) => {
        if (selectedTracks.includes(trackId)) {
            setSelectedTracks(selectedTracks.filter((id) => id !== trackId));
        } else {
            setSelectedTracks([...selectedTracks, trackId]);
        }
    };

    // 플레이리스트 생성
    const handleCreatePlaylist = () => {
        const reqBody = {
            name: newPlaylistName,
            trackIds: selectedTracks,
        };
        fetch("http://localhost:8080/api/spotify/create-playlist", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reqBody),
        })
            .then((res) => res.text())
            .then((msg) => {
                console.log("플레이리스트 생성 응답:", msg);
                setShowCreateModal(false);
                setPlaylists([...playlists, newPlaylistName]);
            })
            .catch((err) => console.error("플레이리스트 생성 실패:", err));
    };

    const handleLogout = () => {
        alert("로그아웃 되었습니다.");
        navigate("/login");
    };

    return (
        <div className="home-container">
            {/* 헤더 */}
            <header className="home-header">
                <h1>🎵 Streamii</h1>

                <div className="profile-menu">
                    <div
                        className="profile-circle"
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        <p>프로필 이미지</p>
                    </div>
                    {showMenu && (
                        <div className="dropdown-menu">
                            <button onClick={() => navigate("/profile")}>
                                프로필
                            </button>
                            <button onClick={() => navigate("/settings")}>
                                설정
                            </button>
                            <button onClick={handleLogout}>로그아웃</button>
                        </div>
                    )}
                </div>
            </header>

            {/* 방 목록 */}
            <section className="room-list">
                <h2>🎤 참여 가능한 방</h2>
                <ul>
                    {rooms.map((room, index) => (
                        <li key={index} className="room-item">
                            {room}
                        </li>
                    ))}
                </ul>
            </section>

            <section className="playlist-list">
                {/* 새 래퍼 div */}
                <div className="playlist-list-header">
                    <h2>나의 플레이리스트</h2>
                    <button
                        className="add-playlist-btn"
                        onClick={openCreateModal}
                    >
                        + 플레이리스트 추가
                    </button>
                </div>

                <ul>
                    {playlists.map((pl, i) => (
                        <li key={i} className="playlist-name">
                            {pl}
                        </li>
                    ))}
                </ul>
            </section>

            {/* 새 앨범 목록 (생략) */}
            {/* ... */}

            {/* 새 플레이리스트 생성 모달 */}
            {showCreateModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2 className="modal-title">새 플레이리스트 만들기</h2>
                        <input
                            type="text"
                            placeholder="플레이리스트 이름"
                            className="input-field"
                            value={newPlaylistName}
                            onChange={(e) => setNewPlaylistName(e.target.value)}
                        />

                        <hr />

                        {/* 검색 파트 */}
                        <h3 className="search-title">곡 검색</h3>
                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="검색어 입력"
                                className="input-field"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                }}
                            />
                            <button
                                className="search-btn"
                                onClick={handleSearch}
                            >
                                검색
                            </button>
                        </div>

                        {/* 검색 결과 목록 */}
                        <ul className="search-results">
                            {searchResults.map((track) => (
                                <li key={track.id} className="search-item">
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={selectedTracks.includes(
                                                track.id,
                                            )}
                                            onChange={() =>
                                                toggleTrackSelection(track.id)
                                            }
                                        />
                                        {track.name} -{" "}
                                        {track.artists
                                            .map((a) => a.name)
                                            .join(", ")}
                                    </label>
                                </li>
                            ))}
                        </ul>

                        <div className="modal-buttons">
                            <button
                                className="create-btn"
                                onClick={handleCreatePlaylist}
                            >
                                생성
                            </button>
                            <button
                                className="cancel-btn"
                                onClick={closeCreateModal}
                            >
                                취소
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
