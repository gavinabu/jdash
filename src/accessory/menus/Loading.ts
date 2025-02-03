import BlankMenu from "../renderer/BlankMenu";


export default class LoadingMenu extends BlankMenu {
  private logo = document.createElement("img")
  private logoReady = false;
  constructor() {
    super();
    this.logo.src = "./media/Logo.svg";
    this.logo.onload = () => {this.logoReady = true}
  }
  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.font = '60px Orbitron';
    if(this.logoReady) ctx.drawImage(this.logo,800-400,600-200,800,400)
    ctx.fillText(`Loading${(".".repeat(((Date.now() / 250) % 3)+1))}`, 800,900)
  }
}