import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 23: Amphipod")

/// Part 1

const noStop = [
  [1, 3],
  [1, 5],
  [1, 7],
  [1, 9],
]

const rules = {
  A: {
    energy: 1,
    dest: [
      [2, 3],
      [3, 3],
    ],
  },
  B: {
    energy: 10,
    dest: [
      [2, 5],
      [3, 5],
    ],
  },
  C: {
    energy: 100,
    dest: [
      [2, 7],
      [3, 7],
    ],
  },
  D: {
    energy: 1000,
    dest: [
      [2, 9],
      [3, 9],
    ],
  },
}

const dirs = [
  [-1, 0],
  [+1, 0],
  [0, -1],
  [0, +1],
]

const solve1 = ({ data }) => {
  const seen = {}
  const stack = []

  var minEnergy = Number.POSITIVE_INFINITY

  const [p1, p2, p3, p4, p5, p6, p7, p8] = [
    [2, 3, _.get(data, [2, 3])],
    [3, 3, _.get(data, [3, 3])],
    [2, 5, _.get(data, [2, 5])],
    [3, 5, _.get(data, [3, 5])],
    [2, 7, _.get(data, [2, 7])],
    [3, 7, _.get(data, [3, 7])],
    [2, 9, _.get(data, [2, 9])],
    [3, 9, _.get(data, [3, 9])],
  ]

  stack.push([[p1, p2, p3, p4, p5, p6, p7, p8], 0])

  while (stack.length > 0) {
    const [players, energy] = stack.pop()
    const [p1, p2, p3, p4, p5, p6, p7, p8] = players

    for (const [y, x, t] of players) {
      if (
        (y === rules[t].dest[0][0] && x === rules[t].dest[0][1]) ||
        (y === rules[t].dest[1][0] && x === rules[t].dest[1][1])
      ) {
        // Cell is at it
        continue
      }
    }

    if (energy > minEnergy) continue
  }
}

console.log("Sample:", [{ data: sample }].map(solve1))
// console.log("Task:", [{ data: data }].map(solve1))

/// Part 2

const solve2 = ({ data }) => {
  return 0
}

// console.log("Sample:", [{ data: sample }].map(solve2))
// console.log("Task:", [{ data: data }].map(solve2))
