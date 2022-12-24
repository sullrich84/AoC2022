import _ from "lodash"
import data, { sample, test } from "./data.js"

console.log("🎄 Day 24")

/// Part 1

const parseBlizzards = (data) => {
  const blizzards = []

  for (const [y, row] of data.entries()) {
    const chars = row.split("")
    for (const [x, char] of chars.entries()) {
      if (["^", "<", "v", ">"].includes(char)) {
        blizzards.push([y, x, char])
      }
    }
  }

  return blizzards
}

const parseGrid = (data) => {
  const grid = []

  for (const [y, row] of data.entries()) {
    const chars = row.split("")
    if (!grid[y]) grid[y] = []
    for (const char of chars) {
      if (char === "#") grid[y].push("#")
      else grid[y].push(".")
    }
  }

  return grid
}

const moveBlizzard = ([y, x, dir], [sy, sx], [ey, ex]) => {
  switch (dir) {
    case "^":
      var yy = y - 1
      if (yy < 1) yy = ey - 1
      return [yy, x, dir]

    case "v":
      var yy = y + 1
      if (yy >= ey) yy = 1
      return [yy, x, dir]

    case "<":
      var xx = x - 1
      if (xx < 1) xx = ex
      return [y, xx, dir]

    case ">":
      var xx = x + 1
      if (xx > ex) xx = 1
      return [y, xx, dir]
  }
}

const buildMap = (grid, [py, px], blizzards) => {
  const map = [...grid.map((r) => [...r])]
  const marks = ["^", "<", "v", ">"]

  for (const [by, bx, bd] of blizzards) {
    if (marks.includes(map[by][bx])) map[by][bx] = "2"
    else if (!isNaN(map[by][bx])) map[by][bx] = parseInt(map[by][bx]) + 1
    else map[by][bx] = bd
  }

  map[py][px] = "E"

  return map
}

const solve1 = ({ data }) => {
  const initialBlizzards = parseBlizzards(data)
  const grid = parseGrid(data)

  const start = [0, 1]
  const dest = [grid.length - 1, grid[0].length - 2]

  const stack = []
  const seen = {}

  var minSteps = Number.POSITIVE_INFINITY
  var maxSteps = 310

  stack.push([[0, 1], initialBlizzards, 0])

  while (stack.length > 0) {
    const [player, blizzards, steps] = stack.pop()
    const [py, px] = [...player]

    const distance = Math.abs(py - dest[0]) + Math.abs(px - dest[1])

    if (distance == 0) {
      minSteps = Math.min(minSteps, steps)
      console.log("Min:", minSteps)
      continue
    }

    const key = [steps, py, px].join(":")
    if (key in seen) continue
    seen[key] = true

    // Dead end
    if (steps + distance >= minSteps || steps + distance >= maxSteps) continue
    if (blizzards.find(([y, x]) => y == py && px == x)) continue

    // Update blizzard the movements for next cycle
    const movedBlizzards = blizzards.map((b) => moveBlizzard(b, start, dest))

    // Draws the current snapshot of the game state
    // const map = buildMap(grid, player, movedBlizzards)

    // Can player move down?
    if (py < dest[0] - 1 || px == dest[1]) {
      stack.push([[py + 1, px], movedBlizzards, steps + 1])
    }

    // Can player move up?
    if (py > 1 || (py > 0 && px == start[1])) {
      stack.push([[py - 1, px], movedBlizzards, steps + 1])
    }

    // Can player move right?
    if (px < dest[1] && py > 0) {
      stack.push([[py, px + 1], movedBlizzards, steps + 1])
    }

    // Can player move left?
    if (px > 1 && py > 0) {
      stack.push([[py, px - 1], movedBlizzards, steps + 1])
    }

    // Wait for one round
    stack.push([[py, px], movedBlizzards, steps + 1])
  }

  return minSteps
}

console.log("Sample:", [{ data: sample }].map(solve1))
// console.log("Task:", [{ da/ta: data }].map(solve1))

/// Part 2

const solve2 = ({ data }) => {
  const initialBlizzards = parseBlizzards(data)
  const grid = parseGrid(data)

  const start = [grid.length - 1, grid[0].length - 2]
  const finish = [0, 1]

  const stack = []
  const seen = {}

  const nextDest = [finish, start, finish]

  var minSteps = Number.POSITIVE_INFINITY
  var maxSteps = 900

  stack.push([[0, 1], initialBlizzards, 0])

  while (stack.length > 0) {
    const [player, blizzards, steps] = stack.pop()
    const [py, px] = [...player]

    const distance = Math.abs(py - finish[0]) + Math.abs(px - finish[1])

    if (distance == 0) {
      minSteps = Math.min(minSteps, steps)
      console.log("Min:", minSteps)
      continue
    }

    const key = [steps, py, px].join(":")
    if (key in seen) continue
    seen[key] = true

    // Dead end
    if (steps + distance >= minSteps || steps + distance >= maxSteps) continue
    if (blizzards.find(([y, x]) => y == py && px == x)) continue

    // Update blizzard the movements for next cycle
    const movedBlizzards = blizzards.map((b) => moveBlizzard(b, start, finish))

    // Draws the current snapshot of the game state
    // const map = buildMap(grid, player, movedBlizzards)

    // Can player move down?
    if (py < finish[0] - 1 || (py == start[0] && px == start[1]) || (py == finish[0] && px == finish[1] - 1)) {
      stack.push([[py + 1, px], movedBlizzards, steps + 1])
    }

    // Can player move up?
    if (py > 1 || (py == start[0] + 1 && px == start[1]) || (py == finish[0] && px == finish[1])) {
      stack.push([[py - 1, px], movedBlizzards, steps + 1])
    }

    // Can player move right?
    if (px < finish[1] && py > 0) {
      stack.push([[py, px + 1], movedBlizzards, steps + 1])
    }

    // Can player move left?
    if (px > 1 && py > 0) {
      stack.push([[py, px - 1], movedBlizzards, steps + 1])
    }

    // Wait for one round
    stack.push([[py, px], movedBlizzards, steps + 1])
  }

  return minSteps
}

// console.log("Sample:", [{ data: sample }].map(solve2))
// console.log("Task:", [{ data: data }].map(solve2))
