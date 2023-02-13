import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 19: Beacon Scanner")

/// Part 1

const solve1 = ({ data }) => {
  const hashes = {}
  const rotate = [
    ([x, y, z]) => [x, y, z],
    ([x, y, z]) => [x, z, -y],
    ([x, y, z]) => [x, -y, -z],
    ([x, y, z]) => [x, -z, y],
    ([x, y, z]) => [-x, -y, z],
    ([x, y, z]) => [-x, z, y],
    ([x, y, z]) => [-x, y, -z],
    ([x, y, z]) => [-x, -z, -y],
    ([x, y, z]) => [y, z, x],
    ([x, y, z]) => [y, x, -z],
    ([x, y, z]) => [y, -z, -x],
    ([x, y, z]) => [y, -x, z],
    ([x, y, z]) => [-y, -z, x],
    ([x, y, z]) => [-y, x, z],
    ([x, y, z]) => [-y, z, -x],
    ([x, y, z]) => [-y, -x, -z],
    ([x, y, z]) => [z, x, y],
    ([x, y, z]) => [z, y, -x],
    ([x, y, z]) => [z, -x, -y],
    ([x, y, z]) => [z, -y, x],
    ([x, y, z]) => [-z, -x, y],
    ([x, y, z]) => [-z, y, x],
    ([x, y, z]) => [-z, x, -y],
    ([x, y, z]) => [-z, -y, -x],
  ]

  for (var r = 0; r < rotate.length; r++) {
    for (var s = 0; s < data.length; s++) {
      const beacons = data[s]

      for (var b = 0; b < beacons.length; b++) {
        // Static reference point
        const [ax, ay, az] = beacons[b]

        // Calculate distance between A and B and use it as some sort of hash
        for (var nb = 0; nb < beacons.length; nb++) {
          // Skip self comparison
          if (b === nb) continue

          const [bx, by, bz] = beacons[nb]
          const [rax, ray, raz] = rotate[r]([ax, ay, az])
          const [rbx, rby, rbz] = rotate[r]([bx, by, bz])

          const [xd, yd, zd] = [Math.abs(rax - rbx), Math.abs(ray - rby), Math.abs(raz - rbz)]
          const key = [xd, yd, zd].join("-")

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
    ent
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
