import _ from "lodash"
import data, { sample, sample2 } from "./data.js"

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
        return warp(map, dir, [y, x])
      }
      return [y, xx]
    case "L":
      var xx = x - 1
      if (xx < 0) {
        return warp(map, dir, [y, x])
      }
      return [y, xx]
    case "U":
      var yy = y - 1
      if (yy < 0) {
        return warp(map, dir, [y, x])
      }
      return [yy, x]
    case "D":
      var yy = y + 1
      if (yy > map.length - 1) {
        return warp(map, dir, [y, x])
      }
      return [yy, x]
  }
}

const getTile = (map, [y, x]) => {
  return map[y][x]
}

const preview = (map) => {
  map.forEach((col) => {
    console.log(col.join(""))
  })
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

  const trace = []
  mapData.forEach((row) => {
    trace.push(row.split("").map((t) => (t === " " ? tiles.void : t)))
  })

  var pos = [0, map[0].findIndex((t) => t !== tiles.void)]
  var dir = "U"
  const move = ["R", ...moveData]
  /// Move along all the commands

  while (move.length > 0) {
    const nextDir = move.shift()
    // console.log(`Facing ${dir} now turning ${nextDir}`)
    dir = rotate[dir][nextDir]
    // console.log(`Now facing ${dir}`)
    var steps = parseInt(move.shift())

    for (var s = 0; s < steps; s++) {
      if (map[pos[0]][pos[1]] !== tiles.floor) {
        throw "invalid move"
      }

      // console.log("Moved to", pos)
      var nextPos = nextPosition(map, dir, pos)
      var nextTile = getTile(map, nextPos)

      if (nextTile === tiles.wall) {
        // Hit a wall => stop
        // console.log("Hot wall, end")
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

      trace[pos[0]][pos[1]] = "•"
    }
  }

  const row = pos[0] + 1
  const col = pos[1] + 1
  const facing = rotate[dir].facing

  console.log("row", row)
  console.log("col", col)
  console.log("facing", facing)

  return [1000 * row, 4 * col, facing].reduce((acc, val) => acc + val, 0)
}

// 109100 < 109102 < 200010

const sRes1 = [{ mapData: sample2[0], moveData: sample2[1] }].map(solve1)
const res1 = 0 //[{ mapData: data[0], moveData: data[1] }].map(solve1)

console.log("Sample:", sRes1, "Task:", res1)

/// Part 2

const solve2 = (input) => {
  console.log(input)
  return 0
}

const sRes2 = 0 // [{ data: sample }].map(solve2)
const res2 = 0 //[{ data: data }].map(solve2)

console.log("Sample:", sRes2, "Task:", res2)
