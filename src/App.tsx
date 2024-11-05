import { useEffect, useRef, useState } from "react"
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants"
import Game from "./objects/game"
import Ui from "./objects/ui"


export default function App() {
   const ref = useRef<null | HTMLCanvasElement>(null)
   const [game, setGame] = useState<Game | null>(null)

   useEffect(() => {
      if(ref.current !== null){
         const context = ref.current.getContext("2d")

         if(context === null){
            return
         }

         const game = new Game(context, ref.current)
         const ui = new Ui(context)




         setInterval(() => {
            context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
            game.draw()
            ui.draw()
         }, 1000 / 12)
      }
   }, [ref])

   return (
      <div className="flex items-center flex-col gap-4">
         {game !== null && (
            <h3 className="text-3xl font-bold select-none">
               Sıra: {game.next}
            </h3>
         )}
         <canvas
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            ref={ref}
            className="border border-black"/>
      </div>
   );
}
