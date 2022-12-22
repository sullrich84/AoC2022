import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 22")

/// Part 1

const tiles = {
  void: " ",
  floor: ".",
  wall: "#",
}

const rotate = {
  R: {
    R: "D",
    L: "U",
    facing: 0,
    symbol: "→",
  },
  L: {
    R: "U",
    L: "D",
    facing: 2,
    symbol: "←",
  },
  U: {
    R: "R",
    L: "L",
    facing: 3,
    symbol: "↑",
  },
  D: {
    R: "L",
    L: "R",
    facing: 1,
    symbol: "↓",
  },
}

const solve1 = ({ mapData, moveData }) => {
  const map = []
  mapData.forEach((row) => {
    map.push(row.split(""))
  })

  const trace = []
  mapData.forEach((row) => {
    trace.push(row.split("").map((t) => (t === " " ? tiles.void : t)))
  })

  const nextPosition = (dir, [y, x]) => {
    switch (dir) {
      case "R":
        if (x + 1 > map[y].length - 1) return warp(dir, [y, x])
        return [y, x + 1]
      case "L":
        if (x - 1 < 0) return warp(dir, [y, x])
        return [y, x - 1]
      case "U":
        if (y - 1 < 0) return warp(dir, [y, x])
        return [y - 1, x]
      case "D":
        if (y + 1 > map.length - 1) return warp(dir, [y, x])
        return [y + 1, x]
    }
  }

  const warp = (dir, [y, x]) => {
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

  var pos = [0, map[0].findIndex((t) => t !== tiles.void)]
  const move = [...moveData]

  while (move.length > 0) {
    var [nextDir, steps] = [dir == null ? "R" : move.shift(), parseInt(move.shift())]
    var dir = dir != null ? rotate[dir][nextDir] : "R"

    for (var s = 0; s < steps; s++) {
      const [y, x] = pos
      if (map[y][x] !== tiles.floor) throw "invalid move"

      // Visualization + Debug :)
      trace[y][x] = rotate[dir].symbol
      // console.log(`(${s + 1}/${steps}) Standing on (${y}, ${x}) facing ${dir}`)

      const [ny, nx] = nextPosition(dir, pos)

      // Hit a wall
      if (map[ny][nx] === tiles.wall) break

      // Set new position for next round
      if (map[ny][nx] === tiles.floor) pos = [ny, nx]

      if (map[ny][nx] === tiles.void) {
        // Warped into wall. Stay where we are end end round
        const [wy, wx] = warp(dir, pos)
        if (map[wy][wx] !== tiles.floor) break

        // Set warped target for next round
        pos = [wy, wx]
      }
    }
  }

  const row = pos[0] + 1
  const col = pos[1] + 1
  const facing = rotate[dir].facing

  // console.log(trace.map((t) => t.join("")))

  return [1000 * row, 4 * col, facing].reduce((acc, val) => acc + val, 0)
}

const sRes1 = [{ mapData: sample[0], moveData: sample[1] }].map(solve1) // 109094
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
