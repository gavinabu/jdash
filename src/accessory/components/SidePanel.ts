import ComputerBridge, {DashLight} from "../../constant/ComputerBridge";
import {getColor} from "../Color";
import {drawText} from "../renderer/TextRenderer";

const metricDistanceConvert = 3.6;
const imperialDistanceConvert = 2.23694;

const icons = new Map<string, [boolean, HTMLImageElement]>()
function generateIcon(name: DashLight | string,url: string, edit?: (ele: HTMLImageElement) => void) {
  let ele = document.createElement("img");
  ele.src = url;
  if(edit) edit(ele)
  icons.set(name, [false, ele])
  ele.onload = () => {
    icons.set(name, [true, ele])
  }
}

generateIcon("LeftTurnSignal", "./media/dashLights/Left Turn Signal.svg")
generateIcon("RightTurnSignal", "./media/dashLights/Right Turn Signal.svg")
generateIcon("LeftTurnSignalOff", "./media/dashLights/Left Turn Signal Off.svg")
generateIcon("RightTurnSignalOff", "./media/dashLights/Right Turn Signal Off.svg")
generateIcon("NoCarConnection", "./media/dashLights/No Car Connection.svg")
generateIcon("RevLimit", "./media/dashLights/Rev Limit.svg")
generateIcon("TractionControl", "./media/dashLights/TC.svg")
generateIcon("ABS", "./media/dashLights/ABS.svg")
generateIcon("Handbrake", "./media/dashLights/Handbrake.svg")
generateIcon("CheckEngine", "./media/dashLights/Check Engine.svg")
generateIcon("Battery", "./media/dashLights/Battery.svg")
generateIcon("LowFuel", "./media/dashLights/Low Fuel.svg")
generateIcon("HighBeam", "./media/dashLights/High Beam.svg")
generateIcon("LowBeam", "./media/dashLights/Low Beam.svg")

export default function sidePanel(ctx:CanvasRenderingContext2D, x: number, y: number) {
  let engineData = ComputerBridge.getEngineData();
  let dashLights = ComputerBridge.getDashLights();
  let metricDistance = localStorage.getItem("unit.metricDistance") === "true"
  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.fillRect(x,y,500,1050);
  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.fillRect(x,y,500,100);
  ctx.fillStyle = "rgba(0,0,0,0.15)";
  ctx.fillRect(x,y + 100,500,150);
  drawText(ctx,(engineData.wheelSpeed * (metricDistance ? metricDistanceConvert : imperialDistanceConvert)).toFixed(0),x+250,y+100+(88/2)+14,70,"Orbitron",getColor("FG"),["center","center"])
  drawText(ctx,metricDistance ? "kmh" : 'mph',x+250,y+100+(50/2)+85,40,"Orbitron",getColor("FG"),["center","center"],true)
  let now = new Date(Date.now());
  drawText(ctx,now.toLocaleTimeString(undefined,{hour12:true}),x+250,y+ 50,40,"Orbitron",getColor("FG"),["center","center"],true)
  drawText(ctx,`${engineData.transmissionSpeed.toFixed(0).padStart(4,"0")} rpm`,x+250,y+270,20,"Orbitron",getColor("FG"),["center","center"],true)
  
  function ifLightDrawLight(name: DashLight, x:number, y:number, sx: number, sy:number) {
    if(dashLights.includes(name)) ctx.drawImage(icons.get(name)![1],x+sx,y+sy)
  }
  
  ifLightDrawLight("LeftTurnSignal",x,y,18,18)
  ifLightDrawLight("RightTurnSignal",x,y,418,18)
  ifLightDrawLight("ABS",x,y+111,0,0);
  ifLightDrawLight("Handbrake",x,y+111,64,0);
  ifLightDrawLight("RevLimit",x,y+111,64,64);
  ifLightDrawLight("TractionControl",x,y+111,0,64);
  ifLightDrawLight("HighBeam",x,y+111,128,64);
  
  ifLightDrawLight("NoCarConnection",x+308,y+111,64,0);
  ifLightDrawLight("CheckEngine",x+308,y+111,128,0);
  ifLightDrawLight("LowBeam",x+308,y+111,0,64);
  ifLightDrawLight("LowFuel",x+308,y+111,64,64);
  ifLightDrawLight("Battery",x+308,y+111,128,64);
  
  
}