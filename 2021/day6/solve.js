import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 6: Lanternfish")

/// Part 1

const solve = ({ data, days }) => {
  const dict = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 }
  data.forEach((e) => (dict[e] += 1))

  for (var day = 0; day < days; day++) {
    let add = dict[0]
    _.range(0, 8).forEach((k) => (dict[k] = dict[k + 1]))
    dict[6] += add
    dict[8] = add
  }

  return _.sum(Object.values(dict))
}

console.log("Sample:", [{ data: sample, days: 80 }].map(solve))
console.log("Task:", [{ data: data, days: 80 }].map(solve))

/// Part 2

console.log("Sample:", [{ data: sample, days: 256 }].map(solve))
console.log("Task:", [{ data: data, days: 256 }].map(solve))
