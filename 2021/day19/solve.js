import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 19: Beacon Scanner")

/// Part 1

const solve1 = ({ data }) => {
  const hashes = {}
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
      const [cx, cy, cz] = beacons[b]

      for (var nb = 0; nb < beacons.length; nb++) {
        if (b === nb) continue
        const [nx, ny, nz] = beacons[nb]
        const rotations = rotate([nx, ny, nz])

        // Rotate point to all posible rotations
        for (var r = 0; r < rotations.length; r++) {
          const [rx, ry, rz] = rotations[r]

          // Calculate distances between beacons to use them as some sort of hash
          const [xDist, yDist, zDist] = [Math.abs(cx - rx), Math.abs(cy - ry), Math.abs(cz - rz)]
          const key = [xDist, yDist, zDist].sort((a, b) => b - a).join("-")

          _.set(hashes, [`s${s}`, `r${r}`, nb], key)
        }
      }
    }
  }

  for (const [name, rotations] of _.entries(hashes)) {
    for (const [id, rotation] of _.entries(rotations)) {
      const next = _.omit(hashes, [name])

      for (const [nName, nRotations] of _.entries(next)) {
        for (const [nId, nRotation] of _.entries(nRotations)) {
          const common = _.intersection(rotation, nRotation)
          console.log(`${name}.${id} ∩ ${nName}.${nId}`, common.length)
        }
      }
    }
  }

  return 0
}

console.log("Sample:", [{ data: sample }].map(solve1))
// console.log("Task:", [{ data: data }].map(solve1))

/// Part 2

const solve2 = ({ data }) => {
  return 0
}

// console.log("Sample:", [{ data: sample }].map(solve2))
// console.log("Task:", [{ data: data }].map(solve2))
