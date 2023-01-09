import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 15: Chiton")

/// Part 1

const calcDist = ([ay, ax], [by, bx]) => {
  return Math.abs(ay - by) + Math.abs(ax - bx)
}

const solve1 = ({ data }) => {
  const h = data.length
  const w = data[0].length

  const dirs = [
    [-1, 0],
    [0, -1],
    [0, +1],
    [+1, 0],
  ]

  const start = [0, 0]
  const finish = [h - 1, w - 1]

  const stack = []
  const visited = {}

  var minRisk = 734

  stack.push([start, finish, 0])

  loop: while (stack.length > 0) {
    const [[py, px], [dy, dx], risk] = stack.pop()

    const key = [py, px].join()
    if (key in visited && visited[key] < risk) continue loop
    visited[key] = risk

    if (risk > minRisk) continue loop

    if (py === dy && px === dx) {
      minRisk = Math.min(risk, minRisk)
      continue loop
    }

    dirs: for (const [y, x] of dirs) {
      const [ny, nx] = [py + y, px + x]
      const nRisk = _.get(data, [ny, nx], null)
      if (nRisk === null) continue dirs
      stack.push([[ny, nx], [dy, dx], risk + nRisk])
    }

    // Sort stack to priorize shortest distances
    stack.sort((a, b) => {
      return b[2] - a[2]
    })
  }

  return minRisk
}

console.log("Sample:", [{ data: sample }].map(solve1))
console.log("Task:", [{ data: data }].map(solve1))

/// Part 2

const solve2 = ({ data }) => {
  return 0
}

// console.log("Sample:", [{ data: sample }].map(solve2))
// console.log("Task:", [{ data: data }].map(solve2))
