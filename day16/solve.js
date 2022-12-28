import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 16")

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

    for (const next of nodes) {
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

  return findMaxPressure("AA", [], 26)
}

// console.log("Sample:", [{ data: sample }].map(solve1))
// console.log("Task:", [{ data: data }].map(solve1))

/// Part 2

const solve2A = ({ data }) => {
  const valves = []

  valves: for (const [id, { flowRate }] of Object.entries(data)) {
    if (flowRate === 0 && id !== "AA") continue valves
    const queue = []
    const seen = {}
    queue.push([id, 0])
    valves[id] = { flowRate, nodes: [] }

    bsf: while (queue.length > 0) {
      const [valveId, distance] = queue.pop()
      if (valveId in seen) continue bsf
      seen[valveId] = true

      const { flowRate, nodes } = data[valveId]
      if (flowRate > 0 && id != valveId) {
        valves[id].nodes.push([valveId, distance])
      }

      for (const n of nodes) {
        queue.unshift([n, distance + 1])
      }
    }
  }

  const cache = []

  const findMaxPressure = (pos, opened, timeLeft) => {
    if (timeLeft <= 0) return 0

    const key = [pos, opened, timeLeft].join(":")
    if (key in cache) return cache[key]

    var best = 0
    const { flowRate, nodes } = valves[pos]
    const currentRelease = (timeLeft - 1) * flowRate

    for (const next of nodes) {
      if (currentRelease != 0 && !opened.includes(pos)) {
        // Open current valve and move to next tunnel
        const nextRelease = findMaxPressure(next, [...opened, pos], timeLeft - 2)
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

const solve2 = ({ data }) => {
  const valves = data
  const cache = []

  const findMaxPressure = (current, opened, timeLeft, elephantIdle) => {
    const key = [current, opened.join(), timeLeft, elephantIdle].join(":")
    if (key in cache) return cache[key]

    if (timeLeft == 0 && !elephantIdle) return 0
    if (timeLeft == 0 && elephantIdle) {
      // Hacky optimization to avoid empty first runs
      if (opened.length < 6) return 0
      return findMaxPressure("AA", opened, 26, false)
    }

    var best = 0
    const { flowRate, nodes } = valves[current]

    if (flowRate > 0 && !opened.includes(current)) {
      const nextOpen = [...opened, current]
      const currentRelease = (timeLeft - 1) * flowRate
      const openAndMove = findMaxPressure(current, nextOpen.sort(), timeLeft - 1, elephantIdle)
      best = _.max([best, currentRelease + openAndMove])
    }

    const noOpenAndMove = nodes.map((n) => findMaxPressure(n, opened, timeLeft - 1, elephantIdle))
    var best = _.max(noOpenAndMove)

    cache[key] = best
    return best
  }

  return findMaxPressure("AA", [], 26, true)
}

console.log("Sample:", [{ data: data }].map(solve2))
// console.log("Task:", [{ data: data }].map(solve2))
