import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 2: Dive!")

/// Part 1

const solve1 = ({ data }) => {
  var [y, x] = [0, 0]
  for (const [dir, val] of data) {
    switch (dir) {
      case "forward":
        x += val
        break
      case "up":
        y -= val
        break
      case "down":
        y += val
        break
    }
  }

  return y * x
}

console.log("Sample:", [{ data: sample }].map(solve1))
console.log("Task:", [{ data: data }].map(solve1))

/// Part 2

const solve2 = ({ data }) => {
  var [y, x, aim] = [0, 0, 0]
  for (const [dir, val] of data) {
    switch (dir) {
      case "forward":
        x += val
        aim += y * val
        break
      case "up":
        y -= val
        break
      case "down":
        y += val
        break
    }
  }

  return x * aim
}

console.log("Sample:", [{ data: sample }].map(solve2))
console.log("Task:", [{ data: data }].map(solve2))
