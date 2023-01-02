import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 15: Beacon Exclusion Zone")

/// Part 1

const solve1 = (ctx) => {
  const search = []

  ctx.data.forEach(([sx, sy, bx, by]) => {
    var c = 0
    var distance = Math.abs(bx - sx) + Math.abs(by - sy)
    const [vMin, vMax] = [sy - distance, sy + distance]

    if (vMin <= ctx.target && vMax >= ctx.target) {
      for (var v = sy - distance; v <= sy + distance; v++) {
        if (v === ctx.target) {
          const [xMin, xMax] = [sx - c, sx + c]
          if (!search[v]) search[v] = []
          search[v].min = _.min([xMin, search[v].min])
          search[v].max = _.max([xMax, search[v].max])
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

console.log("Sample:", [{ data: sample, target: 10 }].map(solve1))
console.log("Task:", [{ data: data, target: 2000000 }].map(solve1))

/// Part 2

const solve2 = (ctx) => {
  const search = []

  ctx.data.forEach(([sx, sy, bx, by]) => {
    var c = 0
    var distance = Math.abs(bx - sx) + Math.abs(by - sy)

    for (var v = sy - distance; v <= sy + distance; v++) {
      if (v >= 0 && v <= ctx.target) {
        const [xMin, xMax] = [sx - c, sx + c]
        if (!search[v]) search[v] = []
        search[v].push([xMin, xMax])
      }

      // Smooth brain couldn't optimize this at 6am
      c = v < sy ? c + 1 : c - 1
    }
  })

  for (var i = 0; i < search.length; i++) {
    var blocks = search[i]

    for (var leapingIndex = 0; leapingIndex < ctx.target; leapingIndex++) {
      // Bring the blocks in order to enable index leaping
      blocks = _.orderBy(blocks, ([x1]) => x1)

      for (var blockIndex = 0; blockIndex < blocks.length; blockIndex++) {
        var [x1, x2] = blocks[blockIndex]

        if (x1 <= leapingIndex && x2 >= leapingIndex) {
          // leaping index falls in block range
          leapingIndex = _.max([x2, leapingIndex])
        } else if (x1 > leapingIndex) {
          // leaping index found a gap
          const [gapX, gapY] = [leapingIndex + 1, i]
          return gapX * 4000000 + gapY
        }
      }
    }
  }
}

console.log("Sample:", [{ data: sample, target: 20 }].map(solve2))
console.log("Task:", [{ data: data, target: 4000000 }].map(solve2))
