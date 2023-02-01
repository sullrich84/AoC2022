import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 24: Arithmetic Logic Unit")

/// Part 1

const ops = {
  add: (v1, v2) => v1 + v2,
  mul: (v1, v2) => v1 * v2,
  div: (v1, v2) => {
    if (v2 === 0) throw new Error("Invalid division")
    return Math.floor(v1 / v2)
  },
  mod: (v1, v2) => {
    if (v1 < 0 || v2 <= 0) throw new Error("Invalid modulo")
    return v1 % v2
  },
  eql: (v1, v2) => (v1 === v2 ? 1 : 0),
}

const solve1 = ({ data }) => {
  const validCache = {}

  function isValid(number) {
    const res = { w: 0, x: 0, y: 0, z: 0 }

    const numStr = number.toString()
    if (numStr.length !== 14 || numStr.includes("0")) return false
    var monad = numStr.split("").map((c) => parseInt(c))

    for (const [op, v1, v2] of data) {
      if (op === "inp") res[v1] = monad.shift()
      else res[v1] = ops[op](res[v1], v2 in res ? res[v2] : v2)
    }

    return res.z
  }

  const [start, end] = [11111111111111, 99999999999999]

  for (var i = start; i < end; i++) {
    if (isValid(i) === 0) debugger
  }

  // 99999999999999 = 7645130736
  // 88888888888888 = 7323858329
  // 77777777777777 = 7002585922
  // 66666666666666 = 6681313515
  // 55555555555555 = 6360041108
  // 44444444444444 = 6038768701
  // 33333333333333 = 5717496294
  // 22222222222222 = 5396223887
  // 11111111111111 = 5396223887
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
