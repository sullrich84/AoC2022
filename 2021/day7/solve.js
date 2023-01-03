import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 7: The Treachery of Whales")

/// Part 1

const solve1 = ({ data }) => {
  const points = data
  var diffs = []

  for (var i = 0; i < data.length; i++) {
    diffs[i] = 0
    for (const point of points) {
      diffs[i] += Math.abs(point - data[i])
    }
  }

  return _.min(diffs)
}

console.log("Sample:", [{ data: sample }].map(solve1))
console.log("Task:", [{ data: data }].map(solve1))

/// Part 2

const solve2 = ({ data }) => {
  const range = _.range(_.min(data), _.max(data) + 1)
  var diffs = []

  const cache = {}
  const partialSum = (n) => {
    if (n in cache) return cache[n]
    const sum = _.sum(_.range(1, n + 1))
    cache[n] = sum
    return sum
  }

  for (const r of range) {
    var diff = 0
    for (const p of data) diff += partialSum(Math.abs(p - r))
    diffs.push(diff)
  }

  return _.min(diffs)
}

console.log("Sample:", [{ data: sample }].map(solve2))
console.log("Task:", [{ data: data }].map(solve2))
