import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 3: Binary Diagnostic")

/// Part 1

const solve1 = ({ data }) => {
  var gammaRate = ""
  var epsilonRate = ""

  for (var i = 0; i < data[0].length; i++) {
    var count = 0
    for (const bit of data) {
      count += bit[i] === 0 ? -1 : +1
    }
    gammaRate += count > 0 ? "1" : "0"
    epsilonRate += count > 0 ? "0" : "1"
  }

  return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2)
}

console.log("Sample:", [{ data: sample }].map(solve1))
console.log("Task:", [{ data: data }].map(solve1))

/// Part 2

const solve2 = ({ data }) => {
  var gammaRate = []
  var epsilonRate = []

  for (var i = 0; i < data[0].length; i++) {
    var count = 0
    for (const bit of data) {
      count += bit[i] === 0 ? -1 : +1
    }
    gammaRate += count > 0 ? "1" : "0"
    epsilonRate += count > 0 ? "0" : "1"
  }

  return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2)
}

console.log("Sample:", [{ data: sample }].map(solve2))
console.log("Task:", [{ data: data }].map(solve2))
