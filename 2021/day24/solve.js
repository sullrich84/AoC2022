import _ from "lodash"
import data, { sample, data2 } from "./data.js"

console.log("🎄 Day 24: Arithmetic Logic Unit")

/// Part 1

const ops = {
  add: (a, b) => a + b,
  mul: (a, b) => a * b,
  div: (a, b) => (a / b) | 0,
  mod: (a, b) => a % b,
  eql: (a, b) => (a === b ? 1 : 0),
}

const calcMonad = (number, instructions, x = 0, y = 0, z = 0) => {
  const res = { w: number, x, y, z }

  for (const [op, v1, v2] of instructions) {
    if (op === "inp") res[v1] = number
    else res[v1] = ops[op](res[v1], v2 in res ? res[v2] : v2)
  }

  return res.z
}

const solve1 = ({ data }) => {
  const validCache = {}
  const instructions = _.chunk(data, 18)
  const lookup = _.times(instructions.length, () => ({ w: [], x: [], y: [], z: [] }))

  for (var i = 0; i < instructions.length; i++) {
    for (var w = 1; w <= 9; w++) {
      for (var x = -26; x <= 26; x++) {
        for (var y = -26; y <= 26; y++) {
          for (var z = -26; z <= 26; z++) {
            const result = calcMonad(w, instructions[i], x, y, z)
            if (result === 0) {
              lookup[i] = {
                w: _.uniq([...lookup[i].w, w]),
                x: _.uniq([...lookup[i].x, x]),
                y: _.uniq([...lookup[i].y, y]),
                z: _.uniq([...lookup[i].z, z]),
              }
            }
          }
        }
      }
    }
  }

  // lookup.w = _.uniq(lookup.w)
  // lookup.x = _.uniq(lookup.x)
  // lookup.y = _.uniq(lookup.y)
  // lookup.z = _.uniq(lookup.z)

  return
}

console.log("Sample:", [{ data: data }].map(solve1))
// console.log("Task:", [{ data: data }].map(solve1))

/// Part 2

const solve2 = ({ data }) => {
  return 0
}

// console.log("Sample:", [{ data: sample }].map(solve2))
// console.log("Task:", [{ data: data }].map(solve2))
