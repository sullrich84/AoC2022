import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 13")

/// Part 1

function compare(left, right) {
  if (_.isNumber(left) && _.isNumber(right)) {
    return left === right ? null : left < right ? true : false
  }

  if (_.isNumber(left)) {
    return compare([left], right)
  }

  if (_.isNumber(right)) {
    return compare(left, [right])
  }

  for (let i = 0; i < _.min([left.length, right.length]); i++) {
    const res = compare(left[i], right[i])
    if (res !== null) return res
  }

  return left.length === right.length ? null : left.length < right.length
}

const solve1 = ([left, right]) => compare(left, right)

const sRes1 = _.sum(sample.map(solve1).map((res, idx) => (res ? idx + 1 : 0)))
const res1 = _.sum(data.map(solve1).map((res, idx) => (res ? idx + 1 : 0)))

console.log("Sample:", sRes1, "Task:", res1)

/// Part 2

const DIVIDER_A = [[2]]
const DIVIDER_B = [[6]]

const solve2 = (input) =>
  [..._.flatten(input), DIVIDER_A, DIVIDER_B]
    .sort((left, right) => {
      const sorted = compare(left, right)
      return sorted === null ? 0 : sorted ? -1 : 1
    })
    .map((e, idx) => {
      if (e === DIVIDER_A || e === DIVIDER_B) return idx + 1
      else return null
    })
    .filter((e) => e !== null)
    .reduce((acc, val) => acc * val, 1)

const sRes2 = solve2(sample)
const res2 = solve2(data)

console.log("Sample:", sRes2, "Task:", res2)
