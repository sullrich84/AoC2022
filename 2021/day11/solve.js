import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 11: Dumbo Octopus")

/// Part 1

// prettier-ignore
const dir = [
  [-1, -1], [-1, 0], [-1, +1],
  [ 0, -1],          [ 0, +1],
  [+1, -1], [+1, 0], [+1, +1],
]

const solve1 = ({ data, steps }) => {
  var flashes = 0

  for (var step = 0; step < steps; step++) {
    const stack = []
    const seen = []

    for (var y = 0; y < data.length; y++) {
      for (var x = 0; x < data.length; x++) {
        if (data[y][x] === 9) stack.push([y, x])
        else data[y][x] += 1
      }
    }

    while (stack.length > 0) {
      const [y, x] = stack.pop()

      const key = [y, x].join(":")
      if (seen.includes(key)) continue
      seen.push(key)

      data[y][x] = 0
      flashes += 1

      for (const [dy, dx] of dir) {
        const [ay, ax] = [dy + y, dx + x]
        if (_.get(data, [ay, ax]) === undefined || seen.includes([ay, ax].join(":"))) continue
        if (data[ay][ax] === 9) stack.unshift([ay, ax])
        else data[ay][ax] += 1
      }
    }
  }

  return flashes
}

console.log("Sample:", [{ data: sample, steps: 100 }].map(solve1))
console.log("Task:", [{ data: data, steps: 100 }].map(solve1))

/// Part 2

const solve2 = ({ data }) => {
  for (var step = 1; true; step++) {
    const stack = []
    const seen = []
    var flashes = 0

    for (var y = 0; y < data.length; y++) {
      for (var x = 0; x < data.length; x++) {
        if (data[y][x] === 9) stack.push([y, x])
        else data[y][x] += 1
      }
    }

    while (stack.length > 0) {
      const [y, x] = stack.pop()

      const key = [y, x].join(":")
      if (seen.includes(key)) continue
      seen.push(key)

      data[y][x] = 0
      flashes += 1

      for (const [dy, dx] of dir) {
        const [ay, ax] = [dy + y, dx + x]
        if (_.get(data, [ay, ax]) === undefined || seen.includes([ay, ax].join(":"))) continue
        if (data[ay][ax] === 9) stack.unshift([ay, ax])
        else data[ay][ax] += 1
      }
    }

    if (flashes === 100) return step
  }
}

console.log("Sample:", [{ data: sample }].map(solve2))
console.log("Task:", [{ data: data }].map(solve2))
