import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 18")

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
  const has = (collection, [x, y, z]) =>
    collection.find(([fx, fy, fz]) => fx === x && fy === y && fz === z) !== undefined

  const xMin = _.min(data.map(([x, y, z]) => x))
  const xMax = _.max(data.map(([x, y, z]) => x))
  const yMin = _.min(data.map(([x, y, z]) => y))
  const yMax = _.max(data.map(([x, y, z]) => y))
  const zMin = _.min(data.map(([x, y, z]) => z))
  const zMax = _.max(data.map(([x, y, z]) => z))

  const cache = {}
  const visible = (x, y, z) => {
    const key = [x, y, z].join(":")
    if (key in cache) return cache[key]

    const queue = [[x, y, z]]
    const seen = []

    while (queue.length > 0) {
      const [px, py, pz] = queue.pop()

      if (has(seen, [px, py, pz])) {
        continue
      }
      seen.push([px, py, pz])

      if (has(data, [px, py, pz])) {
        continue
      }

      if (px >= xMax || px <= xMin || py >= yMax || py <= yMin || pz >= zMax || pz <= zMin) {
        cache[key] = true
        return true
      }

      queue.push([px + 1, py, pz])
      queue.push([px - 1, py, pz])
      queue.push([px, py + 1, pz])
      queue.push([px, py - 1, pz])
      queue.push([px, py, pz + 1])
      queue.push([px, py, pz - 1])
    }

    cache[key] = false
    return false
  }

  const exposed = data.map(([ex, ey, ez], idx) => {
    const rr = data.find(([x, y, z]) => x === ex + 1 && y === ey && z === ez) ? 0 : visible(ex + 1, ey, ez) ? 1 : 0
    const ll = data.find(([x, y, z]) => x === ex - 1 && y === ey && z === ez) ? 0 : visible(ex - 1, ey, ez) ? 1 : 0
    const tt = data.find(([x, y, z]) => x === ex && y === ey + 1 && z === ez) ? 0 : visible(ex, ey + 1, ez) ? 1 : 0
    const dd = data.find(([x, y, z]) => x === ex && y === ey - 1 && z === ez) ? 0 : visible(ex, ey - 1, ez) ? 1 : 0
    const ff = data.find(([x, y, z]) => x === ex && y === ey && z === ez + 1) ? 0 : visible(ex, ey, ez + 1) ? 1 : 0
    const bb = data.find(([x, y, z]) => x === ex && y === ey && z === ez - 1) ? 0 : visible(ex, ey, ez - 1) ? 1 : 0
    return rr + ll + tt + dd + ff + bb
  })

  return _.sum(exposed)
}

// > 2473
const sRes2 = [{ data: sample }].map(solve2)
const res2 = [{ data: data }].map(solve2)

console.log("Sample:", sRes2, "Task:", res2)
