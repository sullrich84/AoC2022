import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 6")

/// Part 1

const solve1sample = (__, idx) => idx >= 4 && _.uniq(sample.slice(idx - 4, idx)).length === 4
const solve1data = (__, idx) => idx >= 4 && _.uniq(data.slice(idx - 4, idx)).length === 4

const sRes1 = sample.split("").findIndex(solve1sample)
const res1 = data.split("").findIndex(solve1data)

console.log("Sample:", sRes1, "Task:", res1)

// Part 2

const solve2sample = (__, idx) => idx >= 14 && _.uniq(sample.slice(idx - 14, idx)).length === 14
const solve2data = (__, idx) => idx >= 14 && _.uniq(data.slice(idx - 14, idx)).length === 14

const sRes2 = sample.split("").findIndex(solve2sample)
const res2 = data.split("").findIndex(solve2data)

console.log("Sample:", sRes2, "Task:", res2)
