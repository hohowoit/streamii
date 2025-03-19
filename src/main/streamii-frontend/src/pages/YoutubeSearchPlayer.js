import React, { useState } from "react";
import YouTube from "react-youtube";

function YouTubeSearchPlayer() {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState([]);
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  // 1) 검색 함수: 백엔드(/api/youtube/search?q=...) 호출
  const handleSearch = () => {
    if (!query) return;
    const url = `http://localhost:8080/api/youtube/search?q=${encodeURIComponent(query)}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("백엔드 응답:", data);
        // data.items ~> YouTube Data API JSON 구조
        if (data.items) {
          setVideos(data.items);
        } else {
          setVideos([]);
        }
      })
      .catch((err) => console.error("검색 실패:", err));
  };

  // react-youtube 옵션
  const playerOpts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1
    }
  };

  return (
    <div style={{ width: 700, margin: "0 auto" }}>
      <h2>YouTube Search + Player Demo</h2>

      {/* 검색 UI */}
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="검색어 입력"
          style={{ width: 300, marginRight: 8 }}
        />
        <button onClick={handleSearch}>검색</button>
      </div>

      {/* 검색 결과 목록 */}
      <ul style={{ listStyle: "none", padding: 0, marginTop: 10 }}>
        {videos.map((item) => {
          const videoId = item.id.videoId; // 'id': { 'videoId': 'xxx' }
          const snippet = item.snippet;
          const title = snippet?.title;
          const thumbnail = snippet?.thumbnails?.default?.url;

          return (
            <li
              key={videoId}
              style={{ marginBottom: 12, cursor: "pointer" }}
              onClick={() => setSelectedVideoId(videoId)}
            >
              <img src={thumbnail} alt="thumb" style={{ marginRight: 8 }} />
              {title}
            </li>
          );
        })}
      </ul>

      {/* 영상 재생 (react-youtube) */}
      {selectedVideoId && (
        <div style={{ marginTop: 20 }}>
          <YouTube videoId={selectedVideoId} opts={playerOpts} />
        </div>
      )}
    </div>
  );
}

export default YouTubeSearchPlayer;
