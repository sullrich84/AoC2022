import _ from "lodash"
import * as math from "mathjs"
import data, { sample } from "./data.js"

console.log("🎄 Day 24: Blizzard Basin")

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

const vectors = [
  [0, -1], // left
  [0, +1], // right
  [-1, 0], // up
  [+1, 0], // down
]

const buildBlizzardStates = (data) => {
  // left, right, up, down
  const blizzards = [[], [], [], []]

  // Build groups of blizzards directions
  for (const [y, row] of data.entries()) {
    const chars = row.split("")
    for (const [x, char] of chars.entries()) {
      const bt = "<>^v".indexOf(char)
      if (bt !== -1) blizzards[bt].push([y, x])
    }
  }

  const height = data.length
  const width = data[0].length

  var initialState = JSON.stringify(blizzards)
  var blizzardStates = [blizzards]

  // Find repeating pattern for blizzards
  while (true) {
    const prev = blizzardStates.at(-1)
    const curr = [[], [], [], []]

    for (const [dir, dirBlizzards] of prev.entries()) {
      const [vy, vx] = vectors[dir]
      for (const [by, bx] of dirBlizzards) {
        var [ny, nx] = [by + vy, bx + vx]
        if (ny === 0) ny = height - 2
        if (ny === height - 1) ny = 1
        if (nx === 0) nx = width - 2
        if (nx === width - 1) nx = 1
        curr[dir].push([ny, nx])
      }
    }

    if (initialState === JSON.stringify(curr)) break
    blizzardStates.push(curr)
  }

  return blizzardStates
    .map((s) => _.flatten(s))
    .map((state) => {
      var mStates = _.times(height, () => _.times(width, () => 0))
      state.forEach(([y, x]) => {
        mStates[y][x] = mStates[y][x] + 1
      })
      return mStates
    })
}

const solve1 = ({ data }) => {
  const blizzardStates = buildBlizzardStates(data)
  const grid = parseGrid(data)

  const height = data.length
  const width = data[0].length

  const start = [0, 1]
  const finish = [grid.length - 1, grid[0].length - 2]

  const stack = []
  const seen = {}

  var minSteps = Number.POSITIVE_INFINITY

  stack.push([start, 0])

  while (stack.length > 0) {
    const [player, steps] = stack.shift()
    const [py, px] = [...player]

    const key = [steps, py, px].join(":")
    if (key in seen) continue
    seen[key] = true

    const currBlizzState = blizzardStates[steps % blizzardStates.length]
    const nextBlizzState = blizzardStates[(steps + 1) % blizzardStates.length]
    const distance = Math.abs(py - finish[0]) + Math.abs(px - finish[1])

    if (distance == 0) {
      minSteps = Math.min(minSteps, steps)
      continue
    }

    // Dead end
    if (steps + distance >= minSteps) continue
    if (currBlizzState[py][px] !== 0) debugger

    // Wait for one round
    if (nextBlizzState[py][px] === 0) {
      stack.push([[py, px], steps + 1])
    }

    directions: for (const [vy, vx] of vectors) {
      var [npy, npx] = [py + vy, px + vx]
      var tile = _.get(grid, [npy, npx], "#")

      if (tile === "#" || !_.inRange(npy, 0, height) || !_.inRange(npx, 0, width) || nextBlizzState[npy][npx] !== 0) {
        continue directions
      }

      stack.push([[npy, npx], steps + 1])
    }

    // Sort the stack to have the most promising state on top
    stack.sort(([[py, px], steps]) => steps + Math.abs(py - finish[0]) + Math.abs(px - finish[1]))
  }

  return minSteps
}

console.log("Sample:", [{ data: sample }].map(solve1))
console.log("Task:", [{ data: data }].map(solve1))

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

console.log("Sample:", [{ data: sample }].map(solve2))
console.log("Task:", [{ data: data }].map(solve2))
