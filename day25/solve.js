import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 25")

/// Part 1

const toBase10 = (snafuNum) => {
  const SNAFU = { 2: 2, 1: 1, 0: 0, "-": -1, "=": -2 }
  return snafuNum
    .split("")
    .map((c, idx, num) => SNAFU[c] * Math.pow(5, num.length - idx - 1))
    .reduce((acc, val) => acc + val, 0)
}

const toSNAFU = (snafuNum) => {
  const SNAFU = { 2: 2, 1: 1, 0: 0, "-": -1, "=": -2 }
  return snafuNum
    .split("")
    .map((c, idx, num) => SNAFU[c] * Math.pow(5, num.length - idx - 1))
    .reduce((acc, val) => acc + val, 0)
}

const solve1 = ({ data }) => {
  return _.sum(data.map(toBase10))
}

console.log("Sample:", [{ data: sample }].map(solve1))
console.log("Task:", [{ data: data }].map(solve1))

/// Part 2

const solve2 = (input) => {
  console.log(input)
  return 0
}

// console.log("Sample:", [{ data: sample }].map(solve2))
// console.log("Task:", [{ data: data }].map(solve2))
