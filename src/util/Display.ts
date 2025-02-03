// import {execSync} from 'child_process'
let displayON: boolean | undefined;

export function isDisplayON() {
  if((window as any).DEV) displayON = true;
  // if(displayON === undefined) displayON = execSync('vcgencmd display_power', {encoding:'utf8'}).split("=")[1] === '1'
  return displayON;
}

export function turnDisplayOn() {
  if((window as any).DEV) return;
  // execSync('vcgencmd display_power 1');
  displayON = true;
}

export function turnDisplayOff() {
  if((window as any).DEV) return;
  // execSync('vcgencmd display_power 0');
  displayON = false;
}