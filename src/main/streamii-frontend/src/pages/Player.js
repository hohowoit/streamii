import React, { useState, useRef, useEffect } from "react";

function Player() {
  // 사용자 입력 검색어
  const [searchQuery, setSearchQuery] = useState("");
  // 스포티파이에서 가져온 곡 배열: [{ title, url }, ...]
  const [tracks, setTracks] = useState([]);

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef(null);

  // ★ 1) 검색 함수 (백엔드 /api/spotify/search?q=... 호출)
  const handleSearch = () => {
    if (!searchQuery) return;
    const encoded = encodeURIComponent(searchQuery);

    // 스프링 백엔드 주소 (예: http://localhost:8080)
    const url = `http://localhost:8080/api/spotify/search?q=${encoded}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("Spotify search result:", data);
        if (data.tracks && data.tracks.items) {
          // preview_url이 null인 것도 있을 수 있음
          const mapped = data.tracks.items.map((item) => ({
            title: item.name,
            url: item.preview_url, // 30초 미리듣기, 없으면 null
            artists: item.artists.map((a) => a.name).join(", "),
          }));
          // 미리듣기 없는 건 제외하고 싶다면 filter
          const filtered = mapped.filter((m) => m.url);
          if (filtered.length === 0) {
            alert("미리듣기 가능한 곡이 없습니다!");
          }
          setTracks(filtered);
          setCurrentTrackIndex(0);
          setProgress(0);
          setIsPlaying(false);
        } else {
          setTracks([]);
        }
      })
      .catch((err) => {
        console.error("검색 에러:", err);
      });
  };

  // 2) 현재 재생 중인 트랙 정보
  const currentTrack = tracks[currentTrackIndex];

  // 3) 재생 버튼
  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  };

  // 4) 일시정지 버튼
  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // 5) 다음 곡 버튼
  const handleNext = () => {
    if (currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
      setIsPlaying(true);
    }
  };

  // 6) 이전 곡 버튼
  const handlePrev = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
      setIsPlaying(true);
    }
  };

  // 7) 곡이 바뀔 때마다 재생 시도
  useEffect(() => {
    if (audioRef.current && currentTrack?.url) {
      audioRef.current.load();
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [currentTrackIndex, currentTrack]);

  // 8) 진행도 업데이트
  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const { currentTime, duration } = audioRef.current;
    if (duration > 0) {
      setProgress((currentTime / duration) * 100);
    }
  };

  // 9) 곡이 끝나면 자동으로 다음 곡
  const handleEnded = () => {
    if (currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    } else {
      setIsPlaying(false);
      setProgress(0);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Spotify 미리듣기 플레이어</h2>

      {/* 검색 UI */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        <input
          style={{ flex: 1, padding: 8 }}
          placeholder="곡/가수 검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button style={styles.button} onClick={handleSearch}>검색</button>
      </div>

      {/* 트랙 정보 */}
      {tracks.length === 0 ? (
        <p style={{ color: '#666' }}>
          검색 후 미리듣기 재생할 곡이 표시됩니다.
        </p>
      ) : (
        <>
          <p style={styles.trackTitle}>
            {currentTrack?.title} ({currentTrackIndex + 1}/{tracks.length})
          </p>

          {/* 숨겨진 오디오 */}
          <audio
            ref={audioRef}
            src={currentTrack?.url || ""}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
          />

          {/* 진행 바 */}
          <div style={styles.progressBarBackground}>
            <div
              style={{
                ...styles.progressBarFill,
                width: `${progress}%`,
              }}
            />
          </div>
          <p style={styles.progressText}>{Math.floor(progress)}%</p>

          {/* 컨트롤 버튼 */}
          <div style={styles.controls}>
            <button
              style={styles.button}
              onClick={handlePrev}
              disabled={currentTrackIndex === 0}
            >
              Prev
            </button>

            {!isPlaying ? (
              <button style={styles.button} onClick={handlePlay}>
                Play
              </button>
            ) : (
              <button style={styles.button} onClick={handlePause}>
                Pause
              </button>
            )}

            <button
              style={styles.button}
              onClick={handleNext}
              disabled={currentTrackIndex === tracks.length - 1}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Player;

const styles = {
  container: {
    width: 320,
    margin: "40px auto",
    padding: 20,
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    marginBottom: 10
  },
  trackTitle: {
    marginBottom: 10,
    fontWeight: "bold"
  },
  progressBarBackground: {
    height: 8,
    width: "100%",
    backgroundColor: "#ddd",
    borderRadius: 4,
    overflow: "hidden",
    margin: "10px 0"
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#1DB954",
    transition: "width 0.2s ease"
  },
  progressText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15
  },
  controls: {
    display: "flex",
    justifyContent: "space-between"
  },
  button: {
    flex: 1,
    margin: "0 5px",
    padding: "10px 15px",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    backgroundColor: "#1DB954",
    color: "white",
    fontWeight: "bold"
  }
};
