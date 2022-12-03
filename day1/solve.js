import _ from "lodash"
import data from "./data.js"

console.log("🎄 Day 1")

/// Part 1

const res1 = _.max(_.map(data, _.sum))
console.log("Part 1:", res1)

/// Part 2

const res2 = _.sum(_.take(_.sortBy(_.map(data, _.sum)).reverse(), 3))
console.log("Part 2:", res2)
