import _ from "lodash"
import data, { sample, largeSample } from "./data.js"

console.log("🎄 Day 9: Rope Bridge")

/// Part 1

const solve1 = (ctx) => {
  const head = { x: 0, y: 0, history: [] }
  const tail = { x: 0, y: 0, history: [] }

  ctx.moves.forEach(([direction, steps]) => {
    _.times(steps, () => {
      switch (direction) {
        case "R":
          head.x += 1
          break
        case "L":
          head.x -= 1
          break
        case "U":
          head.y += 1
          break
        case "D":
          head.y -= 1
          break
      }

      const tailHorOffset = head.x - tail.x
      const tailVerOffset = head.y - tail.y

      // move diagonal
      if (tailHorOffset != 0 && tailVerOffset != 0 && Math.abs(tailHorOffset) + Math.abs(tailVerOffset) == 3) {
        if (Math.abs(tailVerOffset) == 2) {
          // adjust horizontally
          tail.x = head.x
        }
        if (Math.abs(tailHorOffset) == 2) {
          // adjust vertical
          tail.y = head.y
        }
      }

      // move horizonal
      if (tailHorOffset > 1) {
        tail.x += 1
      } else if (tailHorOffset < -1) {
        tail.x -= 1
      }

      // move vertical
      if (tailVerOffset > 1) {
        tail.y += 1
      } else if (tailVerOffset < -1) {
        tail.y -= 1
      }

      head.history.push(`${head.x}:${head.y}`)
      tail.history.push(`${tail.x}:${tail.y}`)
    })
  })

  return _.uniq(tail.history).length
}

const sRes1 = [{ moves: sample }].map(solve1)
const res1 = [{ moves: data }].map(solve1)

console.log("Sample:", sRes1, "Task:", res1)

/// Part 2

const solve2 = (ctx) => {
  const head = { x: 0, y: 0, history: [] }
  const tails = _.times(9, () => {
    return { x: 0, y: 0, history: [] }
  })

  ctx.moves.forEach(([direction, steps]) => {
    _.times(steps, () => {
      switch (direction) {
        case "R":
          head.x += 1
          break
        case "L":
          head.x -= 1
          break
        case "U":
          head.y += 1
          break
        case "D":
          head.y -= 1
          break
      }

      head.history.push(`h${head.x}:v${head.y}`)

      // Move the tail(s)
      tails.forEach((tail, idx) => {
        var predecessor = idx === 0 ? head : tails[idx - 1]

        const tailHorOffset = predecessor.x - tail.x
        const tailVerOffset = predecessor.y - tail.y

        // move diagonal
        if (tailHorOffset != 0 && tailVerOffset != 0 && Math.abs(tailHorOffset) + Math.abs(tailVerOffset) == 3) {
          if (Math.abs(tailVerOffset) == 2) {
            // adjust horizontally
            tail.x = predecessor.x
          }
          if (Math.abs(tailHorOffset) == 2) {
            // adjust vertical
            tail.y = predecessor.y
          }
        }

        // move horizonal
        if (tailHorOffset > 1) {
          tail.x += 1
        } else if (tailHorOffset < -1) {
          tail.x -= 1
        }

        // move vertical
        if (tailVerOffset > 1) {
          tail.y += 1
        } else if (tailVerOffset < -1) {
          tail.y -= 1
        }

        tail.history.push(`${tail.x}:${tail.y}`)
      })
    })
  })

  return _.uniq(_.last(tails).history).length
}

const sRes2 = [{ moves: largeSample }].map(solve2)
const res2 = [{ moves: data }].map(solve2)

console.log("Sample:", sRes2, "Task:", res2)
