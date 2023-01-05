import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 8: Seven Segment Search")

/// Part 1

const solve1 = ({ data }) => {
  var digits = 0

  for (const [_unique, easy] of data) {
    digits += easy.map((e) => e.length).filter((l) => [2, 4, 3, 7].includes(l)).length
  }

  return digits
}

console.log("Sample:", [{ data: sample }].map(solve1))
console.log("Task:", [{ data: data }].map(solve1))

/// Part 2

const solve2 = ({ data }) => {
  var digits = 0

  for (const [unique, easy] of data) {
    const signals = _.uniq([...unique, ...easy].map((e) => e.split("").sort().join("")))
    const sd069 = signals.filter((e) => e.length === 6)
    const sd235 = signals.filter((e) => e.length === 5)

    const sd1 = signals.find((e) => e.length === 2)
    const sd4 = signals.find((e) => e.length === 4)
    const sd7 = signals.find((e) => e.length === 3)
    const sd8 = signals.find((e) => e.length === 7)

    const sd6 = sd069.filter((e) => _.intersection(e.split(""), sd1.split("")).length === 1).join()
    const sd0 = sd069.filter((e) => e !== sd6 && _.intersection(e.split(""), sd4.split("")).length === 3).join()
    const sd9 = sd069.filter((e) => e !== sd6 && e !== sd0).join()

    const sd3 = sd235.filter((e) => _.intersection(e.split(""), sd1.split("")).length === 2).join()
    const sd5 = sd235.filter((e) => e !== sd3 && _.intersection(e.split(""), sd4.split("")).length === 3).join()
    const sd2 = sd235.filter((e) => e !== sd3 && e !== sd5).join()

    const lookupTable = [sd0, sd1, sd2, sd3, sd4, sd5, sd6, sd7, sd8, sd9]
    digits += parseInt(easy.map((e) => lookupTable.indexOf(e.split("").sort().join(""))).join(""))
  }

  return digits
}

console.log("Sample:", [{ data: sample }].map(solve2))
console.log("Task:", [{ data: data }].map(solve2))
