import _ from "lodash"
import { dStack, dMap, sStack, sMap } from "./data.js"

console.log("🎄 Day 5")

/// Part 1

sMap.forEach(([s, f, t]) => sStack[--t].push(...sStack[--f].splice(-s).reverse()))
dMap.forEach(([s, f, t]) => dStack[--t].push(...dStack[--f].splice(-s).reverse()))

const sRes1 = _.sum(sStack.map((arr) => _.last(arr)))
const res1 = _.sum(dStack.map((arr) => _.last(arr)))

console.log("Sample:", sRes1, "Task:", res1)

/// Part 2

sMap.forEach(([s, f, t]) => sStack[--t].push(...sStack[--f].splice(-s)))
dMap.forEach(([s, f, t]) => dStack[--t].push(...dStack[--f].splice(-s)))

const sRes2 = _.sum(sStack.map((arr) => _.last(arr)))
const res2 = _.sum(dStack.map((arr) => _.last(arr)))

console.log("Sample:", sRes2, "Task:", res2)
