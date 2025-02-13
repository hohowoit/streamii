import React, { useState, useEffect } from "react";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/test/user")
            .then((res) => res.json())
            .then((data) => setUser(data))
            .catch((error) => console.error("Error fetching user:", error));
    }, []);

    return (
        <div className="App">
            <h1>사용자 정보</h1>
                  {user ? (
                    <p>{user.name} ({user.email})</p>
                  ) : (
                    <p>로딩 중...</p>
                  )}
        </div>
    );
}

export default App;
