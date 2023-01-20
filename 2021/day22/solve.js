import _ from "lodash"
import data, { sample, sample2 } from "./data.js"

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
  const volume = ([[xs, xe], [ys, ye], [zs, ze]]) => {
    return (Math.abs(xe - xs) + 1) * (Math.abs(ye - ys) + 1) * (Math.abs(ze - zs) + 1)
  }

  const intersection = ([[axs, axe], [ays, aye], [azs, aze]], [[bxs, bxe], [bys, bye], [bzs, bze]]) => {
    if (axe < bxs || bxe < axs || aye < bys || bye < ays || aze < bzs || bze < azs) return []
    const xr = [Math.max(axs, bxs), Math.min(axe, bxe)]
    const yr = [Math.max(ays, bys), Math.min(aye, bye)]
    const zr = [Math.max(azs, bzs), Math.min(aze, bze)]
    return [xr, yr, zr]
  }

  const cubes = []

  for (const cubeA of data) {
    const [aa, ax, ay, az] = cubeA

    const intersects = cubes
      .map(([ba, bx, by, bz]) => [ba, ...intersection([ax, ay, az], [bx, by, bz])])
      .filter(([_, ...e]) => !e)

    if (aa) cubes.push(cubeA)
    cubes.push(...intersects.map(([ia, ...i]) => [(aa && !ia) || (!aa && !ia), ...i]))
  }

  return cubes.map(([ea, ...e]) => (ea ? volume(e) : -volume(e))).reduce((p, c) => p + c, 0)
}

console.log("Sample:", [{ data: sample2 }].map(solve2))
console.log("Task:", [{ data: data }].map(solve2))
