import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 19: Beacon Scanner")

/// Part 1

const solve1 = ({ data }) => {
  const hashes = []
  const totalBeacons = data[0].length * data.length
  const rotate = ([x, y, z]) => [
    [x, y, z],
    [x, z, -y],
    [x, -y, -z],
    [x, -z, y],
    [-x, -y, z],
    [-x, z, y],
    [-x, y, -z],
    [-x, -z, -y],
    [y, z, x],
    [y, x, -z],
    [y, -z, -x],
    [y, -x, z],
    [-y, -z, x],
    [-y, x, z],
    [-y, z, -x],
    [-y, -x, -z],
    [z, x, y],
    [z, y, -x],
    [z, -x, -y],
    [z, -y, x],
    [-z, -x, y],
    [-z, y, x],
    [-z, x, -y],
    [-z, -y, -x],
  ]

  for (var s = 0; s < data.length; s++) {
    const beacons = data[s]
    for (var b = 0; b < beacons.length; b++) {
      // Calculate distances between beacons to use them as some sort of hash
      const [cx, cy, cz] = beacons[b]
      const cubeHash = []

      for (var bn = 0; bn < beacons.length; bn++) {
        if (b === bn) continue
        const [nx, ny, nz] = beacons[bn]
        const rotations = rotate([nx, ny, nz])
        const hash = []

        // Rotate point to all posible rotations
        for (const [rx, ry, rz] of rotations) {
          const [xDist, yDist, zDist] = [Math.abs(cx - rx), Math.abs(cy - ry), Math.abs(cz - rz)]
          const key = [xDist, yDist, zDist].sort((a, b) => b - a).join("-")
          hash.push(key)
        }
        cubeHash.push(hash)
      }
      hashes.push(cubeHash)
    }
  }

  // Find duplicate beacons by comparing hashes
  for (var s = 0; s < data.length; s++) {
    const beacons = hashes[s]
    for (var b = 0; b < beacons.length; b++) {
      // Calculate distances between beacons to use them as some sort of hash
      for (var bn = 0; bn < beacons.length; bn++) {}
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
