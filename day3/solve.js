import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 3")

/// Part 1

function calcPrio(input) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  const isLower = input === input.toLowerCase()
  return (isLower ? alphabet : alphabet.toUpperCase()).indexOf(input) + (isLower ? 1 : 27)
}

const solve1 = (content) => {
  const comp = _.chunk(content, content.length / 2)
  const common = _.first(_.intersection(comp[0], comp[1]))
  return calcPrio(common)
}

const sRes1 = _.sum(sample.map(solve1))
const res1 = _.sum(data.map(solve1))

console.log("Sample:", sRes1, "Task:", res1)

/// Part 2

const solve2 = ([r1, r2, r3]) => {
  const common = _.first(_.intersection([...r1], [...r2], [...r3]))
  return calcPrio(common)
}

const sRes2 = _.sum(_.chunk(sample, 3).map(solve2))
const res2 = _.sum(_.chunk(data, 3).map(solve2))

console.log("Sample:", sRes2, "Task:", res2)
