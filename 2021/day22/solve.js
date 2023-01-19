import _ from "lodash"
import data, { sample, smallSample } from "./data.js"

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

// console.log("Sample:", [{ data: sample }].map(solve1))
// console.log("Task:", [{ data: data }].map(solve1))

/// Part 2

const solve2 = ({ data }) => {
  var activeCells = 0

  const xr = _.flatten(data.map((e) => e[1]))
  const yr = _.flatten(data.map((e) => e[2]))
  const zr = _.flatten(data.map((e) => e[3]))

  const [minX, maxX] = [_.min(xr), _.max(xr)]
  const [minY, maxY] = [_.min(yr), _.max(yr)]
  const [minZ, maxZ] = [_.min(zr), _.max(zr)]

  const space = (Math.abs(maxX - minX) + 1) * (Math.abs(maxY - minY) + 1) * (Math.abs(maxZ - minZ) + 1)

  for (const [active, [sx, ex], [sy, ey], [sz, ez]] of data) {
    const sum = (Math.abs(ex - sx) + 1) * (Math.abs(ey - sy) + 1) * (Math.abs(ez - sz) + 1)
    console.log(active, space, sum)
  }

  return activeCells
}

console.log("Sample:", [{ data: smallSample }].map(solve2))
// console.log("Task:", [{ data: data }].map(solve2))
