import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 15")

/// Part 1

const solve1 = (ctx) => {
  const search = []

  ctx.data.forEach(([sx, sy, bx, by]) => {
    var distance = Math.abs(bx - sx) + Math.abs(by - sy)
    var c = 0

    const vMin = sy - distance // -2
    const vMax = sy + distance // 16
    const inTargetRange = vMin <= ctx.target && vMax >= ctx.target

    if (inTargetRange) {
      for (var v = sy - distance; v <= sy + distance; v++) {
        if (v === ctx.target) {
          const xMin = sx - c
          const xMax = sx + c

          const oldMin = _.get(search, `[${v}].min`, xMin)
          const oldMax = _.get(search, `[${v}].max`, xMax)

          _.set(search, `[${v}].min`, _.min([oldMin, xMin]))
          _.set(search, `[${v}].max`, _.max([oldMax, xMax]))
        }

        // Smooth brain coudn't optimize this at 6am
        c = v < sy ? c + 1 : c - 1
      }
    }
  })

  const min = search[ctx.target].min
  const max = search[ctx.target].max
  return min > max ? min - max : max - min
}

// const sRes1 = [{ data: sample, target: 10 }].map(solve1)
// const res1 = [{ data: data, target: 2000000 }].map(solve1)

// console.log("Sample:", sRes1, "Task:", res1)

/// Part 2

const solve2 = (ctx) => {
  const search = []

  ctx.data.forEach(([sx, sy, bx, by]) => {
    var distance = Math.abs(bx - sx) + Math.abs(by - sy)
    var c = 0

    for (var v = sy - distance; v <= sy + distance; v++) {
      // if (v >= 0 && v <= ctx.target) {
      const xMin = sx - c
      const xMax = sx + c

      // if (xMin >= 0 && xMax <= ctx.target) {
      const oldMin = _.get(search, `[${v}].min`, xMin)
      const oldMax = _.get(search, `[${v}].max`, xMax)

      _.set(search, `[${v}].min`, _.min([oldMin, xMin]))
      _.set(search, `[${v}].max`, _.max([oldMax, xMax]))
      // }
      // }

      // Smooth brain coudn't optimize this at 6am
      c = v < sy ? c + 1 : c - 1
    }
  })

  return search.length
}

const sRes2 = [{ data: sample, target: 20 }].map(solve2)
const res2 = 0 // [{ data: data, target: 4000000 }].map(solve2)

console.log("Sample:", sRes2, "Task:", res2)
