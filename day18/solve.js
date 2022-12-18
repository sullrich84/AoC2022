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

  const blockCache = {}
  const hasBlockAt = (x, y, z) => {
    const key = [x, y, z].join(":")
    if (key in blockCache) return blockCache[key]
    const hasBlock = !!data.find(([ex, ey, ez]) => x === ex && y === ey && z === ez)
    blockCache[key] = hasBlock
    return hasBlock
  }

  const exposedCache = {}
  const isExposed = (x, y, z) => {
    const key = [x, y, z].join(":")
    if (key in exposedCache) return exposedCache[key]

    if (x <= xMin || x >= xMax || y <= yMin || y >= xMax || z <= zMin || z >= zMax) {
      // Block is at the grids outside and therefore exposed
      exposedCache[key] = true
      return true
    }

    const exposed =
      (!hasBlockAt(x - 1, y, z) && isExposed(x - 1, y, z)) ||
      (!hasBlockAt(x + 1, y, z) && isExposed(x + 1, y, z)) ||
      (!hasBlockAt(x, y + 1, z) && isExposed(x, y + 1, z)) ||
      (!hasBlockAt(x, y - 1, z) && isExposed(x, y - 1, z)) ||
      (!hasBlockAt(x, y, z + 1) && isExposed(x, y, z + 1)) ||
      (!hasBlockAt(x, y, z - 1) && isExposed(x, y, z - 1))

    exposedCache[key] = exposed
    return exposed
  }

  const exposed = data.map(([x, y, z]) => {
    const rr = hasBlockAt(x - 1, y, z) ? 0 : 1
    const ll = hasBlockAt(x + 1, y, z) ? 0 : 1
    const tt = hasBlockAt(x, y + 1, z) ? 0 : 1
    const dd = hasBlockAt(x, y - 1, z) ? 0 : 1
    const ff = hasBlockAt(x, y, z + 1) ? 0 : 1
    const bb = hasBlockAt(x, y, z - 1) ? 0 : 1

    return isExposed(x, y, z) ? rr + ll + tt + dd + ff + bb : 0
  })

  return _.sum(exposed)
}

const sRes2 = [{ data: sample }].map(solve2)
const res2 = [{ data: data }].map(solve2)

console.log("Sample:", sRes2, "Task:", res2)
