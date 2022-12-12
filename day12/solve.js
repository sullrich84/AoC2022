import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 12")

/// Part 1
const alphabet = "abcdefghijklmnopqrstuvwxyz"

const solve1 = (ctx) => {
  let map = []

  let startY,
    startX = 0

  // Set height and visit data
  ctx.data.forEach((row, y) => {
    map[y] = []
    row.split("").forEach((heightChar, x) => {
      const pointInfo = { x, y, id: [y, x].join(":") }
      switch (heightChar) {
        case "S":
          pointInfo.start = true
          pointInfo.height = alphabet.indexOf("a")
          startY = y
          startX = x
          break
        case "E":
          pointInfo.end = true
          pointInfo.height = alphabet.indexOf("z")
          break
        default:
          pointInfo.height = alphabet.indexOf(heightChar)
          break
      }

      map[y][x] = pointInfo
    })
  })

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
    })
  })

  // const findWay = (y, x, attempt) => {
  //   visit[y][x] += 1
  //   if (attempt >= 5000 || (x == endX && y == endY)) return attempt

  //   const nextDest = (currentY, currentX) => {
  //     const position = map[currentY][currentX]
  //     var dest = [position.top, position.down, position.left, position.right].filter((p) => p != null)

  //     dest.map((p) => {
  //       p.visit = visit[p.y][p.x]
  //       return p
  //     })

  //     dest = dest.filter((p) => {
  //       return p.height <= position.height + 1
  //     })

  //     dest.sort((p1, p2) => p2.height - p1.height)
  //     // dest.sort((p1, p2) => p1.visit - p2.visit)
  //     dest = dest.filter((p) => p.visit < visit[position.y][position.x])

  //     return dest
  //   }

  //   const destinations = nextDest(y, x)

  //   const a = destinations.map((d) => findWay(d.y, d.x, attempt + 1)).filter(d => d!=null)

  //   const dest = _.min(a)
  //   //return findWay(dest.y, dest.x, attempt + 1)
  // }

  var reacedTargetWithSteps = []

  const findWay = (y, x, counter, history) => {
    const pos = map[y][x]
    history.push(pos.id)

    if (pos.end) {
      reacedTargetWithSteps.push(counter)
    } else {
      var neighbours = [pos.top, pos.down, pos.left, pos.right]
        .filter((n) => n != null)
        .filter((n) => !history.includes(n.id))
        .filter((n) => n.height <= pos.height + 1)
        .sort((p1, p2) => p2.height - p1.height)

      for (const neighbour of neighbours) {
        findWay(neighbour.y, neighbour.x, counter + 1, [...history])
      }
    }
  }

  findWay(startY, startX, 0, [])
  return _.min(reacedTargetWithSteps)
}

console.log("Sample:", [{ data: sample }].map(solve1))
// console.log("Task:", [{ data: data }].map(solve1))

/// Part 2

const solve2 = (input) => {
  console.log(input)
  return 0
}

const sRes2 = 0 //_.sum(sample.map(solve2))
const res2 = 0 //_.sum(data.map(solve2))

console.log("Sample:", sRes2, "Task:", res2)
