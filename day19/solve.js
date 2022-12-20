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

const solve1 = ({ name, oreRobot, clayRobot, obsidianRobot, geodeRobot }) => {
  console.log(name)

  const make = (timeleft) => {
    const queue = [
      {
        ore: 0,
        clay: 0,
        obsidian: 0,
        geodes: 0,
        oreRbts: 1,
        clayRbts: 0,
        obsidianRbts: 0,
        geodeRbts: 0,
        timeleft,
      },
    ]

    const minOreCosts = _.min([oreRobot.ore, clayRobot.ore, obsidianRobot.ore, geodeRobot.ore])
    const maxOreCosts = _.max([oreRobot.ore, clayRobot.ore, obsidianRobot.ore, geodeRobot.ore])

    const seen = {}
    var best = 0

    while (queue.length > 0) {
      var state = queue.pop()
      const { ore, clay, obsidian, geodes, timeleft } = state
      const { oreRbts, clayRbts, obsidianRbts, geodeRbts } = state

      // Track the best geodes output
      best = _.max([best, geodes])

      // Skip further production since we ran out of time
      if (timeleft <= 0) continue

      // Optimization 1: Skip paths where we cant spend all of our ores
      if (ore >= maxOreCosts * timeleft) continue

      // Optimization 2: Skip rounds where we cant afford anything
      if (ore < minOreCosts) {
        queue.push({
          ...state,
          ore: ore + oreRbts,
          clay: clay + clayRbts,
          obsidian: obsidian + obsidianRbts,
          geodes: geodes + geodeRbts,
          timeleft: timeleft - 1,
        })
        continue
      }

      // Check if state has been computed before
      const key = JSON.stringify(state)
      if (key in seen) continue
      seen[key] = timeleft

      // Produce ore robot
      if (ore >= oreRobot.ore) {
        queue.push({
          ...state,
          ore: ore + oreRbts - oreRobot.ore,
          clay: clay + clayRbts,
          obsidian: obsidian + obsidianRbts,
          geodes: geodes + geodeRbts,
          oreRbts: oreRbts + 1,
          timeleft: timeleft - 1,
        })
      }

      // Produce clay robot
      if (ore >= clayRobot.ore) {
        queue.push({
          ...state,
          ore: ore + oreRbts - clayRobot.ore,
          clay: clay + clayRbts,
          obsidian: obsidian + obsidianRbts,
          geodes: geodes + geodeRbts,
          clayRbts: clayRbts + 1,
          timeleft: timeleft - 1,
        })
      }

      // Produce obsidian robot
      if (ore >= obsidianRobot.ore && clay >= obsidianRobot.clay) {
        queue.push({
          ...state,
          ore: ore + oreRbts - obsidianRobot.ore,
          clay: clay + clayRbts - obsidianRobot.clay,
          obsidian: obsidian + obsidianRbts,
          geodes: geodes + geodeRbts,
          obsidianRbts: obsidianRbts + 1,
          timeleft: timeleft - 1,
        })
      }

      // Produce geode robot
      if (ore >= geodeRobot.ore && obsidian >= geodeRobot.obsidian) {
        queue.push({
          ...state,
          ore: ore + oreRbts - clayRobot.ore,
          clay: clay + clayRbts,
          obsidian: obsidian + obsidianRbts - geodeRobot.obsidian,
          geodes: geodes + geodeRbts,
          geodeRbts: geodeRbts + 1,
          timeleft: timeleft - 1,
        })
      }
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
