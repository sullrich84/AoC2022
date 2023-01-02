import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 16: Proboscidea Volcanium")

/// Part 1

const solve1 = ({ data }) => {
  const valves = data
  const cache = {}

  const findMaxPressure = (current, opened, timeLeft) => {
    if (timeLeft == 0) return 0

    const key = [current, opened, timeLeft].join(":")
    if (key in cache) return cache[key]

    var best = 0
    const { flowRate, nodes } = valves[current]
    const currentRelease = (timeLeft - 1) * flowRate

    // Open current valve
    if (currentRelease != 0 && !opened.includes(current)) {
      const nextRelease = findMaxPressure(current, [...opened, current], timeLeft - 1)
      best = Math.max(best, currentRelease + nextRelease)
    }

    for (const next of nodes) {
      best = Math.max(best, findMaxPressure(next, opened, timeLeft - 1))
    }

    cache[key] = best
    return best
  }

  return findMaxPressure("AA", [], 30)
}

console.log("Sample:", [{ data: sample }].map(solve1))
console.log("Task:", [{ data: data }].map(solve1))

/// Part 2

const solve2 = ({ data, minValvesOpen }) => {
  const valves = data
  const cache = []

  const findMaxPressure = (current, opened, timeLeft, elephantIdle) => {
    const key = [current, opened.join(), timeLeft, elephantIdle].join(":")
    if (key in cache) return cache[key]

    if (timeLeft == 0 && !elephantIdle) return 0
    if (timeLeft == 0 && elephantIdle) {
      // Hacky optimization to avoid elephant cycles
      // where no or too few valves has been opened
      if (opened.length < minValvesOpen) return 0
      return findMaxPressure("AA", opened, 26, false)
    }

    var best = 0
    const { flowRate, nodes } = valves[current]

    // Open current valve
    if (flowRate > 0 && !opened.includes(current)) {
      const nOpened = [...opened, current]
      const currentRelease = (timeLeft - 1) * flowRate
      const maxCurrent = findMaxPressure(current, nOpened.sort(), timeLeft - 1, elephantIdle)
      best = Math.max(best, currentRelease + maxCurrent)
    }

    // Transit over node to next tunnel (no valve opening)
    for (const node of nodes) {
      const nodeMax = findMaxPressure(node, opened, timeLeft - 1, elephantIdle)
      best = Math.max(best, nodeMax)
    }

    cache[key] = best
    return best
  }

  return findMaxPressure("AA", [], 26, true)
}

console.log("Sample:", [{ data: sample, minValvesOpen: 3 }].map(solve2))
console.log("Task:", [{ data: data, minValvesOpen: 6 }].map(solve2))
