import BlankMenu from "../renderer/BlankMenu";
import ComputerBridge from "../../constant/ComputerBridge";
import sidePanel from "../components/SidePanel";
import bottomBar from "../components/BottomBar";

export default class MainMenu extends BlankMenu {
  render(ctx: CanvasRenderingContext2D) {
    super.render(ctx);
    sidePanel(ctx,0,0);
    bottomBar(ctx,0,1050)
  }
}