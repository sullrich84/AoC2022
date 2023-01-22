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

const tiles = [
  [1, 1],
  [1, 2],
  [1, 3],
  [1, 4],
  [1, 5],
  [1, 6],
  [1, 7],
  [1, 8],
  [1, 9],
  [1, 10],
  [1, 11],
  ...rules.A.dest,
  ...rules.B.dest,
  ...rules.C.dest,
  ...rules.D.dest,
]

const dirs = [
  [-1, 0], // up
  [0, -1], // left
  [0, +1], // right
  [+1, 0], // down
]

const solve1 = ({ data }) => {
  const seen = {}
  const stack = []

  var minEnergy = Number.POSITIVE_INFINITY

  const players = {
    p1: [2, 3, _.get(data, [2, 3])],
    p2: [3, 3, _.get(data, [3, 3])],
    p3: [2, 5, _.get(data, [2, 5])],
    p4: [3, 5, _.get(data, [3, 5])],
    p5: [2, 7, _.get(data, [2, 7])],
    p6: [3, 7, _.get(data, [3, 7])],
    p7: [2, 9, _.get(data, [2, 9])],
    p8: [3, 9, _.get(data, [3, 9])],
  }

  stack.push([[p1, p2, p3, p4, p5, p6, p7, p8], 0])

  while (stack.length > 0) {
    const [players, energy] = stack.pop()

    const key = [players, energy].join()
    if (key in seen) continue
    seen[key] = true

    // Skip inefficient branches
    if (energy > minEnergy) continue

    const movingPlayers = []
    players: for (const [key, value] of Object.entries(players)) {
      const [y, x, t] = value
      const [[d1y, d1x], [d2y, d2x]] = rules[t].dest

      // Amphipod is at bottom in its destination room
      if (x === d2x && y === d2y) continue players

      // Amphipod is at top in its destionation room
      // and is not blocking any foreign amphipod
      const lower = players.find(([y, x, pt]) => y === d1y && x === d1x && pt === t)
      if (x === d1x && y === d1y && lower) continue players

      dirs: for (const [dy, dx] of dirs) {
        // Skip inaccessible tiles
        if (tiles.find(([y, x]) => y === dy && x === dx) === undefined) continue dirs

        // Skip blocked tiles
        if (players.find(([y, x]) => y === dy && x === dx) !== undefined) continue dirs

        const next = { [key]: [y + dy, x + dx, t] }
        movingPlayers.push([{ ...players, ...next }, energy + rules[t].energy])
      }
    }

    if (movingPlayers.length > 0) {
      minEnergy = Math.min(minEnergy, energy)
      continue
    }

    // Move the amphipods
    stack.push(...movingPlayers)
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
