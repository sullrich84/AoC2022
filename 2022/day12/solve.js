import _ from "lodash"
import data, { sample } from "./data.js"
import Graph from "node-dijkstra"

console.log("🎄 Day 12: Hill Climbing Algorithm")

/// Part 1
const alphabet = "abcdefghijklmnopqrstuvwxyz"

const solve1 = (ctx) => {
  const map = []
  const route = new Graph()

  ctx.data.forEach((row, y) => {
    map[y] = []
    row.split("").forEach((heightChar, x) => {
      map[y][x] = { x, y, id: [y, x].join(":") }
      if (heightChar === "S") {
        map[y][x] = { ...map[y][x], start: true, height: alphabet.indexOf("a") }
      } else if (heightChar === "E") {
        map[y][x] = { ...map[y][x], end: true, height: alphabet.indexOf("z") }
      } else {
        map[y][x] = { ...map[y][x], height: alphabet.indexOf(heightChar) }
      }
    })
  })

  // Set neighbours
  map.forEach((row, y) => {
    row.forEach((__, x) => {
      const top = _.inRange(y - 1, 0, map.length) ? { ...map[y - 1][x], name: "top" } : null
      const down = _.inRange(y + 1, 0, map.length) ? { ...map[y + 1][x], name: "down" } : null
      const left = _.inRange(x - 1, 0, row.length) ? { ...map[y][x - 1], name: "left" } : null
      const right = _.inRange(x + 1, 0, row.length) ? { ...map[y][x + 1], name: "right" } : null

      var neighbours = {}
      if (top && top.height <= map[y][x].height + 1) neighbours[top.id] = 1
      if (down && down.height <= map[y][x].height + 1) neighbours[down.id] = 1
      if (left && left.height <= map[y][x].height + 1) neighbours[left.id] = 1
      if (right && right.height <= map[y][x].height + 1) neighbours[right.id] = 1

      route.addNode(map[y][x].id, neighbours)
    })
  })

  const flatMap = _.flatten(map)
  const start = flatMap.find((p) => p.start)
  const end = flatMap.find((p) => p.end)
  return route.path(start.id, end.id).length - 1
}

const sRes1 = [{ data: sample }].map(solve1)
const res1 = [{ data: data }].map(solve1)

console.log("Sample:", sRes1, "Task:", res1)

/// Part 2

const solve2 = (ctx) => {
  const map = []
  const route = new Graph()

  ctx.data.forEach((row, y) => {
    map[y] = []
    row.split("").forEach((heightChar, x) => {
      map[y][x] = { x, y, id: [y, x].join(":") }
      if (heightChar === "S") {
        map[y][x] = { ...map[y][x], start: true, height: alphabet.indexOf("a") }
      } else if (heightChar === "E") {
        map[y][x] = { ...map[y][x], end: true, height: alphabet.indexOf("z") }
      } else {
        map[y][x] = { ...map[y][x], height: alphabet.indexOf(heightChar) }
      }
    })
  })

  // Set neighbours
  map.forEach((row, y) => {
    row.forEach((__, x) => {
      const top = _.inRange(y - 1, 0, map.length) ? { ...map[y - 1][x], name: "top" } : null
      const down = _.inRange(y + 1, 0, map.length) ? { ...map[y + 1][x], name: "down" } : null
      const left = _.inRange(x - 1, 0, row.length) ? { ...map[y][x - 1], name: "left" } : null
      const right = _.inRange(x + 1, 0, row.length) ? { ...map[y][x + 1], name: "right" } : null

      var neighbours = {}
      if (top && top.height <= map[y][x].height + 1) neighbours[top.id] = 1
      if (down && down.height <= map[y][x].height + 1) neighbours[down.id] = 1
      if (left && left.height <= map[y][x].height + 1) neighbours[left.id] = 1
      if (right && right.height <= map[y][x].height + 1) neighbours[right.id] = 1

      route.addNode(map[y][x].id, neighbours)
    })
  })

  const flatMap = _.flatten(map)
  const end = flatMap.find((p) => p.end)

  return flatMap
    .filter((p) => p.height == 0)
    .map((p) => route.path(p.id, end.id)?.length - 1 || null)
    .filter((p) => p != null)
    .sort((a, b) => a - b)
    .shift()
}

const sRes2 = [{ data: sample }].map(solve2)
const res2 = [{ data: data }].map(solve2)

console.log("Sample:", sRes2, "Task:", res2)
