import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 10: Syntax Scoring")

const start = ["(", "[", "{", "<"]
const close = [")", "]", "}", ">"]

/// Part 1

const solve1 = ({ data }) => {
  var errorScore = 0

  const points = [3, 57, 1197, 25137]
  const stack = []

  ll: for (const line of data) {
    lc: for (const char of line) {
      if (start.includes(char)) {
        stack.push(char)
        continue lc
      }

      if (start.indexOf(_.last(stack)) === close.indexOf(char)) {
        stack.pop()
        continue lc
      }

      // Sequence is corrupted
      errorScore += points[close.indexOf(char)]
      continue ll
    }
  }

  return errorScore
}

console.log("Sample:", [{ data: sample }].map(solve1))
console.log("Task:", [{ data: data }].map(solve1))

/// Part 2

const solve2 = ({ data }) => {
  const score = []

  ll: for (const line of data) {
    const wait = []
    const seen = []

    lc: for (const char of line) {
      if (start.includes(char)) {
        seen.push(char)
        wait.unshift(close[start.indexOf(char)])
        continue lc
      }

      if (start.indexOf(_.last(seen)) === close.indexOf(char)) {
        seen.pop()
        wait.shift()
        continue lc
      }

      // Sequence is corrupted
      wait.length = 0
      break lc
    }

    if (wait.length === 0) continue ll
    score.push(wait.map((c) => close.indexOf(c) + 1).reduce((p, c) => p * 5 + c, 0))
  }

  score.sort((a, b) => b - a)
  return score[Math.floor(score.length / 2)]
}

console.log("Sample:", [{ data: sample }].map(solve2))
console.log("Task:", [{ data: data }].map(solve2))
