import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 13: Transparent Origami")

/// Part 1

const solve1 = ({ data, fold }) => {
  const mX = _.max(data.map((e) => e[0]))
  const mY = _.max(data.map((e) => e[1]))
  const map = _.times(mY + 1, () => _.times(mX + 1, () => 0))
  data.forEach(([x, y]) => {
    map[y][x] = 1
  })

  const [dir, pos] = _.first(fold)
  var fold

  if (dir === "y") {
    fold = map.slice(pos + 1).reverse()
    map.length = pos
  } else {
    fold = map.map((row) => row.slice(pos + 1).reverse())
    map.forEach((row) => (row.length = pos))
  }

  for (var y = 0; y < fold.length; y++) {
    for (var x = 0; x < fold[0].length; x++) {
      map[y][x] += fold[y][x]
    }
  }

  return _.sum(_.flatten(map).map((e) => (e === 0 ? 0 : 1)))
}

console.log("Sample:", [{ data: sample[0], fold: sample[1] }].map(solve1))
console.log("Sample:", [{ data: data[0], fold: data[1] }].map(solve1))

/// Part 2

const solve2 = ({ data, fold }) => {
  const mX = _.max(data.map((e) => e[0]))
  const mY = _.max(data.map((e) => e[1]))
  const map = _.times(mY + 1, () => _.times(mX + 1, () => 0))
  data.forEach(([x, y]) => {
    map[y][x] = 1
  })

  for (const [dir, pos] of fold) {
    var fold

    if (dir === "y") {
      fold = map.slice(pos + 1).reverse()
      map.length = pos
    } else {
      fold = map.map((row) => row.slice(pos + 1).reverse())
      map.forEach((row) => (row.length = pos))
    }

    for (var y = 0; y < fold.length; y++) {
      for (var x = 0; x < fold[0].length; x++) {
        map[y][x] += fold[y][x]
      }
    }
  }

  for (const row of map) {
    console.log(row.map((v) => (v > 0 ? "█" : " ")).join(""))
  }
}

solve2({ data: data[0], fold: data[1] })
