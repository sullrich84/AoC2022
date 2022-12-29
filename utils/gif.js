import GIFEncode from "gif-encoder-2"
import { createCanvas } from "canvas"
import { writeFile } from "fs"

const buildEncoder = (width, height, tick) => {
  const encoder = new GIFEncode(width, height)
  encoder.setDelay(tick)
  return encoder
}

export const makeGif = (data, filename, tick) => {
  const factor = 15
  const [width, height] = [data[0][0].length * factor, data[0].length * factor]

  const canvas = createCanvas(width, height).getContext("2d")
  const encoder = buildEncoder(width, height, tick)
  encoder.start(width, height, tick)

  for (const snapshot of data) {
    canvas.fillStyle = "#ffffff"
    canvas.fillRect(0, 0, width, height)

    for (const [y, line] of snapshot.entries()) {
      for (const [x, tile] of line.entries()) {
        if (tile === "#") canvas.fillStyle = "#888c8d"
        else if (tile === ".") canvas.fillStyle = "#ffffff"
        else if (tile === "E") canvas.fillStyle = "#ff0000"
        else canvas.fillStyle = "#1560bd"
        canvas.fill(x * factor, y * factor, factor, factor)
      }
    }

    encoder.addFrame(canvas)
  }

  encoder.finish()
  writeFile(filename, encoder.out.getData(), console.error)
}
