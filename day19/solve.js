import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 19")

/// Part 1

const solve11 = (ctx) => {
  console.log(ctx.name)

  const buildOreRobot = (materials, robots, timeLeft) => {
    if (materials.ore >= ctx.oreRobot.ore) {
      const rob = { ...robots, oreRobot: robots.oreRobot + 1 }
      const mat = { ...materials, ore: materials.ore - ctx.oreRobot.ore }
      return make(mat, rob, timeLeft)
    }
    return 0
  }

  const buildClayRobot = (materials, robots, timeLeft) => {
    if (materials.ore >= ctx.clayRobot.ore) {
      const rob = { ...robots, clayRobot: robots.clayRobot + 1 }
      const mat = { ...materials, ore: materials.ore - ctx.clayRobot.ore }
      return make(mat, rob, timeLeft)
    }
    return 0
  }

  const buildObsidianRobot = (materials, robots, timeLeft) => {
    if (materials.ore >= ctx.obsidianRobot.ore && materials.clay >= ctx.obsidianRobot.clay) {
      const rob = { ...robots, obsidianRobot: robots.obsidianRobot + 1 }
      const mat = {
        ...materials,
        ore: materials.ore - ctx.obsidianRobot.ore,
        clay: materials.clay - ctx.obsidianRobot.clay,
      }
      return make(mat, rob, timeLeft)
    }
    return 0
  }

  const buildGeodeRobot = (materials, robots, timeLeft) => {
    if (materials.ore >= ctx.geodeRobot.ore && materials.obsidian >= ctx.geodeRobot.obsidian) {
      const rob = { ...robots, geodeRobot: robots.geodeRobot + 1 }
      const mat = {
        ...materials,
        ore: materials.ore - ctx.geodeRobot.ore,
        obsidian: materials.obsidian - ctx.geodeRobot.obsidian,
      }
      return make(mat, rob, timeLeft)
    }
    return 0
  }

  const cache = {}
  const make = (materials, robots, timeLeft) => {
    timeLeft -= 1
    if (timeLeft <= 0) return 0
    // console.log("Minute ", timeLeft)

    const key = JSON.stringify({ materials }) + JSON.stringify({ robots }) + timeLeft
    if (key in cache) {
      return cache[key]
    }

    // Update materials
    materials.ore += robots.oreRobot
    materials.clay += robots.clayRobot
    materials.obsidian += robots.obsidianRobot
    materials.geode += robots.geodeRobot

    var best = materials.geode

    // Build nothing
    best = make(materials, robots, timeLeft)

    // Build robots (16 permutations)
    best = _.max([
      best,
      buildOreRobot(materials, robots, timeLeft),
      buildClayRobot(materials, robots, timeLeft),
      buildObsidianRobot(materials, robots, timeLeft),
      buildGeodeRobot(materials, robots, timeLeft),
    ])

    best = _.max([
      best,
      buildClayRobot(materials, robots, timeLeft),
      buildOreRobot(materials, robots, timeLeft),
      buildObsidianRobot(materials, robots, timeLeft),
      buildGeodeRobot(materials, robots, timeLeft),
    ])

    best = _.max([
      best,
      buildClayRobot(materials, robots, timeLeft),
      buildObsidianRobot(materials, robots, timeLeft),
      buildOreRobot(materials, robots, timeLeft),
      buildGeodeRobot(materials, robots, timeLeft),
    ])

    best = _.max([
      best,
      buildClayRobot(materials, robots, timeLeft),
      buildObsidianRobot(materials, robots, timeLeft),
      buildGeodeRobot(materials, robots, timeLeft),
      buildOreRobot(materials, robots, timeLeft),
    ])

    cache[key] = best
    return best
  }

  const robots = {
    oreRobot: 1,
    clayRobot: 0,
    obsidianRobot: 0,
    geodeRobot: 0,
  }

  const materials = {
    ore: 0,
    clay: 0,
    obsidian: 0,
    geode: 0,
  }

  return make(materials, robots, 24)
}

