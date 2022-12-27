import _ from "lodash"
import data, { sample, tryout } from "./data.js"

console.log("🎄 Day 22")

/// Part 1
const rotate = {
  R: { R: "D", L: "U" },
  L: { R: "U", L: "D" },
  U: { R: "R", L: "L" },
  D: { R: "L", L: "R" },
}

const solve1 = ({ mapData, moveData }) => {
  const map = mapData.map((row) => row.split(""))
  const trace = mapData.map((row) => row.split(""))
  const move = moveData.map((i) => parseInt(i) || i)

  const [vRight, vDown, vLeft, vUp] = [
    [0, 1], // right
    [1, 0], // down
    [0, -1], // left
    [-1, 0], // up
  ]

  // Find start position x
  const initialX = map[0].findIndex((t) => t === ".")

  // Inital setup
  var [y, x] = [0, initialX]
  var direction, steps

  while (move.length > 0) {
    direction = direction ? rotate[direction][move.shift()] : "R"
    steps = move.shift()

    for (var s = 0; s < steps; s++) {
      if (_.get(map, [y, x], " ") !== ".") throw "Invalid position"
      trace[y][x] = direction
      // We're currently at y,x! Move one step

      var vx, vy, ny, nx
      if (direction === "R") [vy, vx] = vRight
      if (direction === "D") [vy, vx] = vDown
      if (direction === "L") [vy, vx] = vLeft
      if (direction === "U") [vy, vx] = vUp
      ;[ny, nx] = [y + vy, x + vx]

      // Validate the next tile we move to
      var nt = _.get(map, [ny, nx], " ")
      if (nt === "#") break

      if (nt === " ") {
        const row = map[y]
        const col = map.map((r) => r[x])
        var [wy, wx] = [ny, nx]
        if (direction === "R") wx = row.findIndex((t) => t !== " ")
        if (direction === "D") wy = col.findIndex((t) => t !== " ")
        if (direction === "L") wx = row.length - 1 - [...row].reverse().findIndex((t) => t !== " ")
        if (direction === "U") wy = col.length - 1 - [...col].reverse().findIndex((t) => t !== " ")

        // Avoid warping into wall
        var wt = _.get(map, [wy, wx], " ")
        if (wt === "#") break

        // Update nt since we updated the underlaying coordiantes
        ny = wy
        nx = wx
      }

      // Assign new position (warped/moved)
      y = ny
      x = nx
    }
  }

  const row = y + 1
  const col = x + 1
  const facing = "RDLU".indexOf(direction)
  return [1000 * row, 4 * col, facing].reduce((acc, val) => acc + val, 0)
}

console.log("Sample:", [{ mapData: sample[0], moveData: sample[1] }].map(solve1))
console.log("Task:", [{ mapData: data[0], moveData: data[1] }].map(solve1))

/// Part 2

/*
 * Sections:
 *          ###############
 *          # 5    # 6    #
 *          #      #      #
 *          ###############
 *          # 1    #
 *          #      #
 *   ###############
 *   # 2    # 4    #
 *   #      #      #
 *   ###############
 *   # 2    #
 *   #      #
 *   ########
 */

