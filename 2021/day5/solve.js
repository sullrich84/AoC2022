import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 5: Hydrothermal Venture")

/// Part 1

const solve1 = ({ data }) => {
  const maxY = _.max(_.flatten(data.map(([[x1, y1], [x2, y2]]) => [y1, y2])))
  const maxX = _.max(_.flatten(data.map(([[x1, y1], [x2, y2]]) => [x1, x2])))
  const matrix = _.times(maxY + 1, () => _.times(maxX + 1, () => 0))

  loop: for (const [[x1, y1], [x2, y2]] of data) {
    if (x1 !== x2 && y1 !== y2) continue loop
    const v = _.range(y1, y1 > y2 ? y2 - 1 : y2 + 1)
    const h = _.range(x1, x1 > x2 ? x2 - 1 : x2 + 1)
    const points = _.zipWith(v, h, (y, x) => [y === undefined ? v[0] : y, x === undefined ? h[0] : x])
    for (const [y, x] of points) matrix[y][x] += 1
  }

  return _.sum(_.flatten(matrix).map((e) => (e > 1 ? 1 : 0)))
}

console.log("Task:", [{ data: data }].map(solve1))

/// Part 2

const solve2 = ({ data }) => {
  const maxY = _.max(_.flatten(data.map(([[x1, y1], [x2, y2]]) => [y1, y2])))
  const maxX = _.max(_.flatten(data.map(([[x1, y1], [x2, y2]]) => [x1, x2])))
  const matrix = _.times(maxY + 1, () => _.times(maxX + 1, () => 0))

  loop: for (const [[x1, y1], [x2, y2]] of data) {
    const v = _.range(y1, y1 > y2 ? y2 - 1 : y2 + 1)
    const h = _.range(x1, x1 > x2 ? x2 - 1 : x2 + 1)
    const points = _.zipWith(v, h, (y, x) => [y === undefined ? v[0] : y, x === undefined ? h[0] : x])
    for (const [y, x] of points) matrix[y][x] += 1
  }

  return _.sum(_.flatten(matrix).map((e) => (e > 1 ? 1 : 0)))
}

console.log("Sample:", [{ data: sample }].map(solve2))
console.log("Task:", [{ data: data }].map(solve2))
