import _ from "lodash"
import data, { sample } from "./data.js"
import Graph from "node-dijkstra"

console.log("🎄 Day 12")

/// Part 1
const alphabet = "abcdefghijklmnopqrstuvwxyz"

const solve1 = (ctx) => {
  let map = []

  var startId = ""
  var endId = ""

  ctx.data.forEach((row, y) => {
    map[y] = []
    row.split("").forEach((heightChar, x) => {
      const pointInfo = { x, y, id: [y, x].join(":") }
      switch (heightChar) {
        case "S":
          pointInfo.start = true
          pointInfo.height = alphabet.indexOf("a")
          startId = pointInfo.id
          break
        case "E":
          pointInfo.end = true
          pointInfo.height = alphabet.indexOf("z")
          endId = pointInfo.id
          break
        default:
          pointInfo.height = alphabet.indexOf(heightChar)
          break
      }

      map[y][x] = pointInfo
    })
  })

  const route = new Graph()

  // Set neighbours
  map.forEach((row, y) => {
    row.forEach((__, x) => {
      const top = _.inRange(y - 1, 0, map.length) ? { ...map[y - 1][x], name: "top" } : null
      const down = _.inRange(y + 1, 0, map.length) ? { ...map[y + 1][x], name: "down" } : null
      const left = _.inRange(x - 1, 0, row.length) ? { ...map[y][x - 1], name: "left" } : null
      const right = _.inRange(x + 1, 0, row.length) ? { ...map[y][x + 1], name: "right" } : null

      map[y][x] = {
        ...map[y][x],
        top,
        down,
        left,
        right,
      }

      var neighbours = {}
      if (top && top.height <= map[y][x].height + 1) neighbours[top.id] = 1
      if (down && down.height <= map[y][x].height + 1) neighbours[down.id] = 1
      if (left && left.height <= map[y][x].height + 1) neighbours[left.id] = 1
      if (right && right.height <= map[y][x].height + 1) neighbours[right.id] = 1

      route.addNode(map[y][x].id, neighbours)
    })
  })

  return route.path(startId, endId).length - 1
}

console.log("Sample:", [{ data: sample }].map(solve1))
console.log("Task:", [{ data: data }].map(solve1))

/// Part 2

const solve2 = (ctx) => {
  let map = []

  var startId = ""
  var endId = ""

  ctx.data.forEach((row, y) => {
    map[y] = []
    row.split("").forEach((heightChar, x) => {
      const pointInfo = { x, y, id: [y, x].join(":") }
      switch (heightChar) {
        case "S":
          pointInfo.start = true
          pointInfo.height = alphabet.indexOf("a")
          startId = pointInfo.id
          break
        case "E":
          pointInfo.end = true
          pointInfo.height = alphabet.indexOf("z")
          endId = pointInfo.id
          break
        default:
          pointInfo.height = alphabet.indexOf(heightChar)
          break
      }

      map[y][x] = pointInfo
    })
  })

  const route = new Graph()

  // Set neighbours
  map.forEach((row, y) => {
    row.forEach((__, x) => {
      const top = _.inRange(y - 1, 0, map.length) ? { ...map[y - 1][x], name: "top" } : null
      const down = _.inRange(y + 1, 0, map.length) ? { ...map[y + 1][x], name: "down" } : null
      const left = _.inRange(x - 1, 0, row.length) ? { ...map[y][x - 1], name: "left" } : null
      const right = _.inRange(x + 1, 0, row.length) ? { ...map[y][x + 1], name: "right" } : null

      map[y][x] = {
        ...map[y][x],
        top,
        down,
        left,
        right,
      }

      var neighbours = {}
      if (top && top.height <= map[y][x].height + 1) neighbours[top.id] = 1
      if (down && down.height <= map[y][x].height + 1) neighbours[down.id] = 1
      if (left && left.height <= map[y][x].height + 1) neighbours[left.id] = 1
      if (right && right.height <= map[y][x].height + 1) neighbours[right.id] = 1

      route.addNode(map[y][x].id, neighbours)
    })
  })

  const points = _.flatten(map)
    .filter((p) => p.height == 0)
    .map((p) => route.path(p.id, endId)?.length - 1 || null)
    .filter((p) => p != null)

  return _.min(points)
}

console.log("Sample:", [{ data: sample }].map(solve2))
console.log("Task:", [{ data: data }].map(solve2))