const solve2 = ({ mapData, moveData, sections }) => {
  const map = mapData.map((row) => row.split(""))
  const section = sections.map((row) => row.split("").map((t) => parseInt(t) || 0))
  const trace = mapData.map((row) => row.split(""))
  const move = moveData.map((i) => parseInt(i) || i)

  const secLen = section[0].length / 3

  const secLimit = {
    3: [
      [3 * secLen, 4 * secLen - 1],
      [0 * secLen, 1 * secLen - 1],
    ],
    2: [
      [2 * secLen, 3 * secLen - 1],
      [0 * secLen, 1 * secLen - 1],
    ],
    4: [
      [2 * secLen, 3 * secLen - 1],
      [1 * secLen, 2 * secLen - 1],
    ],
    1: [
      [1 * secLen, 2 * secLen - 1],
      [1 * secLen, 2 * secLen - 1],
    ],
    5: [
      [0 * secLen, 1 * secLen - 1],
      [1 * secLen, 2 * secLen - 1],
    ],
    6: [
      [0 * secLen, 1 * secLen - 1],
      [2 * secLen, 3 * secLen - 1],
    ],
  }

  const [vRight, vDown, vLeft, vUp] = [
    [0, 1], // right
    [1, 0], // down
    [0, -1], // left
    [-1, 0], // up
  ]

  // Find start position x
  const firstFloor = map[0].findIndex((t) => t === ".")

  // Inital setup
  var [y, x] = [0, firstFloor]
  var direction, steps

  while (move.length > 0) {
    direction = direction ? rotate[direction][move.shift()] : "R"
    steps = move.shift()

    for (var s = 0; s < steps; s++) {
      if (_.get(map, [y, x], " ") !== ".") throw "Invalid position"
      trace[y][x] = direction

      // We're currently at y,x! Move one step
      var vx, vy, ny, nx
      if (direction === "R") [vy, vx] = vRight
      if (direction === "D") [vy, vx] = vDown
      if (direction === "L") [vy, vx] = vLeft
      if (direction === "U") [vy, vx] = vUp
      ;[ny, nx] = [y + vy, x + vx]

      // Check if we will pass an edge
      var [sec, nSec] = [_.get(section, [y, x], 0), _.get(section, [ny, nx], 0)]
      if (sec !== nSec) {
        const row = map[y]
        const col = map.map((r) => r[x])

        var [wy, wx] = [ny, nx]
        var nDirection = direction

        if (sec === 5) {
          // if (direction === "R") {
          //   // Move to section 6L; no action
          //   nDirection = "R"
          // }

          // if (direction === "D") {
          //   // Move to section 1U; no action
          //   nDirection = "D"
          // }

          if (direction === "L") {
            // Warp to section 2L 180
            const [nSecYmin, nSecYmax] = secLimit[2][0]
            const [nSecXmin, nSecXmax] = secLimit[2][1]

            nDirection = "R"
            wy = nSecYmax - (y % secLen)
            wx = nSecXmin
          }

          if (direction === "U") {
            // Warp to section 3L -90
            const [nSecYmin, nSecYmax] = secLimit[3][0]
            const [nSecXmin, nSecXmax] = secLimit[3][1]

            nDirection = "R"
            wy = nSecYmin + (x % secLen)
            wx = nSecXmin
          }
        }

        if (sec === 6) {
          if (direction === "R") {
            // Warp to section 4R 180
            const [nSecYmin, nSecYmax] = secLimit[4][0]
            const [nSecXmin, nSecXmax] = secLimit[4][1]

            nDirection = "L"
            wy = nSecYmax - (y % secLen)
            wx = nSecXmax
          }

          if (direction === "D") {
            // Warp to section 1R -90
            const [nSecYmin, nSecYmax] = secLimit[1][0]
            const [nSecXmin, nSecXmax] = secLimit[1][1]

            nDirection = "L"
            wy = nSecYmin + (x % secLen)
            wx = nSecXmax
          }

          // if (direction === "L") {
          //   // Move to section 5R; no action
          //   nDirection = "L"
          // }

          if (direction === "U") {
            // Warp to section 3D 0
            const [nSecYmin, nSecYmax] = secLimit[3][0]
            const [nSecXmin, nSecXmax] = secLimit[3][1]

            nDirection = "U"
            wy = nSecYmax
            wx = nSecXmin + (x % secLen)
          }
        }

        if (sec === 1) {
          if (direction === "R") {
            // Warp to section 6D 90
            const [nSecYmin, nSecYmax] = secLimit[6][0]
            const [nSecXmin, nSecXmax] = secLimit[6][1]

            nDirection = "U"
            wy = nSecYmax
            wx = nSecXmin + (y % secLen)
          }

          // if (direction === "D") {
          //   // Move to section 4U; no action
          //   nDirection = "D"
          // }

          if (direction === "L") {
            // Warp to section 2U 90
            const [nSecYmin, nSecYmax] = secLimit[2][0]
            const [nSecXmin, nSecXmax] = secLimit[2][1]
            nDirection = "D"

            wy = nSecYmin
            wx = nSecXmin + (y % secLen)
          }

          // if (direction === "U") {
          //   // Move to section 5D; no action
          //   nDirection = "U"
          // }
        }

        if (sec === 4) {
          if (direction === "R") {
            // Warp to section 6R 180
            const [nSecYmin, nSecYmax] = secLimit[6][0]
            const [nSecXmin, nSecXmax] = secLimit[6][1]

            nDirection = "L"
            wy = nSecYmax - (y % secLen)
            wx = nSecXmax
          }

          if (direction === "D") {
            // Warp to section 3R -90
            const [nSecYmin, nSecYmax] = secLimit[3][0]
            const [nSecXmin, nSecXmax] = secLimit[3][1]

            nDirection = "L"
            wy = nSecYmin + (x % secLen)
            wx = nSecXmax
          }

          // if (direction === "L") {
          //   // Move to section 2R; no action
          //   nDirection = "L"
          // }

          // if (direction === "U") {
          //   // Move to section 1D; no action
          //   nDirection = "U"
          // }
        }

        if (sec === 2) {
          // if (direction === "R") {
          //   // Move to section 4L; no action
          //   nDirection = "R"
          // }

          // if (direction === "D") {
          //   // Move to section 3U; no action
          //   nDirection = "D"
          // }

          if (direction === "L") {
            // Warp to section 5L 180
            const [nSecYmin, nSecYmax] = secLimit[5][0]
            const [nSecXmin, nSecXmax] = secLimit[5][1]

            nDirection = "R"
            wy = nSecYmax - (y % secLen)
            wx = nSecXmin
          }

          if (direction === "U") {
            // Warp to section 1L -90
            const [nSecYmin, nSecYmax] = secLimit[1][0]
            const [nSecXmin, nSecXmax] = secLimit[1][1]

            nDirection = "R"
            wy = nSecYmin + (x % secLen)
            wx = nSecXmin
          }
        }

        if (sec === 3) {
          if (direction === "R") {
            // Warp to section 4D 90
            const [nSecYmin, nSecYmax] = secLimit[4][0]
            const [nSecXmin, nSecXmax] = secLimit[4][1]

            nDirection = "U"
            wy = nSecYmin
            wx = nSecXmin + (y % secLen)
          }

          if (direction === "D") {
            // Warp to section 6U 0
            const [nSecYmin, nSecYmax] = secLimit[6][0]
            const [nSecXmin, nSecXmax] = secLimit[6][1]

            nDirection = "D"
            wy = nSecYmin
            wx = nSecXmin + (x % secLen)
          }

          if (direction === "L") {
            // Warp to section 5U 90
            const [nSecYmin, nSecYmax] = secLimit[5][0]
            const [nSecXmin, nSecXmax] = secLimit[5][1]

            nDirection = "D"
            wy = nSecYmin
            wx = nSecXmin + (y % secLen)
          }

          // if (direction === "U") {
          //   // Move to section 2D; no action
          //   nDirection = "U"
          // }
        }

        // Avoid warping into wall
        var wt = _.get(map, [wy, wx], " ")
        if (wt === "#") break

        // Update nt since we updated the underlaying coordiantes
        direction = nDirection
        ny = wy
        nx = wx
      }

      // Validate the next tile we move to
      var nt = _.get(map, [ny, nx], " ")
      if (nt === "#") break

      // Assign new position (warped/moved)
      y = ny
      x = nx
    }
  }

  const row = y + 1
  const col = x + 1
  const facing = "RDLU".indexOf(direction)
  return [1000 * row, 4 * col, facing].reduce((acc, val) => acc + val, 0)
}

 // < 96215

console.log("Sample:", [{ mapData: tryout[0], moveData: tryout[1], sections: tryout[2] }].map(solve2))
// console.log("Task:", [{ mapData: data[0], moveData: data[1], sections: data[2] }].map(solve2))
