import BlankMenu from "../renderer/BlankMenu";
import ComputerBridge from "../../constant/ComputerBridge";
import sidePanel from "../components/SidePanel";

export default class MainMenu extends BlankMenu {
  render(ctx: CanvasRenderingContext2D) {
    super.render(ctx);
    sidePanel(ctx,0,0);
  }
}