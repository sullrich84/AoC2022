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

  const swap = (array, elem) => {
    var temp = [...array]
    const idx = _.findIndex(array, ({ id }) => id === elem.id)
    temp.splice(idx, 1)

    const newIdx = (idx + elem.val) % len
    temp.splice(newIdx, 0, elem)
    console.log(temp.map(({val}) => val).join())
    return temp
  }

  for (var i = 0; i < len; i++) {
    const { id, val } = elements.filter(({ id }) => id === i)[0]
    elements = swap(elements, { id, val })
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
