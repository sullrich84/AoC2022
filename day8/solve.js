import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 8")

/// Part 1

const solve1 = (treeLine, row, grid) => {
  if (row == 0 || row == grid.length - 1 || treeLine == 0 || treeLine == grid[0].length - 1)
    return _.times(grid[0].length, _.constant(1))

  return treeLine.map((tree, col, hLine) => {
    if (col == 0 || col == grid[row].length - 1) return 1

    const leftTrees = [...hLine].slice(0, col)
    const rightTrees = [...hLine].slice(col + 1)

    const vLine = [...grid.map((y) => y[col])]
    const topTrees = [...vLine].slice(0, row)
    const bottomTrees = [...vLine].slice(row + 1)

    const leftSmallerMap = leftTrees.map((val) => val < tree)
    const leftVisible = leftSmallerMap.reduce((acc, val) => acc && val, true)

    const rightSmallerMap = rightTrees.map((val) => val < tree)
    const rightVisible = rightSmallerMap.reduce((acc, val) => acc && val, true)

    const topSmallerMap = topTrees.map((val) => val < tree)
    const topVisible = topSmallerMap.reduce((acc, val) => acc && val, true)

    const bottomSmallerMap = bottomTrees.map((val) => val < tree)
    const bottomVisible = bottomSmallerMap.reduce((acc, val) => acc && val, true)

    return leftVisible || rightVisible || topVisible || bottomVisible ? 1 : 0
  })
}

const sRes1 = _.sum(_.flatten(sample.map(solve1)))
const res1 = _.sum(_.flatten(data.map(solve1)))

console.log("Sample:", sRes1, "Task:", res1)

/// Part 2

const solve2 = (treeLine, row, grid) => {
  if (row == 0 || row == grid.length - 1 || treeLine == 0 || treeLine == grid[0].length - 1)
    return _.times(grid[0].length, _.constant(0))

  return treeLine.map((tree, col, hLine) => {
    if (col == 0 || col == grid[row].length - 1) return 0

    const leftTrees = [...hLine].slice(0, col)
    const rightTrees = [...hLine].slice(col + 1)

    const vLine = [...grid.map((y) => y[col])]
    const topTrees = [...vLine].slice(0, row)
    const bottomTrees = [...vLine].slice(row + 1)

    const left = [...leftTrees.reverse()]
    const leftBlocker = left.find((h) => h >= tree)
    const leftScore = leftBlocker === undefined ? leftTrees.length : left.indexOf(leftBlocker) + 1

    const rightBlocker = rightTrees.find((h) => h >= tree)
    const rightScore = rightBlocker === undefined ? rightTrees.length : rightTrees.indexOf(rightBlocker) + 1

    const top = [...topTrees.reverse()]
    const topBlocker = top.find((h) => h >= tree)
    const topScore = topBlocker === undefined ? topTrees.length : top.indexOf(topBlocker) + 1

    const bottomBlocker = bottomTrees.find((h) => h >= tree)
    const bottomScore = bottomBlocker === undefined ? bottomTrees.length : bottomTrees.indexOf(bottomBlocker) + 1

    return leftScore * rightScore * topScore * bottomScore
  })
}

const sRes2 = _.max(_.flatten(sample.map(solve2)))
const res2 = _.max(_.flatten(data.map(solve2)))

console.log("Sample:", sRes2, "Task:", res2)
