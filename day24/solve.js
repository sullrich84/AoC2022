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
      // if ((x != sx && yy < 1) || (x == sx && yy < 0)) {
      if (yy < 1) {
        // Warp to end
        yy = ey - 1
      }
      return [yy, x, dir]

    case "v":
      var yy = y + 1
      // if ((x != ex && yy >= ey) || (x == ex && yy >= ey + 1)) {
      if (yy >= ey) {
        // Warp to start
        yy = 1
      }
      return [yy, x, dir]

    case "<":
      var xx = x - 1
      if (xx < 1) {
        // Warp to end
        xx = ex
      }
      return [y, xx, dir]

    case ">":
      var xx = x + 1
      if (xx > ex) {
        // Warp to start
        xx = 1
      }
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
  const end = [grid.length - 1, grid[0].length - 2]

  const seen = {}
  const stack = []
  const needed = []

  stack.push([[3, 3], initialBlizzards, 0])

  while (stack.length > 0) {
    const [player, blizzards, minute] = stack.pop()

    const key = [minute, player.join(":"), blizzards.map((b) => b.join(":")).join()].join("/")
    if (key in seen) continue
    seen[key] = true

    const [py, px] = [...player]

    // Dead end
    // if (blizzards.find(([y, x]) => y == py && px == x)) {
    //   continue
    // }

    // Target reached
    if (py == end[0] && py == end[1]) {
      needed.push(minute)
      continue
    }

    // // Draws the current snapshot of the game state
    const map = buildMap(grid, player, blizzards)

    // Update blizzard the movements for next cycle
    const movedBlizzards = blizzards.map((b) => moveBlizzard(b, start, end))

    // Can player move down?
    if (py < end[0] - 1 || px == end[1]) {
      console.log("down")
      // stack.push([[py + 1, px], movedBlizzards, minute + 1])
    }

    // Can player move up?
    if (py > 1 || (py > 0 && px == start[1])) {
      console.log("up")
      // stack.push([[py - 1, px], movedBlizzards, minute + 1])
    }

    // Can player move left?
    if (px > 1 && py > 0) {
      console.log("left")
      // stack.push([[py, px - 1], movedBlizzards, minute + 1])
    }

    // Can player move right?
    if (px < end[1] && py > 0) {
      console.log("right")
      // stack.push([[py, px + 1], movedBlizzards, minute + 1])
    }

    stack.push([player, blizzards, minute + 1])
  }

  return 0
}

console.log("Sample:", [{ data: sample }].map(solve1))
// console.log("Task:", [{ data: data }].map(solve1))

/// Part 2

const solve2 = (input) => {
  console.log(input)
  return 0
}

// console.log("Sample:", [{ data: sample }].map(solve2))
// console.log("Task:", [{ data: data }].map(solve2))
