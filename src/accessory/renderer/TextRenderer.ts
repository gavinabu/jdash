export function drawText(ctx: CanvasRenderingContext2D,text:string,x: number,y: number,fontSize: number,font: string,color: string,align?: ["left"|"center"|"right","top"|"center"|"bottom"], bold?: boolean) {
  ctx.font = `${bold ? 'bold ' : ''}${fontSize}px ${font}`;
  ctx.fillStyle = color;
  switch((align || [])[1]) {
    case "center": {
      ctx.textBaseline = "middle"
      break;
    }
    case "top": {
      ctx.textBaseline = "top"
      break
    }
    case "bottom": {
      ctx.textBaseline = "bottom"
      break;
    }
  }
  let m = ctx.measureText(text);
  let newX = x
  switch((align || [])[0]) {
    case "center": {
      ctx.textBaseline = "middle"
      ctx.textAlign = "center"
      break;
    }
    case "left": {
      newX += m.width / 2
      break
    }
    case "right": {
      newX -= m.width / 2
      break;
    }
  }
  ctx.fillText(text,newX,y)
}