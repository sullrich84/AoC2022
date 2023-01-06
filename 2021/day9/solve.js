import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 9: Smoke Basin")

/// Part 1

const locations = [
  [-1, 0], // up
  [+1, 0], // down
  [0, -1], // left
  [0, +1], // right
]

const solve1 = ({ data }) => {
  var riskLevel = 0

  for (var y = 0; y < data.length; y++) {
    for (var x = 0; x < data[0].length; x++) {
      const height = data[y][x]
      const adjacents = locations.map(([ly, lx]) => _.get(data, [ly + y, lx + x], 9))
      const lowPoint = adjacents.reduce((p, c) => p && height < c, true)
      if (lowPoint) riskLevel += height + 1
    }
  }

  return riskLevel
}

console.log("Sample:", [{ data: sample }].map(solve1))
console.log("Task:", [{ data: data }].map(solve1))

/// Part 2

const solve2 = ({ data }) => {
  const basins = []

  for (var y = 0; y < data.length; y++) {
    for (var x = 0; x < data[0].length; x++) {
      const height = data[y][x]
      const adjacents = locations.map(([ly, lx]) => _.get(data, [ly + y, lx + x], 9))
      const lowPoint = adjacents.reduce((p, c) => p && height < c, true)
      if (!lowPoint) continue

      const basin = []
      const cache = {}
      const stack = locations.map(([ly, lx]) => [ly + y, lx + x, height])

      while (stack.length > 0) {
        const [y, x, pHeight] = stack.pop()
        const key = [y, x].join(":")
        const height = _.get(data, [y, x], 9)

        if (key in cache || height >= 9 || pHeight >= height) continue
        cache[key] = true
       
        basin.push(height)
        for (const [ly, lx] of locations) stack.push([ly + y, lx + x])
      }

      basins.push(basin.length)
    }
  }

  basins.sort((a, b) => b - a)
  return _.take(basins, 3).reduce((p, c) => p * c, 1)
}

console.log("Sample:", [{ data: sample }].map(solve2))
console.log("Task:", [{ data: data }].map(solve2))
