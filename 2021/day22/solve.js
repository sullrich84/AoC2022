import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 22: Reactor Reboot")

/// Part 1

const solve1 = ({ data }) => {
  const grid = new Set()

  for (const [active, xr, yr, zr] of data) {
    const [xs, xe] = [Math.max(xr[0], -50), Math.min(xr[1], 50)]
    const [ys, ye] = [Math.max(yr[0], -50), Math.min(yr[1], 50)]
    const [zs, ze] = [Math.max(zr[0], -50), Math.min(zr[1], 50)]

    for (var x = xs; x <= xe; x++) {
      for (var y = ys; y <= ye; y++) {
        for (var z = zs; z <= ze; z++) {
          const key = [x, y, z].join(":")
          if (active) grid.add(key)
          else grid.delete(key)
        }
      }
    }
  }

  return grid.size
}

console.log("Sample:", [{ data: sample }].map(solve1))
console.log("Task:", [{ data: data }].map(solve1))

/// Part 2

const solve2 = ({ data }) => {
  const grid = new Set()

  for (const [active, xr, yr, zr] of data) {
    const [xs, xe] = [Math.max(xr[0], -50), Math.min(xr[1], 50)]
    const [ys, ye] = [Math.max(yr[0], -50), Math.min(yr[1], 50)]
    const [zs, ze] = [Math.max(zr[0], -50), Math.min(zr[1], 50)]

    for (var x = xs; x <= xe; x++) {
      for (var y = ys; y <= ye; y++) {
        for (var z = zs; z <= ze; z++) {
          const key = [x, y, z].join(":")
          if (active) grid.add(key)
          else grid.delete(key)
        }
      }
    }
  }

  return grid.size
}

console.log("Sample:", [{ data: sample }].map(solve2))
// console.log("Task:", [{ data: data }].map(solve2))
