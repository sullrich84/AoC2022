import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 15: Chiton")

/// Part 1

const solve1 = ({ data }) => {
  const h = data.length
  const w = data[0].length

  const dirs = [
    [+1, 0], // down
    [0, +1], // right
    [-1, 0], // up
    [0, -1], // left
  ]

  const start = [0, 0]
  const finish = [h - 1, w - 1]

  const stack = []
  const visited = {}

  var minRisk = Number.POSITIVE_INFINITY
  stack.push([start, finish, 0])

  dfs: while (stack.length > 0) {
    const [[py, px], [dy, dx], risk] = stack.pop()

    const key = [py, px].join()
    if (key in visited) continue dfs
    visited[key] = risk

    if (py === dy && px === dx) {
      minRisk = risk
      break dfs
    }

    dirs: for (const [y, x] of dirs) {
      const [ny, nx] = [py + y, px + x]
      const nRisk = _.get(data, [ny, nx], null)
      if (nRisk === null) continue dirs
      stack.push([[ny, nx], [dy, dx], risk + nRisk])
    }

    // Priorize by sorting risk descending (lowest risk last)
    stack.sort((a, b) => b[2] - a[2])
  }

  return minRisk
}

console.log("Sample:", [{ data: sample }].map(solve1))
console.log("Task:", [{ data: data }].map(solve1))

/// Part 2

const solve2 = ({ data }) => {
  const h = data.length
  const w = data[0].length
  const data5x = _.times(h * 5, (y) => _.times(w * 5, (x) => data[y % h][x % w]))

  for (var y = 0; y < data.length * 5; y++) {
    for (var x = 0; x < data[0].length * 5; x++) {
      if (y < h && x < w) continue
      const [my, mx] = [y % h, x % w]
      const val = data[my][mx]
      data5x[y][x] = ((val + (Math.floor(x / w) + Math.floor(y / h)) - 1) % 9) + 1
    }
  }

  return solve1({ data: data5x })
}

console.log("Sample:", [{ data: sample }].map(solve2))
console.log("Task:", [{ data: data }].map(solve2))
