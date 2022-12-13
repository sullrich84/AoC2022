import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 13")

/// Part 1

const compare = (left, right) => {
  console.log(`Compare ${JSON.stringify(left)} vs. ${JSON.stringify(right)}`)

  if (_.isInteger(left) && _.isInteger(right)) {
    // If both values are integers, the lower integer should come first. If the left integer is lower
    // than the right integer, the inputs are in the right order. If the left integer is higher than
    // the right integer, the inputs are not in the right order. Otherwise, the inputs are the same
    // integer; continue checking the next part of the input.

    if (left < right) {
      // If the left integer is lower than the right integer, the inputs are in the right order.
      return true
    }

    if (left > right) {
      // If the left integer is higher than the right integer, the inputs are not in the right order
      return false
    }

    if (left == right) {
      //Inputs are the same integer; continue checking the next part of the input.
      return null
    }
  }

  // if (!_.isUndefined(left) && _.isUndefined(right)) {
  //   // Right side ran out of items, so inputs are not in the right order
  //   return false
  // }

  // if (_.isUndefined(left) && !_.isUndefined(right)) {
  //   // Left side ran out of items, so inputs are in the right order
  //   return true
  // }

  if (_.isArray(left) && _.isArray(right)) {
    // If both values are lists, compare the first value of each list, then the second value, and so on.
    // If the left list runs out of items first, the inputs are in the right order. If the right list
    // runs out of items first, the inputs are not in the right order. If the lists are the same length
    // and no comparison makes a decision about the order, continue checking the next part of the input.
    return compareLists(left, right)
  }

  if ((_.isInteger(left) && _.isArray(right)) || (_.isArray(left) && _.isInteger(right))) {
    // If exactly one value is an integer, convert the integer to a list which contains that integer as its
    // only value, then retry the comparison. For example, if comparing [0,0,0] and 2, convert the right
    // value to [2] (a list containing 2); the result is then found by instead comparing [0,0,0] and [2].

    if (_.isInteger(left) && _.isArray(right)) {
      // If the left list runs out of items first, the inputs are in the right order.
      return left < _.first(right)
    }

    if (_.isArray(left) && _.isInteger(right)) {
      // If the right list runs out of items first, the inputs are not in the right order.
      // [1,1,1,1] vs [1]

      return _.first(left) < right
    }
  }

  throw "Unhandled case"
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
