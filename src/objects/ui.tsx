import { CANVAS_HEIGHT, CANVAS_WIDTH, GRID_SIZE } from "@/constants"

export default class Ui{
   context: null | CanvasRenderingContext2D

   constructor(context: CanvasRenderingContext2D){
      this.context = context
   }

   draw(){
      if(this.context !== null){

         for (let i = 0; i <= CANVAS_WIDTH; i = i + GRID_SIZE){
            this.context.beginPath()
            this.context.moveTo(i, 0)
            this.context.lineTo(i, CANVAS_HEIGHT)
            this.context.stroke();
         }

         for (let i = 0; i <= CANVAS_HEIGHT; i = i + GRID_SIZE){
            this.context.beginPath()
            this.context.moveTo(0, i)
            this.context.lineTo(CANVAS_WIDTH, i)
            this.context.stroke();
         }
      }
   }
}
