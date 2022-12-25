import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 25")

/// Part 1

const toBase10 = (stringBaseSNAFU) => {
  const SNAFU = { 2: 2, 1: 1, 0: 0, "-": -1, "=": -2 }
  return stringBaseSNAFU
    .split("")
    .map((c, idx, num) => SNAFU[c] * Math.pow(5, num.length - idx - 1))
    .reduce((acc, val) => acc + val, 0)
}

const toBaseSNAFU = (intBase10) => {
  var total = intBase10
  var output = ""

  while (total !== 0) {
    var rem = total % 5
    total = Math.floor(total / 5)

    if (rem <= 2) {
      output = rem.toString() + output
    } else {
      output = "   =-".charAt(rem) + output
      total += 1
    }
  }

  return output
}

const solve1 = ({ data }) => {
  const base10Number = data.map(toBase10)
  const base10Sum = _.sum(base10Number)
  return [base10Sum, toBaseSNAFU(base10Sum)]
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
