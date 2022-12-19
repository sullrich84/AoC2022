import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 19")

/// Part 1

const solve1 = (ctx) => {
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
