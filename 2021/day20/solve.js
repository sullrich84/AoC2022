import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 20: Trench Map")

/// Part 1

const getBinary = (map, [y, x]) => {
  const binary = []
  for (const [dy, dx] of dirs) {
    binary.push(_.get(map, [y + dy, x + dx], 0))
  }

  return parseInt(binary.join(""), 2)
}

// prettier-ignore
const dirs = [
  [-1, -1], [-1, +0], [-1, +1],
  [+0, -1], [+0, +0], [+0, +1],
  [+1, -1], [+1, +0], [+1, +1],
]

const solve1 = ([input, map], loops) => {
  const off = 50
  var result = []
  var thisMap = [...map]

  for (var loop = 0; loop < loops; loop++) {
    const size = thisMap.length
    const nextMap = _.times(size + 2 * off, () => [])

    for (var [y, ny] = [-off, 0]; y < size + off; [y++, ny++]) {
      for (var x = -off; x < size + off; x++) {
        const binaryString = dirs
          .map(([dy, dx]) => [y + dy, x + dx])
          .map((c) => _.get(thisMap, c, 0))
          .join("")
        const binary = parseInt(binaryString, 2)

        if (binary === 0) nextMap[ny].push(0)
        else nextMap[ny].push(input[binary])
      }
    }

    thisMap = result = nextMap
  }

  // result.forEach((row) => console.log(row.join("").replaceAll("0", ".").replaceAll("1", "#")))
  return _.sum(_.flatten(result))
}

console.log("Sample:", solve1(sample, 2))
console.log("Task:", solve1(data, 2))

/// Part 2

// console.log("Sample:", solve1(sample, 50))
// console.log("Task:", solve1(data, 50))
