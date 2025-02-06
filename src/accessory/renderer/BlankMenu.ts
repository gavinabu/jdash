import {getColor} from "../Color";

export default class BlankMenu {
  id: string = "blank";
  name: string = "Blank";
  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = getColor("BG");
    ctx.fillRect(0,0,1600,1200)
  }
}