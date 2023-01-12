import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 17: Trick Shot")

const shoot = ([y, x], [txStart, txEnd], [tyStart, tyEnd]) => {
  var [vy, vx] = [y, x]
  var [py, px] = [0, 0]
  const trajectory = []

  while (true) {
    var [ny, nx] = [py + vy, px + vx]
    trajectory.push([ny, nx])

    // Check if hit
    if (ny <= tyStart && ny >= tyEnd && nx >= txStart && nx <= txEnd) {
      return trajectory
    }

    // Check if missed
    if (nx > txEnd) return "miss"
    if (ny < tyEnd) return "miss"

    // Apply drag
    vx = vx === 0 ? 0 : vx > 0 ? vx - 1 : vx + 1
    vy -= 1

    // Update next position
    ;[py, px] = [ny, nx]
  }
}

/// Part 1

const solve1 = ({ data }) => {
  const [[txStart, txEnd], [tyStart, tyEnd]] = data
  var lastMaxY = 0

  for (var y = 1; y < 100; y++) {
    x: for (var x = txEnd; x > 0; x--) {
      const outcome = shoot([y, x], [txStart, txEnd], [tyStart, tyEnd])
      if (outcome === "miss") continue x

      const maxY = _.max(outcome.map(([y]) => y))
      if (maxY > lastMaxY) {
        lastMaxY = maxY
      }
    }
  }

  return lastMaxY
}

console.log("Sample:", [{ data: sample }].map(solve1))
console.log("Task:", [{ data: data }].map(solve1))

/// Part 2

const solve2 = ({ data }) => {
  const [[txStart, txEnd], [tyStart, tyEnd]] = data
  var hitConfig = []

  for (var y = -100; y < 100; y++) {
    x: for (var x = txEnd; x > 0; x--) {
      const outcome = shoot([y, x], [txStart, txEnd], [tyStart, tyEnd])
      if (outcome === "miss") continue x
      hitConfig.push([y, x])
    }
  }

  return hitConfig.length
}

console.log("Sample:", [{ data: sample }].map(solve2))
console.log("Task:", [{ data: data }].map(solve2))