const solve1 = (ctx) => {
  console.log(ctx.name)

  const make = (timeleft) => {
    const queue = [
      [
        0, // 0 ore
        0, // 1 clay
        0, // 2 obsidian
        0, // 3 geodes
        1, // 4 ore robots
        0, // 5 clay robots
        0, // 6 obsidian robots
        0, // 7 geode robots
        timeleft,
      ],
    ]

    const minOreCosts = _.min([ctx.oreRobot.ore, ctx.clayRobot.ore, ctx.obsidianRobot.ore, ctx.geodeRobot.ore])
    const maxOreCosts = _.max([ctx.oreRobot.ore, ctx.clayRobot.ore, ctx.obsidianRobot.ore, ctx.geodeRobot.ore])

    const seen = {}
    var best = 0

    while (queue.length > 0) {
      var [ore, clay, obsidian, geodes, oreRbts, clayRbts, obsidianRbts, geodeRbts, timeleft] = queue.pop()

      // Track the best geodes output
      best = _.max([best, geodes])

      // Skip further production since we ran out of time
      if (timeleft <= 0) continue

      // Optimization 1: Skip paths where we cant spend all of our ores
      if (ore >= maxOreCosts * timeleft) continue

      // Check if state has been computed before
      const key = [ore, clay, obsidian, geodes, oreRbts, clayRbts, obsidianRbts, geodeRbts, timeleft].join(":")
      if (key in seen) continue
      seen[key] = timeleft

      // Produce ore robot
      if (ore >= ctx.oreRobot.ore) {
        queue.push([
          ore + oreRbts - ctx.oreRobot.ore,
          clay + clayRbts,
          obsidian + obsidianRbts,
          geodes + geodeRbts,
          oreRbts + 1,
          clayRbts,
          obsidianRbts,
          geodeRbts,
          timeleft - 1,
        ])
      }

      // Produce clay robot
      if (ore >= ctx.clayRobot.ore) {
        queue.push([
          ore + oreRbts - ctx.clayRobot.ore,
          clay + clayRbts,
          obsidian + obsidianRbts,
          geodes + geodeRbts,
          oreRbts,
          clayRbts + 1,
          obsidianRbts,
          geodeRbts,
          timeleft - 1,
        ])
      }

      // Produce obsidian robot
      if (ore >= ctx.obsidianRobot.ore && clay >= ctx.obsidianRobot.clay) {
        queue.push([
          ore + oreRbts - ctx.obsidianRobot.ore,
          clay + clayRbts - ctx.obsidianRobot.clay,
          obsidian + obsidianRbts,
          geodes + geodeRbts,
          oreRbts,
          clayRbts,
          obsidianRbts + 1,
          geodeRbts,
          timeleft - 1,
        ])
      }

      // Produce geode robot
      if (ore >= ctx.geodeRobot.ore && obsidian >= ctx.geodeRobot.obsidian) {
        queue.push([
          ore + oreRbts - ctx.geodeRobot.ore,
          clay + clayRbts,
          obsidian + obsidianRbts - ctx.geodeRobot.obsidian,
          geodes + geodeRbts,
          oreRbts,
          clayRbts,
          obsidianRbts,
          geodeRbts + 1,
          timeleft - 1,
        ])
      }

      // We cant spend ore on robots, go to next cycle
      // if (ore < minOreCosts) {
      queue.push([
        ore + oreRbts,
        clay + clayRbts,
        obsidian + obsidianRbts,
        geodes + geodeRbts,
        oreRbts,
        clayRbts,
        obsidianRbts,
        geodeRbts,
        timeleft - 1,
      ])
      // }
    }

    return best
  }

  return make(24)
}

const sRes1 = sample.map(solve1)
const res1 = 0 //[{ data: data }].map(solve1)

console.log("Sample:", sRes1, "Task:", res1)

/// Part 2

const solve2 = (input) => {
  console.log(input)
  return 0
}

const sRes2 = 0 //_.sum(sample.map(solve2))
const res2 = 0 //_.sum(data.map(solve2))

console.log("Sample:", sRes2, "Task:", res2)
