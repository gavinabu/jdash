import BlankMenu from "../renderer/BlankMenu";

export default class MainMenu extends BlankMenu {
  render(ctx: CanvasRenderingContext2D) {
    super.render(ctx);
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0,0,500,1200);
    ctx.fillStyle = "#dfdfdf";
    ctx.fillRect(0,0,500,150);
    ctx.font= "80px Orbitron";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.fillText(`0`, 250, 59+25);
    ctx.font= "bold 30px Orbitron";
    ctx.fillText(localStorage.getItem("unit.metricDistance") === 'true' ? 'kmh' : 'mph', 250, 59+25+38);
  }
}