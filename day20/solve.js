import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day X")

/// Part 1

const solve1 = ({ numbers }) => {
  console.log(numbers)

  var elements = numbers.map((val, id) => {
    return { id, val }
  })

  const len = elements.length

  const swap = (array, elem, idx) => {
    var temp = _.without(array, elem)
    temp.splice(idx, 0, elem)
    return temp
  }

  for (var i = 0; i < len; i++) {
    const { id, val } = elements.filter(({ id }) => id === i)[0]

    if (val > 0) {
      console.log(`Moving ${val} ${val} to the right`)
      elements = swap(elements, id, val)
    } else if (val < 0) {
      console.log(`Moving ${val} ${val * -1} to the left`)
    }
  }

  return 0
}

const sRes1 = [{ numbers: sample }].map(solve1)
const res1 = 0 //[{ data: data }].map(solve1)

console.log("Sample:", sRes1, "Task:", res1)

/// Part 2

const solve2 = (input) => {
  console.log(input)
  return 0
}

const sRes2 = 0 // [{ data: sample }].map(solve2)
const res2 = 0 //[{ data: data }].map(solve2)

console.log("Sample:", sRes2, "Task:", res2)
