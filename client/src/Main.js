import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Main() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <button
        onClick={() => {
          navigate(`/${username}`);
        }}
      >
        Go Chatting
      </button>
    </div>
  );
}

export default Main;
