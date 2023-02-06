import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 25: Sea Cucumber")

/// Part 1

function debug(map) {
  return map.map((r) => r.map((e) => [".", ">", "v"][e]).join(""))
}

const solve1 = ({ data }) => {
  const [w, h] = [data[0].length, data.length]

  var steps = 0
  var done = false
  var map = _.cloneDeep(data)

  while (!done) {
    const dMap = debug(map)
    var moved = 0

    var nextMap = _.cloneDeep(map)

    // Move east movers
    for (var y = 0; y < h; y++) {
      for (var x = 0; x < w; x++) {
        const p = _.get(map, [y, x])
        if (p !== 1) continue

        // Move right
        const nx = x + 1 === w ? 0 : x + 1
        const n = _.get(map, [y, nx])
        if (n !== 0) continue

        _.set(nextMap, [y, x], 0)
        _.set(nextMap, [y, nx], 1)
        moved += 1
      }
    }

    var map = _.cloneDeep(nextMap)

    // Move south movers
    for (var y = 0; y < h; y++) {
      for (var x = 0; x < w; x++) {
        const p = _.get(map, [y, x])
        if (p !== 2) continue

        // Move down
        const ny = y + 1 === h ? 0 : y + 1
        const n = _.get(map, [ny, x])
        if (n !== 0) continue

        _.set(nextMap, [y, x], 0)
        _.set(nextMap, [ny, x], 2)
        moved += 1
      }
    }

    map = _.cloneDeep(nextMap)

    steps += 1
    done = moved === 0
  }

  return steps
}

console.log("Sample:", [{ data: sample }].map(solve1))
console.log("Task:", [{ data: data }].map(solve1))

/// Part 2

const solve2 = ({ data }) => {
  return 0
}

// console.log("Sample:", [{ data: sample }].map(solve2))
// console.log("Task:", [{ data: data }].map(solve2))
