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

  const buildPairs = (arr) => _.flatMap(arr, (a, ai) => _.map(arr.slice(ai + 1), (b, bi) => [a, b, ai, bi]))

  // Compute distances between each beacon of every scanner for all possible rotations
  for (var r = 0; r < rotate.length; r++) {
    for (var s = 0; s < data.length; s++) {
      const pairs = buildPairs(data[s])
      const sHashes = pairs
        .map(([[ax, ay, az], [bx, by, bz], ai, bi]) => [[ax - bx, ay - by, az - bz], `s${s}:b${ai}`, `s${s}:b${bi}`])
        .map(([[dx, dy, dz], ai, bi]) => [rotate[r]([dx, dy, dz]), ai, bi])
        .map(([[dx, dy, dz], ai, bi]) => [[Math.abs(dx), Math.abs(dy), Math.abs(dz)], ai, bi])
        .map(([[dx, dy, dz], ai, bi]) => [[dx, dy, dz].join("-"), ai, bi])

      _.set(hashes, [`s${s}`, `r${r}`], sHashes)
    }
  }

  // Create list of ids and assume they are uniqe
  const scanners = data.length
  const beacons = data[0].length

  const uniqueBeacons = new Set(_.flatten(_.times(scanners, (s) => _.times(beacons, (b) => `s${s}b${b}`))))
  // const duplicateBeacons = new Set()

  _.mapValues(hashes, (a, an) => {
    _.mapValues(hashes, (b, bn) => {
      if (an === bn) return
      const aHashes = a.r0.map(([hash]) => hash)

      const overlapping =
        _.values(b).find((bRx) => {
          const bHashes = bRx.map(([hash]) => hash)
          return _.intersection(aHashes, bHashes)
        }) || []

      if (overlapping.length >= 66) {
        console.log(`Scanner ${an} and ${bn} have overlapping detection regions`)
      } else {
        console.log(`Scanner ${an} and ${bn} have no overlapping detection regions`)
      }
    })
  })

  return uniqueBeacons.size
}

console.log("Sample:", [{ data: sample }].map(solve1))
console.log("Task:", [{ data: data }].map(solve1))

/// Part 2

const solve2 = ({ data }) => {
  return 0
}

// console.log("Sample:", [{ data: sample }].map(solve2))
// console.log("Task:", [{ data: data }].map(solve2))
