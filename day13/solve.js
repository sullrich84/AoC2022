import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 13")

/// Part 1

const compare = (left, right) => {
  console.log(`Compare ${JSON.stringify(left)} vs. ${JSON.stringify(right)}`)

  if (!_.isUndefined(left) && _.isUndefined(right)) {
    console.warn("Right side ran out of items")
    return false
  }

  if (_.isUndefined(left) && !_.isUndefined(right)) {
    console.warn("Left side ran out of items")
    return true
  }

  if (_.isUndefined(left) && _.isUndefined(right)) {
    // console.log("Both values empty")
    return true
  }

  if (_.isInteger(left) && _.isInteger(right) && left <= right) {
    // console.log(`left ${left} <= ${right} right`)
    return true
  }

  if (_.isArray(left) && _.isArray(right)) {
    // Both are lists
    return compareLists(left, right)
  }

  if (_.isInteger(left) && _.isArray(right)) {
    // If the left list runs out of items first, the inputs are in the right order.
    if (left == _.first(right)) return true
    return left < _.first(right)
  }

  if (_.isArray(left) && _.isInteger(right)) {
    // If the right list runs out of items first, the inputs are not in the right order.
    return _.first(left) < right
  }

  console.warn(`Missmatch detected => ${JSON.stringify(left)} vs. ${JSON.stringify(right)}`)
  return false
}

const compareLists = (left, right) => {
  console.log(`Compare ${JSON.stringify(left)} vs. ${JSON.stringify(right)}`)
  return _.zipWith(left, right, (l, r) => {
    const result = compare(l, r)
    return result
  }).reduce((acc, val) => acc && val, true)
}

const solve1 = ([left, right], pairNumber) => {
  // console.log(`== Pair ${pairNumber} ==`)
  // console.log(`- Compare ${leftPacket} vs ${rightPacket}`)
  console.log("Comparing pair", pairNumber + 1)
  const result = compareLists(left, right)
  console.log(`Pair ${pairNumber + 1} is`, result ? "sorted" : "unsorted")
  return result
}

const sRes1 = _.sum(sample.map(solve1).map((res, idx) => (res ? idx + 1 : 0)))
const res1 = _.sum(data.map(solve1).map((res, idx) => (res ? idx + 1 : 0))) // > 620

console.log("Sample:", sRes1, "Task:", res1)

/// Part 2

const solve2 = (input) => {
  console.log(input)
  return 0
}

const sRes2 = 0 //_.sum(sample.map(solve2))
const res2 = 0 //_.sum(data.map(solve2))

console.log("Sample:", sRes2, "Task:", res2)
