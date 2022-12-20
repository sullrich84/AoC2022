import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 20")

const swap = (array, item) => {
  if (item.val === 0) return

  const oldIdx = array.findIndex(({ id }) => id === item.id)
  const newIdx = (oldIdx + item.val) % (array.length - 1)

  array.splice(oldIdx, 1)
  array.splice(newIdx, 0, item)
}

/// Part 1

const solve1 = ({ numbers }) => {
  const elements = numbers.map((val, id) => ({ id, val }))

  for (var i = 0; i < elements.length; i++) {
    const element = elements.find(({ id }) => id === i)
    swap(elements, element)
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
  const elements = numbers.map((val, id) => ({ id, val: val * 811589153 }))

  for (var i = 0; i < elements.length * 10; i++) {
    const element = elements.filter(({ id }) => id === i % elements.length)[0]
    swap(elements, element)
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
