import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

let socket;

function Chat() {
  const { username } = useParams();
  const [message, setMessage] = useState("");
  useEffect(() => {
    socket = new WebSocket("ws://localhost:5000");
    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          username,
          id: username + "1234",
          type: "connection",
        })
      );
    };
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case "connection":
          console.log(`Пользователь с юзернеймом ${data.username} подключился`);
          break;
        case "message":
          console.log(`Сообщение от ${data.username}:   ${data.message}`);
          break;
        case "close":
          console.log(`Пользователь с id = ${data.id} отключился`);
          break;
      }
    };
    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    socket.send(
      JSON.stringify({
        username,
        id: username + "1234",
        type: "message",
        message,
      })
    );
    setMessage("");
  };

  return (
    <div>
      <input
        placeholder="Введите сообщение"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Отправить</button>
    </div>
  );
}

export default Chat;
