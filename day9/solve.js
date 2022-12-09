import _ from "lodash"
import data, { sample, largeSample } from "./data.js"

console.log("🎄 Day 9")

/// Part 1

const solve1 = (ctx) => {
  const head = { hor: 0, ver: 0, history: [] }
  const tail = { hor: 0, ver: 0, history: [] }

  ctx.moves.forEach(([direction, steps]) => {
    _.times(steps, () => {
      switch (direction) {
        case "R":
          head.hor += 1
          break
        case "L":
          head.hor -= 1
          break
        case "U":
          head.ver += 1
          break
        case "D":
          head.ver -= 1
          break
      }

      const tailHorOffset = head.hor - tail.hor
      const tailVerOffset = head.ver - tail.ver

      // move diagonal
      if (tailHorOffset != 0 && tailVerOffset != 0 && Math.abs(tailHorOffset) + Math.abs(tailVerOffset) == 3) {
        if (Math.abs(tailVerOffset) == 2) {
          // adjust horizontally
          tail.hor = head.hor
        }
        if (Math.abs(tailHorOffset) == 2) {
          // adjust vertical
          tail.ver = head.ver
        }
      }

      // move horizonal
      if (tailHorOffset > 1) {
        tail.hor += 1
      } else if (tailHorOffset < -1) {
        tail.hor -= 1
      }

      // move vertical
      if (tailVerOffset > 1) {
        tail.ver += 1
      } else if (tailVerOffset < -1) {
        tail.ver -= 1
      }

      head.history.push(`h${head.hor}:v${head.ver}`)
      tail.history.push(`h${tail.hor}:v${tail.ver}`)
    })
  })

  return _.uniq(tail.history).length
}

const sRes1 = [{ moves: sample }].map(solve1)
const res1 = [{ moves: data }].map(solve1)

console.log("Sample:", sRes1, "Task:", res1)

/// Part 2

const solve2 = (ctx) => {
  const head = { hor: 0, ver: 0, history: [] }
  const tails = _.times(9, () => {
    return { hor: 0, ver: 0, history: [] }
  })

  ctx.moves.forEach(([direction, steps]) => {
    _.times(steps, () => {
      switch (direction) {
        case "R":
          head.hor += 1
          break
        case "L":
          head.hor -= 1
          break
        case "U":
          head.ver += 1
          break
        case "D":
          head.ver -= 1
          break
      }

      head.history.push(`h${head.hor}:v${head.ver}`)

      // Move the tail(s)

      tails.forEach((tail, idx) => {
        var predecessor = idx === 0 ? head : tails[idx - 1]

        const tailHorOffset = predecessor.hor - tail.hor
        const tailVerOffset = predecessor.ver - tail.ver

        // move diagonal
        if (tailHorOffset != 0 && tailVerOffset != 0 && Math.abs(tailHorOffset) + Math.abs(tailVerOffset) == 3) {
          if (Math.abs(tailVerOffset) == 2) {
            // adjust horizontally
            tail.hor = predecessor.hor
          }
          if (Math.abs(tailHorOffset) == 2) {
            // adjust vertical
            tail.ver = predecessor.ver
          }
        }

        // move horizonal
        if (tailHorOffset > 1) {
          tail.hor += 1
        } else if (tailHorOffset < -1) {
          tail.hor -= 1
        }

        // move vertical
        if (tailVerOffset > 1) {
          tail.ver += 1
        } else if (tailVerOffset < -1) {
          tail.ver -= 1
        }

        tail.history.push(`h${tail.hor}:v${tail.ver}`)
      })
    })
  })

  const tail = _.last(tails)
  const history = _.uniq(tail.history)
  return history.length
}

const sRes2 = [{ moves: largeSample }].map(solve2)
const res2 = [{ moves: data }].map(solve2)

console.log("Sample:", sRes2, "Task:", res2)
