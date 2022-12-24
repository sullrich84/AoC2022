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
  const finish = [grid.length - 1, grid[0].length - 2]

  const stack = []
  const seen = {}

  var minSteps = Number.POSITIVE_INFINITY
  var maxSteps = 330

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
    const map = buildMap(grid, player, movedBlizzards)

    // Can player move down?
    if (py + 1 < map.length && map[py + 1][px] === ".") {
      stack.push([[py + 1, px], movedBlizzards, steps + 1])
    }

    // Can player move up?
    if (py - 1 >= 0 && map[py - 1][px] === ".") {
      stack.push([[py - 1, px], movedBlizzards, steps + 1])
    }

    // Can player move right?
    if (px + 1 < map[0].length && map[py][px + 1] === ".") {
      stack.push([[py, px + 1], movedBlizzards, steps + 1])
    }

    // Can player move left?
    if (px - 1 >= 0 && map[py][px - 1] === ".") {
      stack.push([[py, px - 1], movedBlizzards, steps + 1])
    }

    // Wait for one round
    stack.push([[py, px], movedBlizzards, steps + 1])
  }

  return minSteps
}

// console.log("Sample:", [{ data: sample }].map(solve1))
// console.log("Task:", [{ data: data }].map(solve1))

/// Part 2

const solve2 = ({ data }) => {
  const initialBlizzards = parseBlizzards(data)
  const grid = parseGrid(data)

  const start = [0, 1]
  const finish = [grid.length - 1, grid[0].length - 2]

  const stack = []
  const seen = {}

  const destination = [
    [grid.length - 1, grid[0].length - 2],
    [0, 1],
    [grid.length - 1, grid[0].length - 2],
  ]

  var minSteps = Number.POSITIVE_INFINITY
  var maxSteps = 900

  const minDist = Math.abs(start[0] - finish[0]) + Math.abs(start[1] - finish[1])

  stack.push([[0, 1], initialBlizzards, 0, 0, destination[0]])

  while (stack.length > 0) {
    const [player, blizzards, steps, cycle] = stack.pop()
    const [py, px] = [...player]

    var cycleOffset = 0
    if (cycle === 0) cycleOffset = 2 * minDist
    if (cycle === 1) cycleOffset = minDist

    const distance = Math.abs(py - destination[cycle][0]) + Math.abs(px - destination[cycle][1])

    const key = [steps, py, px, cycle].join(":")
    if (key in seen) continue
    seen[key] = true

    // Dead end
    if (steps + distance + cycleOffset >= minSteps || steps + distance + cycleOffset >= maxSteps) continue
    if (blizzards.find(([y, x]) => y == py && px == x)) continue

    // Update blizzard the movements for next cycle
    const movedBlizzards = blizzards.map((b) => moveBlizzard(b, start, finish))

    if (distance == 0) {
      if (cycle == 0) {
        stack.push([[py, px], movedBlizzards, steps + 1, 1, destination[1]])
      }
      if (cycle == 1) {
        stack.push([[py, px], movedBlizzards, steps + 1, 2, destination[2]])
      }
      if (cycle == 2) {
        minSteps = Math.min(minSteps, steps)
      }

      continue
    }

    // Draws the current snapshot of the game state
    const map = buildMap(grid, player, movedBlizzards)

    // Can player move down?
    if (py + 1 < map.length && map[py + 1][px] === ".") {
      stack.push([[py + 1, px], movedBlizzards, steps + 1, cycle])
    }

    // Can player move up?
    if (py - 1 >= 0 && map[py - 1][px] === ".") {
      stack.push([[py - 1, px], movedBlizzards, steps + 1, cycle])
    }

    // Can player move right?
    if (px + 1 < map[0].length && map[py][px + 1] === ".") {
      stack.push([[py, px + 1], movedBlizzards, steps + 1, cycle])
    }

    // Can player move left?
    if (px - 1 >= 0 && map[py][px - 1] === ".") {
      stack.push([[py, px - 1], movedBlizzards, steps + 1, cycle])
    }

    // Wait for one round
    stack.push([[py, px], movedBlizzards, steps + 1, cycle])
  }

  return minSteps
}

// console.log("Sample:", [{ data: sample }].map(solve2))
console.log("Task:", [{ data: data }].map(solve2))
