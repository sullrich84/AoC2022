import _ from "lodash"
import data, { sample } from "./data.js"
import Graph from "node-dijkstra"

console.log("🎄 Day 16")

/// Part 1

const solve1 = (ctx) => {
  const valves = [...ctx.data].map((v) => {
    v.open = false
    return v
  })

  const getNode = (id) => {
    return _.first(valves.filter((v) => v.id === id))
  }

  const cache = []

  const findMaxPressure = (current, opened, timeLeft) => {
    if (timeLeft <= 0) return 0

    const key = current + opened.join("") + timeLeft
    if (key in cache) return cache[key]

    var best = 0
    const currentNode = getNode(current)
    const currentRelease = (timeLeft - 1) * currentNode.flowRate

    for (const next of currentNode.nodes) {
      if (currentRelease != 0 && !opened.includes(current)) {
        // Open current valve and move to next tunnel
        const nextRelease = findMaxPressure(next, [...opened, current], timeLeft - 2)
        best = _.max([best, currentRelease + nextRelease])
      }

      // Ignore current valve and continue walking to the next tunnels
      best = _.max([best, findMaxPressure(next, opened, timeLeft - 1)])
    }

    cache[key] = best
    return best
  }

  return findMaxPressure("AA", [], 30)
}

console.log("Sample:", [{ data: sample }].map(solve1))
console.log("Task:", [{ data: data }].map(solve1))

/// Part 2

const solve2 = (input) => {
  console.log(input)
  return 0
}

// console.log("Sample:", [{ data: sample }].map(solve1))
// console.log("Task:", [{ data: data }].map(solve1))
