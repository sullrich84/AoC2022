import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 23")

/// Part 1

const solve1 = ({ rawData }) => {
  const elves = []

  var id = 0
  rawData.forEach((row, y) =>
    row.split("").forEach((t, x) => {
      if (t === "#") {
        elves.push({ id: id++, x, y, dest: null })
      }
    }),
  )

  const get = (gy, gx) => elves.find(({ y, x }) => gy === y && gx === x) || null

  const adjacent = (y, x) => ({
    N: get(y - 1, x),
    NW: get(y - 1, x - 1),
    NE: get(y - 1, x + 1),

    W: get(y, x - 1),
    E: get(y, x + 1),

    S: get(y + 1, x),
    SW: get(y + 1, x - 1),
    SE: get(y + 1, x + 1),
  })

  var considerations = ["N", "S", "W", "E"]

  for (var round = 0; round < 10; round++) {
    // First half: move elves
    round1A: for (const elf of elves) {
      const adj = adjacent(elf.y, elf.x)

      // If no other Elves are in one of those eight positions,
      // the Elf does not do anything during this round.
      if (!adj.N && !adj.NE && !adj.NW && !adj.S && !adj.SE && !adj.SW && !adj.W && !adj.E) {
        elf.dest = null
        continue round1A
      }

      considerationLoop: for (const consider of considerations) {
        // If there is no Elf in the N, NE, or NW adjacent positions,
        // the Elf proposes moving north one step.
        if (consider === "N" && !adj.N && !adj.NE && !adj.NW) {
          elf.dest = { y: elf.y - 1, x: elf.x, move: "N" }
          break considerationLoop
        }

        // If there is no Elf in the S, SE, or SW adjacent positions,
        // the Elf proposes moving south one step.
        if (consider === "S" && !adj.S && !adj.SE && !adj.SW) {
          elf.dest = { y: elf.y + 1, x: elf.x, move: "S" }
          break considerationLoop
        }

        // If there is no Elf in the W, NW, or SW adjacent positions,
        // the Elf proposes moving west one step.
        if (consider === "W" && !adj.W && !adj.NW && !adj.SW) {
          elf.dest = { y: elf.y, x: elf.x - 1, move: "W" }
          break considerationLoop
        }

        // If there is no Elf in the E, NE, or SE adjacent positions,
        // the Elf proposes moving east one step.
        if (consider === "E" && !adj.E && !adj.NE && !adj.SE) {
          elf.dest = { y: elf.y, x: elf.x + 1, move: "E" }
          break considerationLoop
        }
      }
    }

    // If two or more Elves propose moving to the
    // same position, none of those Elves move.
    round2A: for (const elf of elves) {
      const conflicts = elves.filter(({ id, dest }) => {
        return elf.id !== id && dest && elf.dest && elf.dest.y === dest.y && elf.dest.x === dest.x
      })

      if (conflicts.length > 0) {
        for (const conflict of conflicts) {
          conflict.dest = null
        }
        elf.dest = null
      }
    }

    // Move elves without conflicts
    round2B: for (const elf of elves) {
      if (elf.dest === null) continue round2B

      // Move elf
      elf.y = elf.dest.y
      elf.x = elf.dest.x
      elf.dest = null
    }

    // Update considerations
    const shift = considerations.shift()
    considerations = [...considerations, shift]
  }

  const minY = _.min([...elves.map(({ y }) => y)])
  const maxY = _.max([...elves.map(({ y }) => y)])
  const minX = _.min([...elves.map(({ x }) => x)])
  const maxX = _.max([...elves.map(({ x }) => x)])

  const h = Math.abs(minY - maxY) + 1
  const w = Math.abs(minX - maxX) + 1

  return h * w - elves.length
}

const sRes1 = [{ rawData: sample }].map(solve1)
const res1 = [{ rawData: data }].map(solve1)

console.log("Sample:", sRes1, "Task:", res1)

/// Part 2

const solve2 = ({ rawData }) => {
  const elves = []

  var id = 0
  rawData.forEach((row, y) =>
    row.split("").forEach((t, x) => {
      if (t === "#") {
        elves.push({ id: id++, x, y, dest: null })
      }
    }),
  )

  const get = (gy, gx) => elves.find(({ y, x }) => gy === y && gx === x) || null

  const adjacent = (y, x) => ({
    N: get(y - 1, x),
    NW: get(y - 1, x - 1),
    NE: get(y - 1, x + 1),

    W: get(y, x - 1),
    E: get(y, x + 1),

    S: get(y + 1, x),
    SW: get(y + 1, x - 1),
    SE: get(y + 1, x + 1),
  })

  var considerations = ["N", "S", "W", "E"]

  var round = 1
  game: while (true) {
    // First half: move elves
    round1A: for (const elf of elves) {
      const adj = adjacent(elf.y, elf.x)

      // If no other Elves are in one of those eight positions,
      // the Elf does not do anything during this round.
      if (!adj.N && !adj.NE && !adj.NW && !adj.S && !adj.SE && !adj.SW && !adj.W && !adj.E) {
        elf.dest = null
        continue round1A
      }

      considerationLoop: for (const consider of considerations) {
        // If there is no Elf in the N, NE, or NW adjacent positions,
        // the Elf proposes moving north one step.
        if (consider === "N" && !adj.N && !adj.NE && !adj.NW) {
          elf.dest = { y: elf.y - 1, x: elf.x, move: "N" }
          break considerationLoop
        }

        // If there is no Elf in the S, SE, or SW adjacent positions,
        // the Elf proposes moving south one step.
        if (consider === "S" && !adj.S && !adj.SE && !adj.SW) {
          elf.dest = { y: elf.y + 1, x: elf.x, move: "S" }
          break considerationLoop
        }

        // If there is no Elf in the W, NW, or SW adjacent positions,
        // the Elf proposes moving west one step.
        if (consider === "W" && !adj.W && !adj.NW && !adj.SW) {
          elf.dest = { y: elf.y, x: elf.x - 1, move: "W" }
          break considerationLoop
        }

        // If there is no Elf in the E, NE, or SE adjacent positions,
        // the Elf proposes moving east one step.
        if (consider === "E" && !adj.E && !adj.NE && !adj.SE) {
          elf.dest = { y: elf.y, x: elf.x + 1, move: "E" }
          break considerationLoop
        }
      }
    }

    // Second half: Cancel elves with conflicting destinations
    round2A: for (const elf of elves) {
      // If two or more Elves propose moving to the same position, none of those Elves move.
      const conflicts = elves.filter(({ id, dest }) => {
        return elf.id !== id && dest && elf.dest && elf.dest.y === dest.y && elf.dest.x === dest.x
      })

      if (conflicts.length > 0) {
        for (const conflict of conflicts) {
          conflict.dest = null
        }
        elf.dest = null
      }
    }

    const hasMovingElf = elves.find(({ dest }) => (dest ? 1 : 0))
    if (!hasMovingElf) break game

    // Second half: Move elves to their destinations
    round2B: for (const elf of elves) {
      // Elf has been canceled due to a conflict
      if (elf.dest === null) continue round2B

      // Move elf
      elf.y = elf.dest.y
      elf.x = elf.dest.x
      elf.dest = null
    }

    // Update considerations
    const shift = considerations.shift()
    considerations = [...considerations, shift]
    round += 1
  }

  return round
}

// This may run for about 5 minutes :)
const sRes2 = [{ rawData: sample }].map(solve2)
const res2 = [{ rawData: data }].map(solve2)

console.log("Sample:", sRes2, "Task:", res2)
