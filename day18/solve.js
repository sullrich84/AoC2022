import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day X")

/// Part 1

const solve1 = ({ data }) => {
  const exposed = data.map(([ex, ey, ez]) => {
    const rr = data.find(([x, y, z]) => x === ex + 1 && y === ey && z === ez) ? 0 : 1
    const ll = data.find(([x, y, z]) => x === ex - 1 && y === ey && z === ez) ? 0 : 1
    const tt = data.find(([x, y, z]) => x === ex && y === ey + 1 && z === ez) ? 0 : 1
    const dd = data.find(([x, y, z]) => x === ex && y === ey - 1 && z === ez) ? 0 : 1
    const ff = data.find(([x, y, z]) => x === ex && y === ey && z === ez + 1) ? 0 : 1
    const bb = data.find(([x, y, z]) => x === ex && y === ey && z === ez - 1) ? 0 : 1
    return rr + ll + tt + dd + ff + bb
  })

  return _.sum(exposed)
}

// const sRes1 = [{ data: sample }].map(solve1)
// const res1 = [{ data: data }].map(solve1)

// console.log("Sample:", sRes1, "Task:", res1)

/// Part 2

const solve2 = ({ data }) => {
  // 0:21 grid
  const xMin = _.min(data.map(([x, y, z]) => x))
  const xMax = _.max(data.map(([x, y, z]) => x))
  const yMin = _.min(data.map(([x, y, z]) => y))
  const yMax = _.max(data.map(([x, y, z]) => y))
  const zMin = _.min(data.map(([x, y, z]) => z))
  const zMax = _.max(data.map(([x, y, z]) => z))

  const hasBlockAt = (x, y, z) => (data.find(([ex, ey, ez]) => x === ex && y === ey && z === ez) ? true : false)

  const exposedCache = {}
  const isExposed = (x, y, z) => {
    const key = [x, y, z].join(":")
    if (key in exposedCache) return exposedCache[key]

    if (hasBlockAt(x, y, z)) {
      exposedCache[key] = false
      return false
    }

    const stack = [[x, y, z]]
    const seen = []

    while (stack.length > 0) {
      const [px, py, pz] = stack.pop()

      if (hasBlockAt(px, py, pz)) continue

      // Check if point is at grids edges
      if (px <= xMin || px >= xMax || py <= yMin || py >= xMax || pz <= zMin || pz >= zMax) {
        exposedCache[key] = true
        return true
      }

      // Point has already been
      if (!!seen.find(([sx, sy, sz]) => sx === py && sy === py && sz === pz)) continue
      seen.push([px, py, pz])

      // Check if neigbour points are exposed by adding them to the stack
      stack.push([px + 1, py, pz])
      stack.push([px - 1, py, pz])
      stack.push([px, py + 1, pz])
      stack.push([px, py - 1, pz])
      stack.push([px, py, pz + 1])
      stack.push([px, py, pz - 1])
    }

    exposedCache[key] = false
    return false
  }

  const exposed = data.map(([x, y, z]) => {
    const rr = hasBlockAt(x + 1, y, z) && isExposed(x + 1, y, z)
    const ll = hasBlockAt(x - 1, y, z) && isExposed(x - 1, y, z)
    const tt = hasBlockAt(x, y + 1, z) && isExposed(x, y + 1, z)
    const dd = hasBlockAt(x, y - 1, z) && isExposed(x, y - 1, z)
    const ff = hasBlockAt(x, y, z + 1) && isExposed(x, y, z + 1)
    const bb = hasBlockAt(x, y, z - 1) && isExposed(x, y, z - 1)

    return rr ? 1 : 0 + ll ? 1 : 0 + tt ? 1 : 0 + dd ? 1 : 0 + ff ? 1 : 0 + bb ? 1 : 0
  })

  return _.sum(exposed)
}

const sRes2 = [{ data: sample }].map(solve2)
const res2 = [{ data: data }].map(solve2)

console.log("Sample:", sRes2, "Task:", res2)
