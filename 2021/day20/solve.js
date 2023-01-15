import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 20: Trench Map")

// prettier-ignore
const dirs = [
  [-1, -1], [-1, +0], [-1, +1],
  [+0, -1], [+0, +0], [+0, +1],
  [+1, -1], [+1, +0], [+1, +1],
]

const solve = ([input, map], loops) => {
  const off = 2
  var result = []
  var thisMap = [...map]

  for (var loop = 0; loop < loops; loop++) {
    const size = thisMap.length
    const nextMap = _.times(size + 2 * off, () => [])

    for (var [y, ny] = [-off, 0]; y < size + off; [y++, ny++]) {
      for (var x = -off; x < size + off; x++) {
        const fallback = input[0] === 1 && loop % 2 !== 0 ? 1 : 0

        const binaryString = dirs
          .map(([dy, dx]) => [y + dy, x + dx])
          .map((c) => _.get(thisMap, c, fallback))
          .join("")

        nextMap[ny].push(input[parseInt(binaryString, 2)])
      }
    }

    thisMap = result = nextMap
  }

  return _.sum(_.flatten(result))
}

/// Part 1

console.log("Sample:", solve(sample, 2))
console.log("Task:", solve(data, 2))

/// Part 2

console.log("Sample:", solve(sample, 50))
console.log("Task:", solve(data, 50))
