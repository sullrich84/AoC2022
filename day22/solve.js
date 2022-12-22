import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 22")

/// Part 1

const tiles = {
  void: "░",
  floor: ".",
  wall: "#",
}

const rotate = {
  R: {
    R: "D",
    L: "U",
    facing: 0,
  },
  L: {
    R: "U",
    L: "D",
    facing: 2,
  },
  U: {
    R: "R",
    L: "L",
    facing: 3,
  },
  D: {
    R: "L",
    L: "R",
    facing: 1,
  },
}

const nextPosition = (map, dir, [y, x]) => {
  switch (dir) {
    case "R":
      var xx = x + 1
      if (xx > map[y].length - 1) {
        return warp(map, dir, [x, y])
      }
      return [y, xx]
    case "L":
      var xx = x - 1
      if (xx < 0) {
        return warp(map, dir, [x, y])
      }
      return [y, xx]
    case "U":
      var yy = y - 1
      if (yy < 0) {
        return warp(map, dir, [x, y])
      }
      return [yy, x]
    case "D":
      var yy = y + 1
      if (yy > map.length - 1) {
        return warp(map, dir, [x, y])
      }
      return [yy, x]
  }
}

const getTile = (map, [y, x]) => {
  return map[y][x]
}

const warp = (map, dir, [y, x]) => {
  if (dir === "R") {
    return [y, map[y].findIndex((t) => t !== tiles.void)]
  }

  if (dir === "L") {
    const r = [...map[y]]
    return [y, r.length - 1 - r.reverse().findIndex((t) => t !== tiles.void)]
  }

  if (dir === "U") {
    const c = map.map((r) => r[x]).reverse()
    return [map.length - 1 - c.findIndex((t) => t !== tiles.void), x]
  }

  if (dir === "D") {
    const c = map.map((r) => r[x])
    return [c.findIndex((t) => t !== tiles.void), x]
  }
}

const solve1 = ({ mapData, moveData }) => {
  const map = []
  mapData.forEach((row) => {
    map.push(row.split("").map((t) => (t === " " ? tiles.void : t)))
  })

  var pos = [0, map[0].findIndex((t) => t !== tiles.void)]
  const move = ["R", ...moveData]
  var [dir, steps] = [move.shift(), parseInt(move.shift())]

  while (move.length > 0) {
    console.log(`Moving ${steps} steps ${dir}`)

    for (var s = 0; s < steps; s++) {
      if (map[pos[0]][pos[1]] !== tiles.floor) {
        throw "invalid move"
      }

      console.log("Moved to", pos)
      var nextPos = nextPosition(map, dir, pos)
      var nextTile = getTile(map, nextPos)

      if (nextTile === tiles.wall) {
        // Hit a wall => stop
        break
      } else if (nextTile === tiles.floor) {
        // Move
        pos = nextPos
      } else if (nextTile === tiles.void) {
        // Warp
        const warpTarget = warp(map, dir, pos)
        if (map[warpTarget[0]][warpTarget[1]] !== tiles.floor) {
          // Warp => Hit a wall
          break
        }
        // Safe to warp
        pos = warpTarget
      }
    }

    const nextDir = move.shift()
    dir = rotate[dir][nextDir]
    steps = parseInt(move.shift())
  }

  const row = pos[0] + 1
  const col = pos[1] + 1
  const facing = rotate[dir].facing

  return [1000 * row, 4 * col, facing].reduce((acc, val) => acc + val, 0)
}

// < 200010

const sRes1 = 0 //[{ mapData: sample[0], moveData: sample[1] }].map(solve1)
const res1 = [{ mapData: data[0], moveData: data[1] }].map(solve1)

console.log("Sample:", sRes1, "Task:", res1)

/// Part 2

const solve2 = (input) => {
  console.log(input)
  return 0
}

const sRes2 = 0 // [{ data: sample }].map(solve2)
const res2 = 0 //[{ data: data }].map(solve2)

console.log("Sample:", sRes2, "Task:", res2)
