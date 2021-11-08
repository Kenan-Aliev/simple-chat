const express = require("express");
const app = express();
const expressWs = require("express-ws")(app);
const awss = expressWs.getWss();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.ws("/", (ws, req) => {
  console.log("Подключение установлено");
  ws.on("message", (msg) => {
    msg = JSON.parse(msg);
    switch (msg.type) {
      case "connection":
        ws.id = msg.id;
        awss.clients.forEach((client) => client.send(JSON.stringify(msg)));
        break;
      case "message":
        awss.clients.forEach((client) => client.send(JSON.stringify(msg)));
        break;
    }
  });
  ws.on("close", () => {
    awss.clients.forEach((client) =>
      client.send(
        JSON.stringify({
          id: ws.id,
          type: "close",
        })
      )
    );
  });
});

app.listen("5000", () => {
  console.log("Server running on PORT 5000");
});
