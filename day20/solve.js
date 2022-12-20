import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day X")

/// Part 1

const solve1 = ({ numbers }) => {
  console.log(numbers)

  var set = [...numbers]
  const len = set.length

  for (var i = 0; i < numbers.length; i++) {
    const shift = numbers[i]

    const sourceIdx = set.indexOf(shift)
    const sourceVal = set[sourceIdx]
    const destIdx = (sourceIdx + shift) % len
    const destVal = set[destIdx]

    // Drop source
    set.splice(sourceIdx)
  }

  const zeroIndex = list.findIndex((el) => el.val === 0)
  const keys = [1000, 2000, 3000].map((x) => list[(zeroIndex + x) % list.length].val)
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
