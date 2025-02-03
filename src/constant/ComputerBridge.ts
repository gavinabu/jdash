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
  "RightTurnSignal"

export default class ComputerBridge {
  private static _instance = new ComputerBridge();
  public static get instance() {return this._instance;}
  
  getEngineData(): EngineData {
    return {
      transmissionSpeed: 1250 + Math.floor(Math.random() * 50) + (Math.sin((Date.now() / 500)) * 20),
      fuelLevel: 0.28,
      oilTemp: 83,
      wheelSpeed: 0,
      gear: 0,
      transmissionType: "manual"
    }
  }
  
  getDashLights(): DashLight[] {
    return [
      "CheckEngine",
      // "OilPSI",
      // "CoolentTemp",
      "Battery",
      "LowFuel",
      // "LowFuelPSI",
      // "TirePSI",
      "ABS",
      "TractionControl",
      // "LowBrakePSI",
      "Handbrake",
      "RevLimit",
      // "PowerSteering",
      // "BrakePadWear",
      // "BrakePadTemp",
      "NoCarConnection", // or game connection
      "LeftTurnSignal",
      "RightTurnSignal"
    ]
  }
}