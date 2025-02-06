import {io, Socket} from "socket.io-client";
import Spotify from "./Spotify";

export type DeviceInfo = {
  version: string,
  name: string,
  type: "Emulator" | "Simulator" | "Car"
}

const myInfo: DeviceInfo = {
  version: "0.0.1",
  name: "JDash Head Unit",
  type: "Emulator", // Emulator, Simulator or Car
}

export type RPM = number; // revolutionsPerMinute
export type SPEED = number; // meters per second
export type PERCENT = number; // 0 - 1
export type TEMPERATURE = number; // degrees celsius
export type GEAR = number | "park";
export type EngineData = {
  transmissionSpeed: RPM,
  wheelSpeed: SPEED,
  fuelLevel: PERCENT,
  oilTemp: TEMPERATURE,
  gear: GEAR,
  transmissionType: "auto" | "manual"
}
export type DashLight =
  "CheckEngine" |
  "OilPSI" |
  "CoolentTemp" |
  "Battery" |
  "LowFuel" |
  "LowFuelPSI" |
  "TirePSI" |
  "ABS" |
  "TractionControl" |
  "LowBrakePSI" |
  "Handbrake" |
  "RevLimit" |
  "PowerSteering" |
  "BrakePadWear" |
  "BrakePadTemp" |
  "NoCarConnection" | // or game connection
  "LeftTurnSignal" |
  "RightTurnSignal" |
  "LowBeam" |
  "HighBeam"

export default class ComputerBridge {
  protected static _socket: Socket = io(`${(window as any).api.host || '127.0.0.1'}:${(window as any).api.port || '8218'}`, {
    reconnectionDelay: 250
  });
  static getSocket(): Promise<Socket> {
    return new Promise((resolve, reject) => {
      if(this._socket.connected) resolve(this._socket);
      this._socket.on('connect', () => {resolve(this._socket)})
    })
  }
  protected static serverInfo: DeviceInfo | undefined;
  static spotify: Spotify;
  static create() {
    this.spotify = new Spotify();
    this.spotify.connect().then(() => {
      this.spotify.getMe().then(e => {
        console.log(`Connected to Spotify as "${e.display_name}"`);
      })
    });
    this._socket.on("verify", (serverData: DeviceInfo, callback) => {
      this.serverInfo = serverData;
      console.log(`Connected to ${serverData.name}`);
      callback(myInfo);
    })
    this._socket.on("disconnect", () => {
      this.serverInfo = undefined;
    })
  }
  static getEngineData(): EngineData {
    return {
      transmissionSpeed: 1250 + Math.floor(Math.random() * 50) + (Math.sin((Date.now() / 500)) * 20),
      fuelLevel: 0.28,
      oilTemp: 83,
      wheelSpeed: 0,
      gear: 0,
      transmissionType: "manual"
    }
  }
  
  static getDashLights(): DashLight[] {
    let lights: DashLight[] = [];
    if(!this._socket.connected) lights.push("NoCarConnection");
    return lights;
  }
}