import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 25: Full of Hot Air")

/// Part 1

const toBase10 = (stringBaseSnafu) => {
  const SNAFU = { 2: 2, 1: 1, 0: 0, "-": -1, "=": -2 }
  return stringBaseSnafu
    .split("")
    .map((c, idx, num) => SNAFU[c] * Math.pow(5, num.length - idx - 1))
    .reduce((acc, val) => acc + val, 0)
}

const toBaseSnafu = (intBase10) => {
  var snafuString = ""

  while (intBase10 !== 0) {
    var remainder = intBase10 % 5
    intBase10 = Math.floor(intBase10 / 5)
    snafuString = "012=-".charAt(remainder) + snafuString
    if (remainder > 2) intBase10 += 1
  }

  return snafuString
}

const solve1 = ({ data }) => {
  const base10Number = data.map(toBase10)
  const base10Sum = _.sum(base10Number)
  return [base10Sum, toBaseSnafu(base10Sum)]
}

console.log("Sample:", [{ data: sample }].map(solve1))
console.log("Task:", [{ data: data }].map(solve1))
