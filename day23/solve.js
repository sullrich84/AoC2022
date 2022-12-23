import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day X")

/// Part 1

const solve1 = ({ rawData }) => {
  const grid = rawData.map((row) => row.split(""))
  const field = (y, x, def) => (grid[y] ? grid[y][x] || def : def)

  const surr = (y, x) => ({
    N: field(y - 1, x, "."),
    NW: field(y - 1, x - 1, "."),
    NE: field(y - 1, x + 1, "."),

    W: field(y, x - 1, "."),
    E: field(y, x + 1, "."),

    S: field(y + 1, x, "."),
    SW: field(y + 1, x - 1, "."),
    SE: field(y + 1, x + 1, "."),
  })

  for (var round = 0; round < 10; round++) {
    console.log(`Round ${round + 1}`)

    // First half: move elfes
    for (var y = 0; y < grid.length; y++) {
      for (var x = 0; x < grid[0].length; x++) {
        const p = grid[y][x]
        if (p !== "#") continue

        const s = surr(y, x)
        console.log([y, x])
      }
    }

    // Second half: do something
  }

  return 0
}

const sRes1 = [{ rawData: sample }].map(solve1)
const res1 = 0 //[{ data: data }].map(solve1)

console.log("Sample:", sRes1, "Task:", res1)

/// Part 2

const solve2 = (input) => {
  console.log(input)
  return 0
}

const sRes2 = 0 // [{ data: sample }].map(solve2)
const res2 = 0 //[{ data: data }].map(solve2)

console.log("Sample:", sRes2, "Task:", res2)
