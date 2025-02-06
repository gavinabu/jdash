import {darken, getColor} from "../Color";
import {DashLight} from "../../constant/ComputerBridge";

let playing = {
  progress: 0.5,
}

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

generateIcon("Next","./media/audioPlayer/Next.svg")
generateIcon("Back","./media/audioPlayer/Back.svg")
generateIcon("Pause","./media/audioPlayer/Playing.svg") // this is intentional. When posed it should show the button to make it play
generateIcon("Play","./media/audioPlayer/Paused.svg")

export default function bottomBar(ctx:CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = darken(getColor("BG"),1-0.15);
  ctx.fillRect(x,y,1600,150);
  
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(x,y,1600,10);
  
  ctx.fillStyle = "#FF8181";
  ctx.fillRect(x,y,(1600 * playing.progress) - 5,10);
  
  ctx.beginPath();
  ctx.moveTo(x+(1600 * playing.progress)-4,y+5);
  ctx.fillStyle = darken("#FF8181",1-0.05);
  ctx.arc(x+(1600 * playing.progress)-4,y+5, 8,0,Math.PI * 2);
  ctx.closePath();
  ctx.fill();
  
  ctx.drawImage(icons.get("Back")![1],x+655,y+34);
  ctx.drawImage(icons.get("Play")![1],x+769,y+34);
  ctx.drawImage(icons.get("Next")![1],x+872,y+34);
  
  
}