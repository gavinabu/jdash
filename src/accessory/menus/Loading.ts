import BlankMenu from "../renderer/BlankMenu";
import {drawText} from "../renderer/TextRenderer";


export default class LoadingMenu extends BlankMenu {
  private splash = document.createElement("img")
  private spinner = document.createElement("img")
  private splashReady = false;
  private spinnerReady = false;
  constructor() {
    super();
    this.splash.src = "./media/Splash.png";
    this.spinner.src = "./media/LoadingSpinner.svg";
    this.splash.onload = () => {this.splashReady = true}
    this.spinner.onload = () => {this.spinnerReady = true}
  }
  render(ctx: CanvasRenderingContext2D) {
    if(this.splashReady) ctx.drawImage(this.splash,0,0,1600,1200)
    if(this.spinnerReady) {
      ctx.save();
      ctx.translate(800, 1000);
      ctx.rotate(Math.PI * (performance.now() / 400));
      ctx.drawImage(this.spinner, -48, -48, 96, 96);
      ctx.restore();
    }
  }
}