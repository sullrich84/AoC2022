import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 15")

function drawMap(map) {
  console.clear()
  map.forEach((row) => {
    console.log(row.join(""))
  })
}

/// Part 1

const solve1 = (ctx) => {
  // const minX = _.min(_.flatten(ctx.data.map(([sx, sy, bx, by]) => [sx, bx])))
  // const maxX = _.max(_.flatten(ctx.data.map(([sx, sy, bx, by]) => [sx, bx])))
  // const minY = _.min(_.flatten(ctx.data.map(([sx, sy, bx, by]) => [sy, by])))
  // const maxY = _.max(_.flatten(ctx.data.map(([sx, sy, bx, by]) => [sy, by])))

  // var map = []

  // _.range(minY, maxY + 1).forEach((mx) => {
  //   map[mx] = []
  //   _.range(minX, maxX + 1).forEach((my) => {
  //     map[mx][my] = "."
  //   })
  // })

  // const get = (x, y) => {
  //   return map[y][x]
  // }

  // const set = (x, y, v) => {
  //   map[y][x] = v
  // }

  // ctx.data.forEach(([sx, sy, bx, by]) => {
  //   set(sx, sy, "S") // Set sensor
  //   set(bx, by, "B") // Set beacon
  // })

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
        c = v < sy ? c + 1 : c - 1
      }
    }
  })

  const min = search[ctx.target].min
  const max = search[ctx.target].max
  return min > max ? min - max : max - min
}

const sRes1 = 0// [{ data: sample, target: 10 }].map(solve1)
const res1 = [{ data: data, target: 2000000 }].map(solve1)

console.log("Sample:", sRes1, "Task:", res1)

/// Part 2

// const solve2 = (input) => {
//   console.log(input)
//   return 0
// }

// const sRes2 = 0 //_.sum(sample.map(solve2))
// const res2 = 0 //_.sum(data.map(solve2))

// console.log("Sample:", sRes2, "Task:", res2)
