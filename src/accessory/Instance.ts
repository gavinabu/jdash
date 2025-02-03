import BlankMenu from "./renderer/BlankMenu";

export default class JHeadInstance {
  protected ctx: CanvasRenderingContext2D;
  menu: BlankMenu = new BlankMenu();
  protected rendering = true;
  
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.render(); // start render loop
  }
  
  render() {
    this.ctx.clearRect(0,0,1600,1200)
    this.menu.render(this.ctx)
    if(this.rendering) requestAnimationFrame(this.render.bind(this));
  }
  
  stop() {
    this.rendering = false;
  }
}