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

  const find = (current, timeLeft) => {
    if (timeLeft <= 0) return 0

    if(!current.open) {
      
    }
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
