import ComputerBridge from "./ComputerBridge";

export default class Spotify {
  async connect() {
    (await ComputerBridge.getSocket()).on("authCode", (query) => {
      localStorage.setItem("access_token", query.access_token);
      if(query.refresh_token) localStorage.setItem("refresh_token", query.refresh_token);
      localStorage.setItem("refresh_time", (Date.now() + ((query.expires_in - 5) * 1000)).toFixed(0));
      return this.connect();
    })
    if(localStorage.getItem("access_token") == null && localStorage.getItem("refresh_token") == null) {
      (await ComputerBridge.getSocket()).emit("requestSpotifyToken",{
        scope: 'user-read-playback-state playlist-read-private user-read-currently-playing user-modify-playback-state streaming playlist-read-collaborative user-library-read',
      });
    }
    
    if(Date.now() > Number.parseInt(localStorage.getItem("refresh_time")!)) localStorage.removeItem("access_token")
    
    if(localStorage.getItem("access_token") === null && localStorage.getItem("refresh_token") !== null) {
      (await ComputerBridge.getSocket()).emit("getAccessToken",localStorage.getItem("refresh_token"));
    }
  }
  
  protected async requestURL(url: string, customHeaders?: {[key:string]:string}): Promise<{ [key: string]: any }> {
    return await (await fetch(`https://api.spotify.com/v1/${url}`, {
      headers: new Headers({Authorization: `Bearer ${localStorage.getItem("access_token")}`, ...customHeaders}),
    })).json();
  }
  
  async getMyPlaylists() {
    return await this.requestURL("me/playlists")
  }
  
  async getMe() {
    return await this.requestURL("me")
  }
  
  async getPlayerState() {
    return await this.requestURL("me/player")
  }
  
}