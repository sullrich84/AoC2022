import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 1: Sonar Sweep")

/// Part 1

const solve1 = ({ data }) => {
  return data.map((val, idx) => (val < _.get(data, idx + 1, val) ? 1 : 0)).reduce((acc, val) => acc + val, 0)
}

console.log("Sample:", [{ data: sample }].map(solve1))
console.log("Task:", [{ data: data }].map(solve1))

/// Part 2

const solve2 = ({ data }) => {
  return data
    .map((val, idx, input) => val + _.get(input, idx + 1, 0) + _.get(input, idx + 2, 0))
    .map((val, idx, input) => (val < _.get(input, idx + 1, val) ? 1 : 0))
    .reduce((acc, val) => acc + val, 0)
}

console.log("Sample:", [{ data: sample }].map(solve2))
console.log("Task:", [{ data: data }].map(solve2))
