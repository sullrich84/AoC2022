import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 10")

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

  return _.sum([
    _.find(ctx.states, (state) => state.cycle === 20).strength,
    _.find(ctx.states, (state) => state.cycle === 60).strength,
    _.find(ctx.states, (state) => state.cycle === 100).strength,
    _.find(ctx.states, (state) => state.cycle === 140).strength,
    _.find(ctx.states, (state) => state.cycle === 180).strength,
    _.find(ctx.states, (state) => state.cycle === 220).strength,
  ])
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
