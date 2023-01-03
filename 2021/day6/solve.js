import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 6: Lanternfish")

/// Part 1

const solve1 = ({ data }) => {
  var state = [...data]

  for (var day = 0; day < 80; day++) {
    const add = []
    state = state
      .map((f) => f - 1)
      .map((f) => {
        if (f >= 0) return f
        add.push(8)
        return 6
      })
    state.push(...add)
  }

  return state.length
}

console.log("Sample:", [{ data: sample }].map(solve1))
console.log("Task:", [{ data: data }].map(solve1))

/// Part 2

const solve2 = ({ data }) => {
  return 0
}

console.log("Sample:", [{ data: sample }].map(solve2))
console.log("Task:", [{ data: data }].map(solve2))
