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
  // const xMin = _.min(data.map(([x, y, z]) => x))
  // const xMax = _.max(data.map(([x, y, z]) => x))
  // const yMin = _.min(data.map(([x, y, z]) => y))
  // const yMax = _.max(data.map(([x, y, z]) => y))
  // const zMin = _.min(data.map(([x, y, z]) => z))
  // const zMax = _.max(data.map(([x, y, z]) => z))

  // const isExposed = (x, y, z) => {
  //   const exposedRight = data.find(([fx, fy, fz]) => fx < x && fy == y && fz == z) ? 0 : 1
  //   const exposedLeft = data.find(([fx, fy, fz]) => fx > x && fy == y && fz == z) ? 0 : 1

  //   const exposedTop = data.find(([fx, fy, fz]) => fx == x && fy < y && fz == z) ? 0 : 1
  //   const exposedBottom = data.find(([fx, fy, fz]) => fx == x && fy < y && fz == z) ? 0 : 1

  //   const exposedFront = data.find(([fx, fy, fz]) => fx == x && fy == y && fz < z) ? 0 : 1
  //   const exposedBack = data.find(([fx, fy, fz]) => fx == x && fy == y && fz > z) ? 0 : 1

  //   const exposedSomewere = exposedRight || exposedLeft || exposedTop || exposedBottom || exposedFront || exposedBack
  //   return exposedSomewere
  // }

  const visible = (x, y, z) => {
    const exposedRight = data.find(([fx, fy, fz]) => fx < x && fy == y && fz == z) === undefined
    const exposedLeft = data.find(([fx, fy, fz]) => fx > x && fy == y && fz == z) === undefined
    const exposedTop = data.find(([fx, fy, fz]) => fx == x && fy < y && fz == z) === undefined
    const exposedBottom = data.find(([fx, fy, fz]) => fx == x && fy < y && fz == z) === undefined
    const exposedFront = data.find(([fx, fy, fz]) => fx == x && fy == y && fz < z) === undefined
    const exposedBack = data.find(([fx, fy, fz]) => fx == x && fy == y && fz > z) === undefined
    return exposedRight || exposedLeft || exposedTop || exposedBottom || exposedFront || exposedBack
  }

  const exposed = data.map(([ex, ey, ez]) => {
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

const sRes2 = [{ data: sample }].map(solve2)
const res2 = [{ data: data }].map(solve2)

console.log("Sample:", sRes2, "Task:", res2)
