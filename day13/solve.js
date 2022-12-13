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
    // Left is Integer while right is array
    // console.log(`Mixed content; converting left ${JSON.stringify(left)}`)
    return compareLists([left], right)
  }

  if (_.isArray(left) && _.isInteger(right)) {
    // Left is Array while right is Integer
    // console.log(`Mixed content; converting right ${JSON.stringify(right)}`)
    return compareLists(_.take(left, 1), [right])
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
const res1 = 0 //_.sum(data.map(solve1).map((res, idx) => (res ? idx + 1 : 0)))

console.log("Sample:", sRes1, "Task:", res1)

/// Part 2

const solve2 = (input) => {
  console.log(input)
  return 0
}

const sRes2 = 0 //_.sum(sample.map(solve2))
const res2 = 0 //_.sum(data.map(solve2))

console.log("Sample:", sRes2, "Task:", res2)
