import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 19: Beacon Scanner")

/// Part 1

const solve1 = ({ data }) => {
  const hashes = []
  const totalBeacons = data[0].length * data.length

  for (var s = 0; s < data.length; s++) {
    const beacons = data[s]
    for (var b = 0; b < beacons.length; b++) {
      // Calculate distances between beacons to use them as some sort of hash
      const hash = []
      const [cx, cy, cz] = beacons[b]

      for (var bn = 0; bn < beacons.length; bn++) {
        if (b === bn) continue
        const [nx, ny, nz] = beacons[bn]

        const [xDist, yDist, zDist] = [Math.abs(cx - nx), Math.abs(cy - ny), Math.abs(cz - nz)]
        const key = [xDist, yDist, zDist].sort((a, b) => b - a).join("-")

        hash.push(key)
      }

      hashes.push(hash)
    }
  }

  // Find duplicate beacons by comparing hashes
  for (var s = 0; s < data.length; s++) {
    const beacons = hashes[s]
    for (var b = 0; b < beacons.length; b++) {
      // Calculate distances between beacons to use them as some sort of hash
      for (var bn = 0; bn < beacons.length; bn++) {
        if (b === bn) continue
        const [nx, ny, nz] = beacons[bn]

        const [xDist, yDist, zDist] = [Math.abs(cx - nx), Math.abs(cy - ny), Math.abs(cz - nz)]
        const key = [xDist, yDist, zDist].sort((a, b) => b - a).join("-")

        hash.push(key)
      }
    }
  }

  return totalBeacons - duplicates
}

console.log("Sample:", [{ data: sample }].map(solve1))
// console.log("Task:", [{ data: data }].map(solve1))

/// Part 2

const solve2 = ({ data }) => {
  return 0
}

// console.log("Sample:", [{ data: sample }].map(solve2))
// console.log("Task:", [{ data: data }].map(solve2))
