import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 20")

const swap = (array, elem) => {
  if (elem.val === 0) return array
  var temp = [...array]

  const oldIdx = array.findIndex(({ id }) => id === elem.id)
  const newIdx = (oldIdx + elem.val) % (array.length - 1)

  temp.splice(oldIdx, 1)
  temp.splice(newIdx, 0, elem)

  return temp
}

/// Part 1

const solve1 = ({ numbers }) => {
  var elements = numbers.map((val, id) => {
    return { id, val }
  })

  for (var i = 0; i < elements.length; i++) {
    const element = elements.find(({ id }) => id === i)
    elements = swap(elements, element)
  }

  const zero = elements.findIndex(({ val }) => val === 0)

  return [1000, 2000, 3000]
    .map((shift) => (zero + shift) % elements.length)
    .map((idx) => elements[idx].val)
    .reduce((acc, val) => acc + val, 0)
}

const sRes1 = [{ numbers: sample }].map(solve1)
const res1 = [{ numbers: data }].map(solve1)

console.log("Sample:", sRes1, "Task:", res1)

/// Part 2

const solve2 = ({ numbers }) => {
  var elements = numbers.map((val, id) => {
    return { id, val: val * 811589153 }
  })

  for (var i = 0; i < elements.length * 10; i++) {
    const { id, val } = elements.filter(({ id }) => id === i % elements.length)[0]
    elements = swap(elements, { id, val })
  }

  const zero = elements.findIndex(({ val }) => val === 0)

  return [1000, 2000, 3000]
    .map((shift) => (zero + shift) % elements.length)
    .map((idx) => elements[idx].val)
    .reduce((acc, val) => acc + val, 0)
}

const sRes2 = [{ numbers: sample }].map(solve2)
const res2 = [{ numbers: data }].map(solve2)

console.log("Sample:", sRes2, "Task:", res2)
