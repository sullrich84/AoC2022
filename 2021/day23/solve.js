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

const waitingSpots = [
  [1, 1],
  [1, 2],
  [1, 4],
  [1, 6],
  [1, 8],
  [1, 10],
  [1, 11],
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

  stack.push([players, 0])

  while (stack.length > 0) {
    const [players, energy] = stack.pop()

    const key = JSON.stringify([players, energy])
    if (key in seen) continue
    seen[key] = true

    // Skip inefficient branches
    if (energy > minEnergy) continue

    const movingPlayers = []
    players: for (const [key, value] of Object.entries(players)) {
      const [y, x, t] = value
      const [[d1y, d1x], [d2y, d2x]] = rules[t].dest

      // Amphipod is at bottom in its destination room
      if (y === d2y && x === d2x) continue players

      // Amphipod is at top in its destionation room
      // and is not blocking any foreign amphipod
      const lower = Object.values(players).find(([y, x, pt]) => y === d1y && x === d1x && pt === t)
      if (y === d1y && x === d1x && lower) continue players

      const hallway = Object.values(players).filter(([y]) => y === 1)

      if (y > 1) {
        // Move amphipod to possible left waiting spots in hallway
        const leftWaitingSpots = waitingSpots.filter(([_wpy, wsx]) => wsx < x).reverse()
        left: for (const [ny, nx] of leftWaitingSpots) {
          if (hallway.find(([_hy, hx]) => hx === nx) !== undefined) break left
          const next = { [key]: [ny, nx, t] }
          const nextEnergy = (Math.abs(y - 1) + Math.abs(x - nx)) * rules[t].energy
          movingPlayers.push([{ ...players, ...next }, nextEnergy])
        }

        // Move amphipod to possible right waiting spots in hallway
        const rightWaitingSpots = waitingSpots.filter(([_wpy, wsx]) => wsx > x)
        right: for (const [ny, nx] of rightWaitingSpots) {
          if (hallway.find(([_hy, hx]) => hx === nx) !== undefined) break right
          const next = { [key]: [ny, nx, t] }
          const nextEnergy = (Math.abs(y - 1) + Math.abs(x - nx)) * rules[t].energy
          movingPlayers.push([{ ...players, ...next }, nextEnergy])
        }
      } else {
        // Move amphipod to destination room
        const blocked = Object.values(players).find(([by, bx]) => by === y && bx > x && bx < d1x + 1)
        if (blocked) continue // Way to room blocked

        const occupiers = Object.values(players).filter(([oy, ox]) => oy === d1y && (ox === d1x || ox === d2x))
        if (occupiers.find(([_oy, _ox, ot]) => ot !== t) !== undefined) continue // Room not enterable

        if (
          occupiers.find(([oy, ox]) => oy === d1y && ox === d1x) === undefined &&
          occupiers.find(([oy, ox]) => oy === d2y && ox === d2x) === undefined
        ) {
          // Move to bottom position in destination room
          const next = { [key]: [d2y, d2x, t] }
          const nextEnergy = (Math.abs(y - d2y) + Math.abs(x - d2x)) * rules[t].energy
          movingPlayers.push([{ ...players, ...next }, nextEnergy])
        }

        if (
          occupiers.find(([oy, ox]) => oy === d1y && ox === d1x) === undefined &&
          occupiers.find(([oy, ox]) => oy === d2y && ox === d2x) !== undefined
        ) {
          // Move to top position in destination room
          const next = { [key]: [d1y, d1x, t] }
          const nextEnergy = (Math.abs(y - d2y) + Math.abs(x - d2x)) * rules[t].energy
          movingPlayers.push([{ ...players, ...next }, nextEnergy])
        }
      }
    }

    if (movingPlayers.length === 0) {
      const destA = Object.values(players).filter(([y, x, t]) => t === "A" && y > 1 && x === 3)
      const destB = Object.values(players).filter(([y, x, t]) => t === "B" && y > 1 && x === 5)
      const destC = Object.values(players).filter(([y, x, t]) => t === "C" && y > 1 && x === 7)
      const destD = Object.values(players).filter(([y, x, t]) => t === "D" && y > 1 && x === 9)

      if (destA.length + destB.length + destC.length + destD.length !== 8) {
        // Broken configuration
        continue
      }

      minEnergy = Math.min(minEnergy, energy)
    }

    // Move the amphipods
    stack.push(...movingPlayers)
  }

  return minEnergy
}

console.log("Sample:", [{ data: sample }].map(solve1))
// console.log("Task:", [{ data: data }].map(solve1))

/// Part 2

const solve2 = ({ data }) => {
  return 0
}

// console.log("Sample:", [{ data: sample }].map(solve2))
// console.log("Task:", [{ data: data }].map(solve2))
