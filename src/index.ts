import JHeadInstance from "./accessory/Instance";
import LoadingMenu from "./accessory/menus/Loading";
import MainMenu from "./accessory/menus/Main";
import {turnDisplayOn} from "./util/Display";
import ComputerBridge from "./constant/ComputerBridge";
turnDisplayOn(); // for testing

let currentInstance = new JHeadInstance((document.getElementById("display") as HTMLCanvasElement).getContext("2d")!);
ComputerBridge.create();
(async () => {
  currentInstance.menu = new LoadingMenu();
  setTimeout(() => {
    currentInstance.menu = new MainMenu();
  },(window as any).DEV ? 0 : 750)
})();