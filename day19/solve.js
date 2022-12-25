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

const solve1 = (ctx, id) => {
  const oMax = Math.max(ctx.oreRobot.ore, ctx.clayRobot.ore, ctx.obsidianRobot.ore, ctx.geodeRobot.ore)
  const oMin = Math.min(ctx.oreRobot.ore, ctx.clayRobot.ore, ctx.obsidianRobot.ore, ctx.geodeRobot.ore)

  const seen = {}
  const stack = []
  stack.push([
    [0, 0, 0, 0], // mats [ore, clay, obsidian, geodes]
    [1, 0, 0, 0], // rbts [ore, clay, obsidian, geodes]
    24, // timeleft in minutes
    [], // Debug history
  ])

  var maxGeodes = 0

  while (stack.length > 0) {
    const [mats, robots, timeleft, history] = stack.pop()
    const [ore, clay, obsidian, geodes] = mats
    const [oreRobots, clayRobots, obsidianRobots, geodeRobots] = robots

    if (timeleft <= 0) {
      maxGeodes = Math.max(maxGeodes, geodes)
      continue
    }

    // Optimization: Skip redundant states
    const key = [mats, robots, timeleft].join()
    if (key in seen) continue
    seen[key] = 1

    const [nextOre, nextClay, nextObsidian, nextGeodes] = [
      ore + oreRobots,
      clay + clayRobots,
      obsidian + obsidianRobots,
      geodes + geodeRobots,
    ]

    // WAITING ROUND
    // Optimization: Only wait if we can't even produce one single robot
    // if (ore < oMin && clay === 0 && obsidian === 0) {
    const nextMats = [nextOre, nextClay, nextObsidian, nextGeodes]
    const nextRobots = [oreRobots, clayRobots, obsidianRobots, geodeRobots]
    stack.push([nextMats, nextRobots, timeleft - 1, [...history, `Minute ${25 - timeleft}: wait`]])
    // }

    // Optimization: Skip states that will lead to an ore overflow
    // if (ore >= timeleft * oMax) {
    //   continue
    // }

    // ORE ROBOT
    // Optimization: Never produce more ore robots than we can spend in one round
    // oreRobots < oMax &&
    if (oreRobots < oMax && ore >= ctx.oreRobot.ore) {
      const nextMats = [nextOre - ctx.oreRobot.ore, nextClay, nextObsidian, nextGeodes]
      const nextRobots = [oreRobots + 1, clayRobots, obsidianRobots, geodeRobots]
      stack.push([nextMats, nextRobots, timeleft - 1, [...history, `Minute ${25 - timeleft}: build ore robot`]])
    }

    // CLAY ROBOT
    if (clayRobots < ctx.obsidianRobot.clay && ore >= ctx.clayRobot.ore) {
      const nextMats = [nextOre - ctx.clayRobot.ore, nextClay, nextObsidian, nextGeodes]
      const nextRobots = [oreRobots, clayRobots + 1, obsidianRobots, geodeRobots]
      stack.push([nextMats, nextRobots, timeleft - 1, [...history, `Minute ${25 - timeleft}: build clay robot`]])
    }

    // OBSIDIAN ROBOT
    if (ore >= ctx.obsidianRobot.ore && clay >= ctx.obsidianRobot.clay) {
      const nextMats = [nextOre - ctx.obsidianRobot.ore, nextClay - ctx.obsidianRobot.clay, nextObsidian, nextGeodes]
      const nextRobots = [oreRobots, clayRobots, obsidianRobots + 1, geodeRobots]
      stack.push([nextMats, nextRobots, timeleft - 1, [...history, `Minute ${25 - timeleft}: build obsidian robot`]])
    }

    // GEODE ROBOT
    if (ore >= ctx.geodeRobot.ore && obsidian >= ctx.geodeRobot.obsidian) {
      const nextMats = [nextOre - ctx.geodeRobot.ore, nextClay, nextObsidian - ctx.geodeRobot.obsidian, nextGeodes]
      const nextRobots = [oreRobots, clayRobots, obsidianRobots, geodeRobots + 1]
      stack.push([nextMats, nextRobots, timeleft - 1, [...history, `Minute ${25 - timeleft}: build geode robot`]])
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
