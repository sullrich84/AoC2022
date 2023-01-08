import _ from "lodash"
import data, { sample, smallSample } from "./data.js"

console.log("🎄 Day 12: Passage Pathing")

const buildMap = (data) => {
  const map = {}

  for (const [src, dest] of data) {
    if (!(src in map)) map[src] = []
    if (!(dest in map)) map[dest] = []
    map[src].push(dest)
    map[dest].push(src)
  }

  return map
}

/// Part 1

const solve1 = ({ data }) => {
  const map = buildMap(data)

  const ways = []
  const cache = {}
  const stack = [[["start"], []]]

  loop: while (stack.length > 0) {
    const [path, seen] = stack.pop()
    const pos = _.last(path)

    const pKey = path.join(" -> ")
    const sKey = seen.join()
    const key = pKey + ":" + sKey
    if (key in cache) continue loop
    cache[key] = true

    if (pos === "end") {
      ways.add(pKey)
      continue loop
    }

    adj: for (const adj of map[pos]) {
      if (adj === adj.toLowerCase() && seen.includes(adj)) continue adj
      stack.push([
        [...path, adj],
        [...seen, pos],
      ])
    }
  }

  return ways.size
}

// console.log("Sample:", [{ data: sample }].map(solve1))
// console.log("Task:", [{ data: data }].map(solve1))

/// Part 2

const solve2 = ({ data }) => {
  const map = buildMap(data)

  const ways = []
  const cache = {}
  const stack = [[["start"], []]]

  loop: while (stack.length > 0) {
    const [path, seen] = stack.pop()
    const pos = _.last(path)

    const pKey = path.join()
    const sKey = seen.join()
    const key = pKey + ":" + sKey
    if (key in cache) continue loop
    cache[key] = true

    // Skip branch if two or more tiny cave has been visited
    const sSeen = seen.filter((e) => e === e.toLowerCase())
    if (sSeen.length - _.uniq(sSeen).length > 1) continue loop

    if (pos === "end") {
      ways.push(pKey)
      continue loop
    }

    adj: for (const adj of map[pos]) {
      if (adj === "start") continue adj

      stack.push([
        [...path, adj],
        [...seen, pos],
      ])
    }
  }

  return ways.length
}

console.log("Sample:", [{ data: sample }].map(solve2))
console.log("Task:", [{ data: data }].map(solve2))
