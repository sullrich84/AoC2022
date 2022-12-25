import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 19")

/// Part 1

// if (ore >= ctx.xxx.ore) {
//   const nextMats = [ore, clay, obsidian, geodes]
//   const nextRobots = [oreRobots, clayRobots, obsidianRobots, geodeRobots]
//   stack.push([nextMats, nextRobots, minute + 1])
// }

// const nextMats = [ore, clay, obsidian, geodes]
// const nextRobots = [oreRobots, clayRobots, obsidianRobots, geodeRobots]
// stack.push([nextMats, nextRobots, minute + 1])

const solve1 = (ctx) => {
  const oMax = Math.max(ctx.oreRobot.ore, ctx.clayRobot.ore, ctx.obsidianRobot.ore, ctx.geodeRobot.ore)
  const oMin = Math.min(ctx.oreRobot.ore, ctx.clayRobot.ore, ctx.obsidianRobot.ore, ctx.geodeRobot.ore)

  const seen = {}
  const stack = []
  stack.push([
    [0, 0, 0, 0], // mats [ore, clay, obsidian, geodes]
    [1, 0, 0, 0], // rbts [ore, clay, obsidian, geodes]
    24, // timeleft in minutes
  ])

  var maxGeodes = 0

  while (stack.length > 0) {
    const [mats, robots, timeleft] = stack.pop()

    var [ore, clay, obsidian, geodes] = mats
    const [oreRobots, clayRobots, obsidianRobots, geodeRobots] = robots

    // Update materials available in this round
    ore += oreRobots
    clay += clayRobots
    obsidian += obsidianRobots
    geodes += geodeRobots

    if (timeleft < 0) {
      console.log(timeleft, geodes)
      maxGeodes = Math.max(maxGeodes, geodes)
      continue
    }

    // Optimization: Skip redundant states
    const key = [mats, robots, timeleft].join()
    if (key in seen) continue
    seen[key] = 1

    // WAITING ROUND
    // Optimization: Only wait if we can't even produce one single robot
    if (ore < oMin) {
      const nextMats = [ore, clay, obsidian, geodes]
      const nextRobots = [oreRobots, clayRobots, obsidianRobots, geodeRobots]
      stack.push([nextMats, nextRobots, timeleft - 1])
      continue
    }

    // Optimization: Skip states that will lead to an ore overflow
    if (ore >= timeleft * oMax) {
      continue
    }

    // ORE ROBOT
    // Optimization: Never produce more ore robots than we can spend in one round
    if (oreRobots < oMax && ore >= ctx.oreRobot.ore) {
      const nextMats = [ore - ctx.oreRobot.ore, clay, obsidian, geodes]
      const nextRobots = [oreRobots + 1, clayRobots, obsidianRobots, geodeRobots]
      stack.push([nextMats, nextRobots, timeleft - 1])
    }

    // CLAY ROBOT
    if (ore >= ctx.clayRobot.ore) {
      const nextMats = [ore - ctx.clayRobot.ore, clay, obsidian, geodes]
      const nextRobots = [oreRobots, clayRobots + 1, obsidianRobots, geodeRobots]
      stack.push([nextMats, nextRobots, timeleft - 1])
    }

    // OBSIDIAN ROBOT
    if (ore >= ctx.obsidianRobot.ore && clay >= ctx.obsidianRobot.clay) {
      const nextMats = [ore - ctx.obsidianRobot.ore, clay - ctx.obsidianRobot.clay, obsidian, geodes]
      const nextRobots = [oreRobots, clayRobots, obsidianRobots + 1, geodeRobots]
      stack.push([nextMats, nextRobots, timeleft - 1])
    }

    // GEODE ROBOT
    if (ore >= ctx.geodeRobot.ore && obsidian >= ctx.geodeRobot.obsidian) {
      const nextMats = [ore - ctx.geodeRobot.ore, clay, obsidian - ctx.geodeRobot.obsidian, geodes]
      const nextRobots = [oreRobots, clayRobots, obsidianRobots, geodeRobots + 1]
      stack.push([nextMats, nextRobots, timeleft - 1])
    }
  }

  return maxGeodes
}

console.log("Sample:", sample.map(solve1))
// console.log("Task:", data.map(solve1))

/// Part 2

const solve2 = (input) => {
  return 0
}

// const sRes2 = 0 //_.sum(sample.map(solve2))
// const res2 = 0 //_.sum(data.map(solve2))

// console.log("Sample:", sRes2, "Task:", res2)
