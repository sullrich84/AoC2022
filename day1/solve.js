import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 1")

/// Part 1

const sRes1 = _.max(_.map(sample, _.sum))
const res1 = _.max(_.map(data, _.sum))

console.log("Sample:", sRes1, "Task:", res1)

/// Part 2

const sRes2 = _.sum(_.take(_.sortBy(_.map(sample, _.sum)).reverse(), 3))
const res2 = _.sum(_.take(_.sortBy(_.map(data, _.sum)).reverse(), 3))

console.log("Sample:", sRes2, "Task:", res2)
