import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 3: Binary Diagnostic")

/// Part 1

const solve1 = ({ data }) => {
  var gammaRate = ""
  var epsilonRate = ""
  const half = data.length / 2

  for (var i = 0; i < data[0].length; i++) {
    var count = _.sum(data.map((r) => r[i]))
    gammaRate += count > half ? 1 : 0
    epsilonRate += count > half ? 0 : 1
  }

  return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2)
}

console.log("Sample:", [{ data: sample }].map(solve1))
console.log("Task:", [{ data: data }].map(solve1))

/// Part 2

const solve2 = ({ data }) => {
  var oxygenRate = [...data]
  var co2Rate = [...data]

  for (var i = 0; i < data[0].length; i++) {
    const sum = _.sum(oxygenRate.map((r) => r[i]))
    const bit = sum >= oxygenRate.length / 2 ? 1 : 0
    oxygenRate = oxygenRate.filter((r) => r[i] === bit)
    if (oxygenRate.length === 1) {
      oxygenRate = oxygenRate[0].join("")
      break
    }
  }

  for (var i = 0; i < data[0].length; i++) {
    const sum = _.sum(co2Rate.map((r) => r[i]))
    const bit = sum >= co2Rate.length / 2 ? 0 : 1
    co2Rate = co2Rate.filter((r) => r[i] === bit)
    if (co2Rate.length === 1) {
      co2Rate = co2Rate[0].join("")
      break
    }
  }

  return parseInt(oxygenRate, 2) * parseInt(co2Rate, 2)
}

console.log("Sample:", [{ data: sample }].map(solve2))
console.log("Task:", [{ data: data }].map(solve2))
