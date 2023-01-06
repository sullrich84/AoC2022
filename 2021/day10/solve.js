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

      const expected = close[start.indexOf(_.last(stack))]
      console.log(`Expected '${expected}' but found '${char}' instead.`)
      errorScore += points[close.indexOf(char)]
      continue ll
    }
  }

  return errorScore
}

// console.log("Sample:", [{ data: sample }].map(solve1))
// console.log("Task:", [{ data: data }].map(solve1))

/// Part 2

const solve2 = ({ data }) => {
  const wait = []
  const seen = []
  const score = []

  ll: for (const line of data) {
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
    }

    if (wait.length > 0) {
      console.log(`Complete by adding ${wait.join("")}`)
      score.push(wait.map((c) => close.indexOf(c) + 1).reduce((p, c) => p * 5 + c, 0))
      wait.length = 0
    }
  }

  return score 
}

console.log("Sample:", [{ data: sample }].map(solve2))
// console.log("Task:", [{ data: data }].map(solve2))
