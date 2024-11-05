import { GRID_SIZE } from "@/constants"

type Data = string[][]

export default class Game {
   context: null | CanvasRenderingContext2D = null
   canvas: null | HTMLCanvasElement = null
   next: "x" | "o" = "x"
   data: string[][] = [
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""]
   ]

   constructor(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
      this.context = context
      this.canvas = canvas

      this.canvas.addEventListener("click", this.clickHandle)
   }

   clickHandle = (event: React.MouseEvent<HTMLCanvasElement>) => {
      const x = Math.ceil(event.offsetX / GRID_SIZE)
      const y = Math.ceil(event.offsetY / GRID_SIZE)

      // Hücreyi doldur ve sırayı değiştir
      if (this.data[y - 1][x - 1] === "") { // Yalnızca boş hücreye hamle yapılabilir
         this.data[y - 1][x - 1] = this.next == "o" ? "o" : "x"
         this.next = this.next == "x" ? "o" : "x"

         // Her hamleden sonra oyunun bitip bitmediğini kontrol et
         if (this.checkGameOver()) {
            console.log("Bitti")
         }

         // Ekranı yeniden çiz
         this.draw()
      }
   }

   draw() {
      if (this.canvas !== null && this.context !== null) {
         this.data.map((container: string[], containerId: number) => {
            container.map((item: string, itemId: number) => {
               const y = ((containerId + 1) * GRID_SIZE) - GRID_SIZE / 2
               const x = ((itemId + 1) * GRID_SIZE) - GRID_SIZE / 2

               this.context.font = "50px Arial"
               this.context.fillText(item.toUpperCase(), x - 15, y + 15)
            })
         })
      }
   }

   checkGameOver(): boolean {
     const boardSize = this.data.length;

     for (let row = 0; row < boardSize; row++) {
       for (let col = 0; col < boardSize; col++) {
         // Sağdaki üçlü kontrolü (yatay kontrol)
         if (
           col < boardSize - 2 &&
           this.data[row][col] === "x" &&
           this.data[row][col + 1] === "o" &&
           this.data[row][col + 2] === "x"
         ) {
           return true;
         }

         // Aşağıdaki üçlü kontrolü (dikey kontrol)
         if (
           row < boardSize - 2 &&
           this.data[row][col] === "x" &&
           this.data[row + 1][col] === "o" &&
           this.data[row + 2][col] === "x"
         ) {
           return true;
         }

         // Sağ alt çaprazdaki üçlü kontrolü
         if (
           row < boardSize - 2 &&
           col < boardSize - 2 &&
           this.data[row][col] === "x" &&
           this.data[row + 1][col + 1] === "o" &&
           this.data[row + 2][col + 2] === "x"
         ) {
           return true;
         }

         // Sol alt çaprazdaki üçlü kontrolü
         if (
           row < boardSize - 2 &&
           col >= 2 &&
           this.data[row][col] === "x" &&
           this.data[row + 1][col - 1] === "o" &&
           this.data[row + 2][col - 2] === "x"
         ) {
           return true;
         }
       }
     }

     return false;
   }
}
