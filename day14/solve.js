import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 14")

function drawMap(map) {
  console.clear()
  map.forEach((row) => {
    console.log(row.join(""))
  })
}

function pairwise(arr, func) {
  for (var i = 0; i < arr.length - 1; i++) {
    func(arr[i], arr[i + 1])
  }
}

/// Part 1

const solve1 = (ctx) => {
  const flattenData = [..._.flatten(ctx.data), [500, 0]]
  const minX = _.min(flattenData.map(([x, y]) => x)) - 2 // allows sand flow aside
  const maxX = _.max(flattenData.map(([x, y]) => x)) + 2 // allows sand flow aside
  const minY = _.min(flattenData.map(([x, y]) => y))
  const maxY = _.max(flattenData.map(([x, y]) => y))

  const map = _.times(maxY - minY + 1, () => new Array(maxX - minX + 1).fill("."))

  const setRock = (x, y) => {
    const dx = x - minX
    const dy = y - minY
    // if (!map[dy]) map[dy] = []
    map[dy][dx] = "#"
  }

  ctx.data.forEach((input) => {
    pairwise(input, ([x1, y1], [x2, y2]) => {
      const xS = _.min([x1, x2])
      const xE = _.max([x1, x2])
      const yS = _.min([y1, y2])
      const yE = _.max([y1, y2])

      for (var x = xS; x <= xE; x++) {
        for (var y = yS; y <= yE; y++) {
          setRock(x, y)
        }
      }
    })
  })

  const get = (x, y) => {
    const dx = x - minX
    const dy = y - minY
    return map[dy][dx]
  }

  const set = (x, y, v) => {
    const dx = x - minX
    const dy = y - minY
    map[dy][dx] = v
  }

  let rest = 0
  let end = false

  while (!end) {
    let x = 500 // right
    let y = 0 // down

    while (true) {
      const nextPos = get(x, y + 1)
      if (nextPos !== ".") {
        // Block below is blocked
        const nextPosLeft = get(x - 1, y + 1)
        const nextPosRight = get(x + 1, y + 1)

        if (nextPosLeft === ".") {
          x -= 1
        } else if (nextPosRight === ".") {
          x += 1
        } else {
          // Both ways arround blocked; place at current
          set(x, y, "o")
          rest += 1
          break
        }
      }

      y += 1

      if (y >= maxY) {
        end = true
        break
      }
    }
  }

  drawMap(map)
  return rest
}

// const sRes1 = [{ data: sample }].map(solve1)
// const res1 = [{ data: data }].map(solve1)

// console.log("Sample:", sRes1, "Task:", res1)

/// Part 2

const solve2 = (ctx) => {
  const flattenData = [..._.flatten(ctx.data), [500, 0]]
  const minX = _.min(flattenData.map(([x, y]) => x)) - 3000 // guessed :)
  const maxX = _.max(flattenData.map(([x, y]) => x)) + 3000 // guessed :)
  const minY = _.min(flattenData.map(([x, y]) => y))
  const maxY = _.max(flattenData.map(([x, y]) => y)) + 2

  const map = _.times(maxY - minY + 1, () => new Array(maxX - minX + 1).fill("."))

  const setRock = (x, y) => {
    const dx = x - minX
    const dy = y - minY
    map[dy][dx] = "#"
  }

  ;[
    ...ctx.data,
    [
      [minX, maxY],
      [maxX, maxY],
    ],
  ].forEach((input) => {
    pairwise(input, ([x1, y1], [x2, y2]) => {
      const xS = _.min([x1, x2])
      const xE = _.max([x1, x2])
      const yS = _.min([y1, y2])
      const yE = _.max([y1, y2])

      for (var x = xS; x <= xE; x++) {
        for (var y = yS; y <= yE; y++) {
          setRock(x, y)
        }
      }
    })
  })

  const get = (x, y) => {
    const dx = x - minX
    const dy = y - minY
    return map[dy][dx]
  }

  const set = (x, y, v) => {
    const dx = x - minX
    const dy = y - minY
    map[dy][dx] = v
  }

  let rest = 0
  let end = false

  while (!end) {
    let x = 500 // right
    let y = 0 // down

    while (true) {
      const nextPos = get(x, y + 1)
      if (nextPos !== ".") {
        // Block below is blocked
        const nextPosLeft = get(x - 1, y + 1)
        const nextPosRight = get(x + 1, y + 1)

        if (nextPosLeft === ".") {
          x -= 1
        } else if (nextPosRight === ".") {
          x += 1
        } else {
          // Both ways arround blocked; place at current

          rest += 1

          // Flow began at start
          if (x === 500 && y === 0) {
            end = true
            break
          }

          set(x, y, "o")
          break
        }
      }

      y += 1

      if (y >= maxY) {
        end = true
        break
      }
    }
  }

  drawMap(map)
  return rest
}

const sRes2 = [{ data: sample }].map(solve2)
const res2 = [{ data: data }].map(solve2)

console.log("Sample:", sRes2, "Task:", res2)
