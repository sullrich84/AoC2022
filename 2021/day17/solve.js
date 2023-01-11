import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 17: Trick Shot")

/// Part 1

const solve1 = ({ data }) => {
  const [[txStart, txEnd], [tyStart, tyEnd]] = data
  const trajectories = []
  const history = {}

  for (var y = 0; y < 9000; y++) {
    for (var x = 1; x <= txEnd; x++) {
      var [vy, vx] = [y, x]
      var [py, px] = [0, 0]
      const trajectory = []
      // console.log("Testing angle ", [vy, vx])

      sim: for (var s = 0; s < 100; s++) {
        var [ny, nx] = [py + vy, px + vx]
        // console.log("Probe at", [ny, nx])
        trajectory.push([ny, nx])

        // Check if hit
        if (ny <= tyStart && ny >= tyEnd && nx >= txStart && nx <= txEnd) {
          // console.log("HIT!")
          trajectories.push(trajectory)
          history[`${y}, ${x}`] = _.max(trajectory.map(([y]) => y))
          break sim
        }

        // Check if missed
        if (ny < tyEnd) {
          // console.log("MISS! (too low)")
          break sim
        }

        if (nx > txEnd) {
          // console.log("MISS! (too high)")
          break sim
        }

        // Apply drag
        vx = vx === 0 ? 0 : vx > 0 ? vx - 1 : vx + 1
        vy -= 1
        ;[py, px] = [ny, nx]
      }
    }
  }

  return _.max(trajectories.map((t) => _.max(t.map(([y]) => y))))
}

// console.log("Sample:", [{ data: sample }].map(solve1))
console.log("Task:", [{ data: data }].map(solve1))

/// Part 2

const solve2 = ({ data }) => {
  return 0
}

// console.log("Sample:", [{ data: sample }].map(solve2))
// console.log("Task:", [{ data: data }].map(solve2))
