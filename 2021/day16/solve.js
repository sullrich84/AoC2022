import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 16: Packet Decoder")

String.prototype.toBinary = function (size = 4) {
  return _.padStart(parseInt(this, 16).toString(2), size, 0)
}

/// Part 1

const solve1 = ({ data }) => {
  const binary = _.flatten(data.map((e) => e.toString().toBinary().split("")))

  

  return binary
}

console.log("Sample:", [{ data: sample }].map(solve1))
// console.log("Task:", [{ data: data }].map(solve1))

/// Part 2

const solve2 = ({ data }) => {
  return 0
}

// console.log("Sample:", [{ data: sample }].map(solve2))
// console.log("Task:", [{ data: data }].map(solve2))
