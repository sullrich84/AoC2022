import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 19")

/// Part 1

const solve = (ctx, duration, id) => {
  const maxOre = Math.max(ctx.oreBot.ore, ctx.clayBot.ore, ctx.obsidianBot.ore, ctx.geodeBot.ore)
  const maxClay = ctx.obsidianBot.clay
  const maxObsidian = ctx.geodeBot.obsidian

  const seen = {}
  const stack = []
  stack.push([
    [0, 0, 0, 0], // mats [ore, clay, obsidian, geodes]
    [1, 0, 0, 0], // rbts [ore, clay, obsidian, geodes]
    duration, // timeleft in minutes
  ])

  var maxGeodes = 0

  while (stack.length > 0) {
    const [mats, bots, timeleft] = stack.pop()
    const [ore, clay, obsidian, geodes] = mats
    const [oreBot, clayBot, obsidianBot, geodeBot] = bots

    if (timeleft <= 0) {
      maxGeodes = Math.max(maxGeodes, geodes)
      continue
    }

    // Optimization: Skip redundant states
    const key = [mats, bots, timeleft].join()
    if (key in seen) continue
    seen[key] = 1

    const [nextOre, nextClay, nextObsidian, nextGeodes] = [
      ore + oreBot,
      clay + clayBot,
      obsidian + obsidianBot,
      geodes + geodeBot,
    ]

    // Optimization: Skip branches that can reach new max
    // if (timeleft * geodeBots < maxGeodes) continue

    // WAITING ROUND
    // Optimization: Only wait if we can't even produce one single robot
    const nextMats = [nextOre, nextClay, nextObsidian, nextGeodes]
    const nextBots = [oreBot, clayBot, obsidianBot, geodeBot]
    stack.push([nextMats, nextBots, timeleft - 1])

    // Optimization: Skip states that will lead to an ore overflow
    if (ore >= timeleft * maxOre) continue

    // GEODE ROBOT
    if (ore >= ctx.geodeBot.ore && obsidian >= ctx.geodeBot.obsidian) {
      const nextMats = [nextOre - ctx.geodeBot.ore, nextClay, nextObsidian - ctx.geodeBot.obsidian, nextGeodes]
      const nextBots = [oreBot, clayBot, obsidianBot, geodeBot + 1]
      stack.push([nextMats, nextBots, timeleft - 1])
      continue
    }

    // OBSIDIAN ROBOT
    // Optimization: Never produce more obsidian than we can spend in one round
    if (obsidianBot < maxObsidian && ore >= ctx.obsidianBot.ore && clay >= ctx.obsidianBot.clay) {
      const nextMats = [nextOre - ctx.obsidianBot.ore, nextClay - ctx.obsidianBot.clay, nextObsidian, nextGeodes]
      const nextBots = [oreBot, clayBot, obsidianBot + 1, geodeBot]
      stack.push([nextMats, nextBots, timeleft - 1])
      continue
    }

    // CLAY ROBOT
    // Optimization: Never produce more clay than we can spend in one round
    if (clayBot < maxClay && ore >= ctx.clayBot.ore) {
      const nextMats = [nextOre - ctx.clayBot.ore, nextClay, nextObsidian, nextGeodes]
      const nextBots = [oreBot, clayBot + 1, obsidianBot, geodeBot]
      stack.push([nextMats, nextBots, timeleft - 1])
    }

    // ORE ROBOT
    // Optimization: Never produce more ore than we can spend in one round
    if (oreBot < maxOre && ore >= ctx.oreBot.ore) {
      const nextMats = [nextOre - ctx.oreBot.ore, nextClay, nextObsidian, nextGeodes]
      const nextBots = [oreBot + 1, clayBot, obsidianBot, geodeBot]
      stack.push([nextMats, nextBots, timeleft - 1])
    }
  }

  console.log(`Best geode output for ${ctx.name} is ${maxGeodes}`)
  return id * maxGeodes
}

const solve1 = (data, id) => solve(data, 24, id + 1)

console.log("Sample:", _.sum(sample.map(solve1)))
// console.log("Task:", _.sum(data.map(solve1)))

/// Part 2

const solve2 = (data, id) => solve(data, 32, id + 1)

// console.log("Sample:", _.sum(sample.map(solve2)))
// console.log("Task:", _.sum(data.map(solve2)))
