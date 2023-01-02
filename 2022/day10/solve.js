import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 10: Cathode-Ray Tube")

/// Part 1

const solve1 = (ctx) => {
  ctx.data.map(([cmd, val]) => {
    ctx.cycle += 1

    if (ctx.register) {
      ctx.X += ctx.register
    }

    const updateState = () => ctx.states.push({ ...ctx, strength: ctx.cycle * ctx.X })

    if (cmd === "addx") {
      ctx.register = val
      updateState()

      ctx.cycle += 1
      updateState()
    } else {
      ctx.register = null
      updateState()
    }
  })

  return ctx.states
    .filter(({ cycle }) => [20, 60, 100, 140, 180, 220].includes(cycle))
    .map(({ strength }) => strength)
    .reduce((a, v) => a + v)
}

const sRes1 = [{ data: sample, cycle: 0, X: 1, states: [] }].map(solve1)
const res1 = [{ data: data, cycle: 0, X: 1, states: [] }].map(solve1)

console.log("Sample:", sRes1, "Task:", res1)

/// Part 2

const solve2 = (ctx) => {
  const crt = _.times(6, () => _.times(40, () => "."))

  const drawPixel = () => {
    const row = Math.floor((ctx.cycle - 1) / 40)
    const pos = (ctx.cycle - 1) % 40
    crt[row][pos] = _.inRange(pos, ctx.X - 1, ctx.X + 2) ? "█" : " "
  }

  ctx.data.map(([cmd, val]) => {
    ctx.cycle += 1

    if (ctx.register) {
      ctx.X += ctx.register
    }

    const updateState = () => ctx.states.push({ ...ctx })

    if (cmd === "addx") {
      ctx.register = val
      updateState()
      drawPixel()

      ctx.cycle += 1
      updateState()
      drawPixel()
    } else {
      ctx.register = null
      updateState()
      drawPixel()
    }
  })

  return crt.map((line) => line.join(""))
}

const sRes2 = _.flatten([{ data: sample, cycle: 0, X: 1, states: [] }].map(solve2))
const res2 = _.flatten([{ data: data, cycle: 0, X: 1, states: [] }].map(solve2))

console.log("Sample:\n", sRes2, "\nTask:\n", res2)
