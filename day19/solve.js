import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 19")

/// Part 1

const solve1 = (ctx, id) => {
  const maxOre = Math.max(ctx.oreRobot.ore, ctx.clayRobot.ore, ctx.obsidianRobot.ore, ctx.geodeRobot.ore)
  const maxClay = ctx.obsidianRobot.clay
  const maxObsidian = ctx.geodeRobot.obsidian

  const seen = {}
  const stack = []
  stack.push([
    [0, 0, 0, 0], // mats [ore, clay, obsidian, geodes]
    [1, 0, 0, 0], // rbts [ore, clay, obsidian, geodes]
    24, // timeleft in minutes
  ])

  var maxGeodes = 0

  while (stack.length > 0) {
    const [mats, bots, timeleft] = stack.pop()
    const [ore, clay, obsidian, geodes] = mats
    const [oreBots, clayBots, obsidianBots, geodeBots] = bots

    if (timeleft <= 0) {
      maxGeodes = Math.max(maxGeodes, geodes)
      continue
    }

    // Optimization: Skip redundant states
    const key = [mats, bots, timeleft].join()
    if (key in seen) continue
    seen[key] = 1

    const [nextOre, nextClay, nextObsidian, nextGeodes] = [
      ore + oreBots,
      clay + clayBots,
      obsidian + obsidianBots,
      geodes + geodeBots,
    ]

    // WAITING ROUND
    // Optimization: Only wait if we can't even produce one single robot
    const nextMats = [nextOre, nextClay, nextObsidian, nextGeodes]
    const nextBots = [oreBots, clayBots, obsidianBots, geodeBots]
    stack.push([nextMats, nextBots, timeleft - 1])

    // Optimization: Skip states that will lead to an ore overflow
    // if (ore >= timeleft * oMax) {
    //   continue
    // }

    // GEODE ROBOT
    if (ore >= ctx.geodeRobot.ore && obsidian >= ctx.geodeRobot.obsidian) {
      const nextMats = [nextOre - ctx.geodeRobot.ore, nextClay, nextObsidian - ctx.geodeRobot.obsidian, nextGeodes]
      const nextRobots = [oreBots, clayBots, obsidianBots, geodeBots + 1]
      stack.push([nextMats, nextRobots, timeleft - 1])
      continue
    }

    // OBSIDIAN ROBOT
    if (obsidianBots < maxObsidian && ore >= ctx.obsidianRobot.ore && clay >= ctx.obsidianRobot.clay) {
      const nextMats = [nextOre - ctx.obsidianRobot.ore, nextClay - ctx.obsidianRobot.clay, nextObsidian, nextGeodes]
      const nextRobots = [oreBots, clayBots, obsidianBots + 1, geodeBots]
      stack.push([nextMats, nextRobots, timeleft - 1])
      continue
    }

    // CLAY ROBOT
    if (clayBots < maxClay && ore >= ctx.clayRobot.ore) {
      const nextMats = [nextOre - ctx.clayRobot.ore, nextClay, nextObsidian, nextGeodes]
      const nextRobots = [oreBots, clayBots + 1, obsidianBots, geodeBots]
      stack.push([nextMats, nextRobots, timeleft - 1])
    }

    // ORE ROBOT
    if (oreBots < maxOre && ore >= ctx.oreRobot.ore) {
      const nextMats = [nextOre - ctx.oreRobot.ore, nextClay, nextObsidian, nextGeodes]
      const nextRobots = [oreBots + 1, clayBots, obsidianBots, geodeBots]
      stack.push([nextMats, nextRobots, timeleft - 1])
    }
  }

  console.log(`Best geode output for ${ctx.name} is ${maxGeodes}`)
  return maxGeodes * (id + 1)
}

console.log("Sample:", _.sum(sample.map(solve1)))
console.log("Task:", _.sum(data.map(solve1)))

/// Part 2

const solve2 = (input) => {
  return 0
}

// const sRes2 = 0 //_.sum(sample.map(solve2))
// const res2 = 0 //_.sum(data.map(solve2))

// console.log("Sample:", sRes2, "Task:", res2)
