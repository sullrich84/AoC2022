import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 23: Amphipod")

/// Part 1

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

const waitingSpots = [
  [1, 1],
  [1, 2],
  [1, 4],
  [1, 6],
  [1, 8],
  [1, 10],
  [1, 11],
]

const debug = (players) => {
  const map = [
    ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
    ["#", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
    ["#", "#", "#", ".", "#", ".", "#", ".", "#", ".", "#", "#", "#"],
    ["#", "#", "#", ".", "#", ".", "#", ".", "#", ".", "#", "#", "#"],
    ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
  ]

  return map.map((row, y) =>
    row
      .map((tile, x) => {
        const p = Object.values(players).find(([py, px]) => py === y && px === x)
        if (p) return p[2]
        return tile
      })
      .join(""),
  )
}

const findValue = (object, predicate) => Object.values(object).find(predicate)
const filterValues = (object, predicate) => Object.values(object).filter(predicate)

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

  stack.push([players, 0, ["game start"]])

  while (stack.length > 0) {
    const [players, energy, history] = stack.pop()
    const debugMap = debug(players)

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

      // Amphipod is at top in its destination room
      // and is not blocking any foreign amphipod
      const upperEquals = findValue(players, ([y, x, pt]) => y === d2y && x === d2x && pt === t)
      if (y === d1y && x === d1x && upperEquals) continue players

      if (y > 1) {
        // Move amphipod to possible left waiting spots in hallway
        const leftWaitingSpots = waitingSpots.filter(([_wpy, wsx]) => wsx < x).reverse()
        left: for (const [ny, nx] of leftWaitingSpots) {
          if (findValue(players, ([y, x]) => y === ny && x === nx)) break left
          const next = { [key]: [ny, nx, t] }
          const nextEnergy = (Math.abs(y - 1) + Math.abs(x - nx)) * rules[t].energy
          movingPlayers.push([
            { ...players, ...next },
            energy + nextEnergy,
            [...history, `${t} from (${y},${x}) to (${ny},${nx}) energy: ${nextEnergy}`],
          ])
        }

        // Move amphipod to possible right waiting spots in hallway
        const rightWaitingSpots = waitingSpots.filter(([_wpy, wsx]) => wsx > x)
        right: for (const [ny, nx] of rightWaitingSpots) {
          if (findValue(players, ([y, x]) => y === ny && x === nx)) break right
          const next = { [key]: [ny, nx, t] }
          const nextEnergy = (Math.abs(y - 1) + Math.abs(x - nx)) * rules[t].energy
          movingPlayers.push([
            { ...players, ...next },
            energy + nextEnergy,
            [...history, `${t} from (${y},${x}) to (${ny},${nx}) energy: ${nextEnergy}`],
          ])
        }
      } else {
        // Move amphipod to destination room

        const blocked = findValue(players, ([py, px]) => py === y && px > x && px < d1x + 1)
        if (blocked) continue // Hallway to room blocked

        const rm1 = findValue(players, ([py, px]) => py === d1y && px === d1x)
        const rm2 = findValue(players, ([py, px]) => py === d2y && px === d2x)

        if ((rm1 && rm1[2] !== t) || (rm2 && rm2[2] !== t)) continue // Room not enterable

        if (rm1 === undefined && rm2 === undefined) {
          // Move to bottom position in destination room
          const next = { [key]: [d2y, d2x, t] }
          const nextEnergy = (Math.abs(y - d2y) + Math.abs(x - d2x)) * rules[t].energy
          movingPlayers.push([
            { ...players, ...next },
            energy + nextEnergy,
            [...history, `${t} from (${y},${x}) to (${d2y},${d2x}) energy: ${nextEnergy}`],
          ])
        } else if (rm1 === undefined && rm2 !== undefined) {
          // Move to top position in destination room
          const next = { [key]: [d1y, d1x, t] }
          const nextEnergy = (Math.abs(y - d1y) + Math.abs(x - d1x)) * rules[t].energy
          movingPlayers.push([
            { ...players, ...next },
            energy + nextEnergy,
            [...history, `${t} from (${y},${x}) to (${d1y},${d1x}) energy: ${nextEnergy}`],
          ])
        }
      }
    }

    if (movingPlayers.length === 0) {
      const destA = filterValues(players, ([y, x, t]) => t === "A" && y > 1 && x === 3)
      const destB = filterValues(players, ([y, x, t]) => t === "B" && y > 1 && x === 5)
      const destC = filterValues(players, ([y, x, t]) => t === "C" && y > 1 && x === 7)
      const destD = filterValues(players, ([y, x, t]) => t === "D" && y > 1 && x === 9)

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
