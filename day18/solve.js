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

console.log("Sample:", [{ data: sample }].map(solve1))
console.log( "Task:", [{ data: data }].map(solve1))

/// Part 2

const solve2 = ({ data }) => {
  const has = (collection, [x, y, z]) =>
    collection.find(([fx, fy, fz]) => fx === x && fy === y && fz === z) !== undefined

  const xMin = _.min(data.map(([x]) => x))
  const xMax = _.max(data.map(([x]) => x))
  const yMin = _.min(data.map(([_x, y]) => y))
  const yMax = _.max(data.map(([_x, y]) => y))
  const zMin = _.min(data.map(([_x, _y, z]) => z))
  const zMax = _.max(data.map(([_x, _y, z]) => z))

  const cache = {}
  const visible = (x, y, z) => {
    const key = [x, y, z].join(":")
    if (key in cache) return cache[key]

    const queue = [[x, y, z]]
    const seen = []

    while (queue.length > 0) {
      const [px, py, pz] = queue.pop()

      if (has(seen, [px, py, pz])) continue
      seen.push([px, py, pz])

      if (has(data, [px, py, pz])) continue

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

  return data
    .map(([ex, ey, ez]) => {
      const rr = !data.includes([ex + 1, ey, ez]) && visible(ex + 1, ey, ez) ? 1 : 0
      const ll = !data.includes([ex - 1, ey, ez]) && visible(ex - 1, ey, ez) ? 1 : 0
      const tt = !data.includes([ex, ey + 1, ez]) && visible(ex, ey + 1, ez) ? 1 : 0
      const dd = !data.includes([ex, ey - 1, ez]) && visible(ex, ey - 1, ez) ? 1 : 0
      const ff = !data.includes([ex, ey, ez + 1]) && visible(ex, ey, ez + 1) ? 1 : 0
      const bb = !data.includes([ex, ey, ez - 1]) && visible(ex, ey, ez - 1) ? 1 : 0
      return rr + ll + tt + dd + ff + bb
    })
    .reduce((acc, val) => acc + val, 0)
}

console.log("Sample:", [{ data: sample }].map(solve2))
console.log("Task:", [{ data: data }].map(solve2))
