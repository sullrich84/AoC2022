import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 1")

/// Part 1

const solve1 = (data) => _.max(_.map(data, _.sum))

console.log("Sample:", solve1(sample))
console.log("Task:", solve1(data))

/// Part 2

const solve2 = (data) => _.sum(_.take(_.sortBy(_.map(data, _.sum)).reverse(), 3))

console.log("Sample:", solve2(sample))
console.log("Task:", solve2(data))
