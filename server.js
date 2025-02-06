const express = require('express');
const http = require("node:http");
const {Server} = require("socket.io");
const cors = require("cors");
const querystring = require("node:querystring");
const {default: nodeopen} = require("open");

const {spotify} = require("./config.json");
const path = require("node:path");

const app = express();
const io = new Server({
  cors: {
    origin: ["http://localhost:3000", "https://dash.justwhatever.net/head"]
  }
})
const myInfo = {
  version: "0.0.1",
  name: "JDash PC Client",
  type: "Simulator", // Game or Car
}

app.use(cors({
  origin: "http://localhost:3000 https://dash.justwhatever.net/head",
}))

io.on("connection", (socket) => {
  socket.emit("verify", myInfo, (clientInfo) => {
    console.log(`Connected to ${clientInfo.name}`);
  })
  socket.on("requestSpotifyToken", async ({scope}) => {
    await nodeopen('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: spotify.client,
        scope: scope,
        redirect_uri: 'http://localhost:8218/spotify',
      }), {});
  })
  socket.on("getAccessToken", async (refreshToken) => {
    socket.emit("authCode",await (await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: new Headers({
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (new Buffer.from(spotify.client + ':' + spotify.secret).toString('base64'))
      }),
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id:spotify.client,
      })
    })).json())
  })
})

app.get("/spotify", async (req, res) => {
  if(req.query.code !== undefined){
    let response = await fetch('https://accounts.spotify.com/api/token', {
      body: new URLSearchParams({
        code: req.query.code,
        redirect_uri: "http://localhost:8218/spotify", // this doesnt get called. dont worry about recursion
        "grant_type": 'authorization_code',
      }),
      headers: new Headers({
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (new Buffer.from(spotify.client + ':' + spotify.secret).toString('base64'))
      }),
      method: "POST"
    });
    io.emit("authCode", await response.json());
    res.sendFile(path.resolve("./callback.html"));
  }
})

const httpServer = http.createServer(app)
io.attach(httpServer);
httpServer.listen(8218, () => {
  console.log('Listening on port 8218');
})