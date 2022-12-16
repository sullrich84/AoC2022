import _ from "lodash"
import data, { sample } from "./data.js"
import Graph from "node-dijkstra"

console.log("🎄 Day 16")

/// Part 1

const solve1 = (ctx) => {
  const travelCosts = 1
  const route = new Graph()

  const getNode = (id) => {
    return _.first(ctx.data.filter(({ node }) => node === id))
  }

  ctx.data.forEach(({ node, nodes }) => {
    const neighbours = {}
    nodes.forEach((id) => {
      const neighbour = getNode(id)
      const flowCosts = 30 - neighbour.flowRate
      neighbours[id] = travelCosts + flowCosts
    })
    route.addNode(node, neighbours)
  })

  const [start, ...nodes] = ctx.data
  const paths = nodes.map(({ node }) => {
    return route.path(start.node, node)
  })

  return 0
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
