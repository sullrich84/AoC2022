import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 24: Blizzard Basin")

/// Part 1

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

const vectors = [
  [0, -1], // left
  [0, +1], // right
  [-1, 0], // up
  [+1, 0], // down
]

const calcDist = ([ay, ax], [by, bx]) => {
  return Math.abs(ay - by) + Math.abs(ax - bx)
}

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
  const seen = new Set()

  var minSteps = Number.POSITIVE_INFINITY
  stack.push([start, 0])

  while (stack.length > 0) {
    const [player, steps] = stack.shift()
    const [py, px] = [...player]

    const key = [steps, py, px].join(":")
    if (seen.has(key)) continue
    seen.add(key)

    const nextBlizzState = blizzardStates[(steps + 1) % blizzardStates.length]
    const distance = calcDist([py, px], finish)

    if (distance == 0) {
      minSteps = Math.min(minSteps, steps)
      continue
    }

    // Dead end
    if (steps + distance >= minSteps) continue

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
  const blizzardStates = buildBlizzardStates(data)
  const grid = parseGrid(data)

  const height = data.length
  const width = data[0].length

  const start = [0, 1]
  const finish = [grid.length - 1, grid[0].length - 2]
  const dest = [finish, start, finish]

  const stack = []
  const seen = new Set()

  var minSteps = [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
  stack.push([start, 0, 0])

  while (stack.length > 0) {
    const [player, steps, cycle] = stack.shift()
    const [py, px] = [...player]
    const [dy, dx] = dest[cycle]

    const key = [steps, py, px].join(":")
    if (seen.has(key)) continue
    seen.add(key)

    const nextBlizzState = blizzardStates[(steps + 1) % blizzardStates.length]
    const distance = calcDist([py, px], [dy, dx])

    if (distance == 0) {
      if (cycle < 2) {
        stack.push([player, steps + 1, cycle + 1])
        stack.sort(([[py, px], stps, cycl]) => stps + Math.abs(py - dest[cycl][0]) + Math.abs(px - dest[cycl][1]))
      }

      minSteps[cycle] = Math.min(minSteps[cycle], steps)
      continue
    }

    // Dead end
    if (steps + distance >= minSteps[cycle]) continue

    // Wait for one round
    if (nextBlizzState[py][px] === 0) {
      stack.push([[py, px], steps + 1, cycle])
    }

    directions: for (const [vy, vx] of vectors) {
      var [npy, npx] = [py + vy, px + vx]
      var tile = _.get(grid, [npy, npx], "#")

      if (tile === "#" || !_.inRange(npy, 0, height) || !_.inRange(npx, 0, width) || nextBlizzState[npy][npx] !== 0) {
        continue directions
      }

      stack.push([[npy, npx], steps + 1, cycle])
    }

    // Sort the stack to have the most promising state on top
    stack.sort(([[py, px], stps, cycl]) => stps + Math.abs(py - dest[cycl][0]) + Math.abs(px - dest[cycl][1]))
  }

  return minSteps[2]
}

console.log("Sample:", [{ data: sample }].map(solve2))
console.log("Task:", [{ data: data }].map(solve2))
