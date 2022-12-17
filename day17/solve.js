import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 17")

const shapes = {
  hbar: [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ],
  plus: [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, 2],
    [2, 1],
  ],
  angle: [
    [0, 2],
    [1, 2],
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  vbar: [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ],
  block: [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
  ],
}

const shapeKeys = Object.keys(shapes)
const chamberWidth = 7

/// Part 1

const solve1 = ({ data }) => {
  var shapeIndex = 0
  const getNextShape = () => {
    if (shapeIndex >= shapeKeys.length) shapeIndex = 0
    return shapes[shapeKeys[shapeIndex++]]
  }

  var jetIndex = 0
  const getNextJet = () => {
    if (jetIndex >= data.length) jetIndex = 0
    return data[jetIndex++]
  }

  const chamber = []

  const addRows = (rows) => {
    _.times(rows, () => chamber.unshift(new Array(chamberWidth).fill(".")))
  }

  const height = (shape) => {
    return _.max(shape.map(([y]) => y)) + 1
  }

  const move = (yOffset, xOffset, shape) => {
    return shape.map(([y, x]) => [y + yOffset, x + xOffset])
  }

  const collision = (shape) => {
    return shape.reduce((acc, [y, x]) => {
      return acc || x < 0 || x > chamberWidth - 1 || y >= chamber.length || chamber[y][x] !== "."
    }, false)
  }

  const addRocks = (shape) => {
    shape.forEach(([y, x]) => {
      chamber[y][x] = "#"
    })
  }

  // Initial chamber
  addRows(10)
  let rockHeight = 0
  var fallenRocks = 0

  while (fallenRocks < 2022) {
    var shape = getNextShape()

    // hacky add height of shape
    const shapeHeight = height(shape)
    addRows(shapeHeight) // Optimize this later

    const syOff = chamber.length - rockHeight - 3
    // left edge is two units away from the left wall
    shape = move(syOff - shapeHeight, 2, shape)

    var groundCollision = false
    while (!groundCollision) {
      const jet = getNextJet()
      var movedShape

      // apply jet
      if (jet === "<") {
        // Move left
        movedShape = move(0, -1, shape)
      } else {
        // Move right
        movedShape = move(0, 1, shape)
      }

      // Check for collision
      if (!collision(movedShape)) {
        shape = movedShape
      }

      // apply gravity
      movedShape = move(1, 0, shape)

      // Collision with rocks
      if (collision(movedShape)) {
        addRocks(shape)
        fallenRocks += 1
        const upperY = _.min(shape.map(([y]) => y))
        rockHeight = _.max([rockHeight, chamber.length - upperY])
        groundCollision = true
        break
      }

      shape = movedShape
    }
  }

  return rockHeight
}

const sRes1 = [{ data: sample }].map(solve1)
const res1 = [{ data: data }].map(solve1)

console.log("Sample:", sRes1, "Task:", res1)

/// Part 2

const solve2 = ({ data }) => {
  var shapeIndex = 0
  const getNextShape = () => {
    if (shapeIndex >= shapeKeys.length) shapeIndex = 0
    return shapes[shapeKeys[shapeIndex++]]
  }

  var jetIndex = 0
  const getNextJet = () => {
    if (jetIndex >= data.length) jetIndex = 0
    return data[jetIndex++]
  }

  const chamber = []

  const addRows = (rows) => {
    _.times(rows, () => chamber.unshift(new Array(chamberWidth).fill(".")))
  }

  const height = (shape) => {
    return _.max(shape.map(([y]) => y)) + 1
  }

  const move = (yOffset, xOffset, shape) => {
    return shape.map(([y, x]) => [y + yOffset, x + xOffset])
  }

  const collision = (shape) => {
    return shape.reduce((acc, [y, x]) => {
      return acc || x < 0 || x > chamberWidth - 1 || y >= chamber.length || chamber[y][x] !== "."
    }, false)
  }

  const addRocks = (shape) => {
    shape.forEach(([y, x]) => {
      chamber[y][x] = "#"
    })
  }

  // Initial chamber
  addRows(10)
  let rockHeight = 0
  var fallenRocks = BigInt(0)

  var repeatingHeight = BigInt(0)
  var target = BigInt(1000000000000)

  const cache = {}
  const cacheSize = 30 // top rows of chamber

  while (fallenRocks < target) {
    var shape = getNextShape()

    // hacky add height of shape
    const shapeHeight = height(shape)
    addRows(shapeHeight) // This could need some optimization

    const syOff = chamber.length - rockHeight - 3
    // left edge is two units away from the left wall
    shape = move(syOff - shapeHeight, 2, shape)

    var groundCollision = false
    while (!groundCollision) {
      const jet = getNextJet()
      var movedShape

      // apply jet
      if (jet === "<") {
        // Move left
        movedShape = move(0, -1, shape)
      } else {
        // Move right
        movedShape = move(0, 1, shape)
      }

      // Check for collision
      if (!collision(movedShape)) {
        shape = movedShape
      }

      // apply gravity
      movedShape = move(1, 0, shape)

      // Collision with rocks
      if (collision(movedShape)) {
        addRocks(shape)

        fallenRocks += 1n
        const minY = _.min(shape.map(([y]) => y))
        rockHeight = _.max([rockHeight, chamber.length - minY])
        groundCollision = true

        // Let's create some cache entries for this to see if we find a repeating pattern
        const fragment = _.flatten(chamber.slice(minY, minY + cacheSize))
        const cacheKey = shapeIndex + ":" + jetIndex + ":" + fragment.join("")

        if (cacheKey in cache) {
          const [cFallenRocks, cRockHeight] = cache[cacheKey]

          // Amount of rocks / height after pattern repeats
          const diffFallenRocks = BigInt(fallenRocks) - BigInt(cFallenRocks)
          const diffRockHeight = BigInt(rockHeight) - BigInt(cRockHeight)

          // Calculate the leap that can be made towards target
          const remainingRocks = BigInt(target) - BigInt(fallenRocks)
          const repeat = BigInt(remainingRocks) / BigInt(diffFallenRocks)

          // Leap forward by adding the repeating rocks and height
          fallenRocks += repeat * diffFallenRocks
          repeatingHeight += repeat * diffRockHeight
        }

        // Only cache large repeating blocks
        if (cacheKey.length > cacheSize * chamberWidth) {
          cache[cacheKey] = [fallenRocks, rockHeight]
        }
        break
      }

      shape = movedShape
    }
  }

  const answer = BigInt(rockHeight) + BigInt(repeatingHeight)
  return answer.toString()
}

const sRes2 = [{ data: sample }].map(solve2)
const res2 = [{ data: data }].map(solve2)

console.log("Sample:", sRes2, "Task:", res2)
