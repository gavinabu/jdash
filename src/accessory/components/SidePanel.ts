import ComputerBridge from "../../constant/ComputerBridge";
import {getColor} from "../Color";

const metricDistanceConvert = 3.6;
const imperialDistanceConvert = 2.23694;

const icons = new Map<string, [boolean, HTMLImageElement]>()
function generateIcon(name: string,url: string, edit?: (ele: HTMLImageElement) => void) {
  let ele = document.createElement("img");
  ele.src = url;
  if(edit) edit(ele)
  icons.set(name, [false, ele])
  ele.onload = () => {
    icons.set(name, [true, ele])
  }
}

generateIcon("leftSignal", "./media/dashLights/Left Turn Signal Off.svg")
generateIcon("leftSignalOn", "./media/dashLights/Left Turn Signal.svg")
generateIcon("rightSignal", "./media/dashLights/Right Turn Signal Off.svg")
generateIcon("rightSignalOn", "./media/dashLights/Right Turn Signal.svg")
generateIcon("noCar", "./media/dashLights/No Car Connection.svg")
generateIcon("revLimit", "./media/dashLights/Rev Limit.svg")
generateIcon("tc", "./media/dashLights/TC.svg")
generateIcon("abs", "./media/dashLights/ABS.svg")
generateIcon("handbrake", "./media/dashLights/Handbrake.svg")
generateIcon("checkEngine", "./media/dashLights/Check Engine.svg")
generateIcon("battery", "./media/dashLights/Battery.svg")
generateIcon("fuel", "./media/dashLights/Low Fuel.svg")

function drawText(ctx: CanvasRenderingContext2D,text:string,x: number,y: number,fontSize: number,font: string,color: string,align?: ["left"|"center"|"right","top"|"center"|"bottom"], bold?: boolean) {
  ctx.font = `${bold ? 'bold ' : ''}${fontSize}px ${font}`;
  ctx.fillStyle = color;
  switch((align || [])[1]) {
    case "center": {
      ctx.textBaseline = "middle"
      break;
    }
    case "top": {
      ctx.textBaseline = "top"
      break
    }
    case "bottom": {
      ctx.textBaseline = "bottom"
      break;
    }
  }
  let m = ctx.measureText(text);
  let newX = x
  switch((align || [])[0]) {
    case "center": {
      ctx.textBaseline = "middle"
      ctx.textAlign = "center"
      break;
    }
    case "left": {
      newX += m.width / 2
      break
    }
    case "right": {
      newX -= m.width / 2
      break;
    }
  }
  ctx.fillText(text,newX,y)
}

export default function sidePanel(ctx:CanvasRenderingContext2D, x: number, y: number) {
  let engineData = ComputerBridge.instance.getEngineData();
  let dashLights = ComputerBridge.instance.getDashLights();
  let metricDistance = localStorage.getItem("unit.metricDistance") === "true"
  ctx.fillStyle = getColor("BG");
  ctx.fillRect(x,y,500,1200);
  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.fillRect(x,y,500,100);
  ctx.fillStyle = "rgba(0,0,0,0.15)";
  ctx.fillRect(x,y + 100,500,150);
  drawText(ctx,(engineData.wheelSpeed * (metricDistance ? metricDistanceConvert : imperialDistanceConvert)).toFixed(0),250,100+(88/2)+14,70,"Orbitron",getColor("FG"),["center","center"])
  drawText(ctx,metricDistance ? "kmh" : 'mph',250,100+(50/2)+85,40,"Orbitron",getColor("FG"),["center","center"],true)
  let now = new Date(Date.now());
  drawText(ctx,now.toLocaleTimeString(undefined,{hour12:true}),250,50,40,"Orbitron",getColor("FG"),["center","center"],true)
  drawText(ctx,`${engineData.transmissionSpeed.toFixed(0).padStart(4,"0")} rpm`,250,270,20,"Orbitron",getColor("FG"),["center","center"],true)
  ctx.drawImage(icons.get(`leftSignal${dashLights.includes("LeftTurnSignal") ? "On" : ""}`)![1],18,18)
  ctx.drawImage(icons.get(`rightSignal${dashLights.includes("RightTurnSignal") ? "On" : ""}`)![1],418,18)
  ctx.drawImage(icons.get(`rightSignal${dashLights.includes("RightTurnSignal") ? "On" : ""}`)![1],418,18)
  
  if(dashLights.includes("ABS")) ctx.drawImage(icons.get("abs")![1],11,100+11);
  if(dashLights.includes("Handbrake")) ctx.drawImage(icons.get("handbrake")![1],75,100+11);
  if(dashLights.includes("RevLimit")) ctx.drawImage(icons.get("revLimit")![1],11,100+75);
  if(dashLights.includes("TractionControl")) ctx.drawImage(icons.get("tc")![1],75,100+75);
  
  if(dashLights.includes("NoCarConnection")) ctx.drawImage(icons.get("noCar")![1],362,100+11);
  if(dashLights.includes("CheckEngine")) ctx.drawImage(icons.get("checkEngine")![1],426,100+11);
  if(dashLights.includes("LowFuel")) ctx.drawImage(icons.get("fuel")![1],362,100+75);
  if(dashLights.includes("Battery")) ctx.drawImage(icons.get("battery")![1],426,100+75);
  
}