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

const sRes1 = [{ data: sample }].map(solve1)
const res1 = [{ data: data }].map(solve1)

console.log("Sample:", sRes1, "Task:", res1)

/// Part 2

const solve2 = (input) => {
  console.log(input)
  return 0
}

const sRes2 = 0 //_.sum(sample.map(solve2))
const res2 = 0 //_.sum(data.map(solve2))

console.log("Sample:", sRes2, "Task:", res2)
