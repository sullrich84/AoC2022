import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 2")

const points = {
  rock: 1,
  paper: 2,
  scissor: 3,

  lose: 0,
  draw: 3,
  win: 6,
}

const rules = {
  rock: {
    rock: "draw",
    paper: "lose",
    scissor: "win",
  },
  paper: {
    rock: "win",
    paper: "draw",
    scissor: "lose",
  },
  scissor: {
    rock: "lose",
    paper: "win",
    scissor: "draw",
  },
}

/// Part 1

const map1 = ([oppHand, myHand]) => {
  const outcome = rules[myHand][oppHand]
  return points[myHand] + points[outcome]
}

const sRes1 = _.sum(sample.map(map1))
const res1 = _.sum(data.map(map1))

console.log("Sample:", sRes1, "Task:", res1)

/// Part 2

const strat = {
  rock: "lose",
  paper: "draw",
  scissor: "win",
}

const rules2 = {
  win: {
    rock: "paper",
    paper: "scissor",
    scissor: "rock",
  },
  lose: {
    rock: "scissor",
    paper: "rock",
    scissor: "paper",
  },
  draw: {
    rock: "rock",
    paper: "paper",
    scissor: "scissor",
  },
}

const map2 = ([oppHand, myHand]) => {
  const outcome = strat[myHand]
  const hand2Play = rules2[outcome][oppHand]
  return points[outcome] + points[hand2Play]
}

const sRes2 = _.sum(sample.map(map2))
const res2 = _.sum(data.map(map2))

console.log("Sample:", sRes2, "Task:", res2)
