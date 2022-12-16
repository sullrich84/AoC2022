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

  const graph = new Graph()

  valves.forEach((v) => {
    const neigbours = {}
    v.nodes.forEach((n) => {
      neigbours[n] = 1
    })
    graph.addNode(v.id, neigbours)
  })

  const getNode = (id) => {
    return _.first(valves.filter((v) => v.id === id))
  }

  const findNext = ({ id }, m) => {
    const openValves = valves.filter((v) => !v.open)
    const targets = openValves.map((t) => {
      const path = graph.path(id, t.id)
      return { ...t, path: path || [] }
    })

    const remainingTime = 30 - m
    targets.sort((a, b) => {
      const bv = (remainingTime - b.path.length) * b.flowRate
      const av = (remainingTime - a.path.length) * a.flowRate
      return bv - av
    })

    const bestTarget = _.first(targets)
    if (bestTarget.id === id) {
      return bestTarget
    }

    const nextId = bestTarget.path[1]
    const next = getNode(nextId)
    return next
  }

  var pressureSum = 0
  var current = getNode("AA")

  for (var m = 0; m < 30; m++) {
    const openValves = valves.filter(({ open }) => open)
    pressureSum += _.sum(openValves.map(({ flowRate }) => flowRate))

    const dest = findNext(current, m)

    if (current.id === dest.id && !current.open && current.flowRate >= 0) {
      current.open = true
      continue
    }

    // Move to next tunnel
    current = dest
  }

  return pressure
}

const sRes1 = [{ data: sample }].map(solve1)
const res1 = 0 //_.sum(data.map(solve1))

console.log("Sample:", sRes1, "Task:", res1)

/// Part 2

const solve2 = (input) => {
  console.log(input)
  return 0
}

const sRes2 = 0 //_.sum(sample.map(solve2))
const res2 = 0 //_.sum(data.map(solve2))

console.log("Sample:", sRes2, "Task:", res2)
