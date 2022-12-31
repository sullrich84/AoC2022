import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 4: Camp Cleanup")

/// Part 1

const solve1 = ([[s1s, s1e], [s2s, s2e]]) => ((s1s <= s2s && s1e >= s2e) || (s2s <= s1s && s2e >= s1e) ? 1 : 0)

const sRes1 = _.sum(sample.map(solve1))
const res1 = _.sum(data.map(solve1))

console.log("Sample:", sRes1, "Task:", res1)

/// Part 2

const solve2 = ([[s1s, s1e], [s2s, s2e]]) => (s1e < s2s || s2e < s1s ? 0 : 1)

const sRes2 = _.sum(sample.map(solve2))
const res2 = _.sum(data.map(solve2))

console.log("Sample:", sRes2, "Task:", res2)
