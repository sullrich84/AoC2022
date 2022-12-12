import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 12")

/// Part 1
const alphabet = "abcdefghijklmnopqrstuvwxyz"

const solve1 = (ctx) => {
  let map = []
  let visit = []

  let startY,
    startX,
    endY,
    endX = 0

  // Set height and visit data
  ctx.data.forEach((row, y) => {
    map[y] = []
    visit[y] = []
    row.split("").forEach((heightChar, x) => {
      const pointInfo = { x, y }
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
          endY = y
          endX = x
          break
        default:
          pointInfo.height = alphabet.indexOf(heightChar)
          break
      }

      map[y][x] = pointInfo
      visit[y][x] = 0
    })
  })

  // Set neighbours
  map.forEach((row, y) => {
    row.forEach((__, x) => {
      const top = _.inRange(y - 1, 0, map.length) ? { y: y - 1, x } : null
      const down = _.inRange(y + 1, 0, map.length) ? { y: y + 1, x } : null
      const left = _.inRange(x - 1, 0, row.length) ? { y, x: x - 1 } : null
      const right = _.inRange(x + 1, 0, row.length) ? { y, x: x + 1 } : null

      map[y][x] = {
        ...map[y][x],
        top,
        down,
        left,
        right,
      }
    })
  })

  const findWay = (y, x, attempt, maxAttempts) => {
    visit[y][x] += 1
    if (attempt >= maxAttempts || (x == endX && y == endY)) return attempt

    const nextDest = (currentY, currentX) => {
      const position = map[currentY][currentX]
      var dest = [position.top, position.down, position.left, position.right].filter((p) => p != null)

      dest.map((p) => {
        p.height = map[p.y][p.x].height
        return p
      })

      dest.map((p) => {
        p.visit = visit[p.y][p.x]
        return p
      })

      dest = dest.map((p) => {
        if (p.height <= position.height + 1) {
          return p
        } else {
          return null
        }
      })

      dest = dest.filter((p) => p != null)

      dest.sort((p1, p2) => p2.height - p1.height)
      dest.sort((p1, p2) => p1.visit - p2.visit)
      return _.first(dest)
    }

    const dest = nextDest(y, x)
    return findWay(dest.y, dest.x, attempt + 1, maxAttempts)
  }

  const runs = findWay(startY, startX, 0, 2000)
  return runs
}

const sRes1 = [{ data: sample }].map(solve1)
const res1 = [{ data: data }].map(solve1)

console.log("Sample:", sRes1, "Task:", res1)

/// Part 2

const solve2 = (input) => {
  console.log(input)
  return 0
}

const sRes2 = 0 //_.sum(sample.map(solve2))
const res2 = 0 //_.sum(data.map(solve2))

console.log("Sample:", sRes2, "Task:", res2)
