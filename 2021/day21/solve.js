import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 21: Dirac Dice")

/// Part 1

const solve1 = ([startP1, startP2]) => {
  var rolls = 0

  const nextDie = (roll) => {
    return ((roll - 1) % 100) + 1
  }

  const nextPos = (pos, moves) => {
    return ((pos + moves - 1) % 10) + 1
  }

  const players = {
    player1: {
      score: 0,
      pos: startP1,
    },
    player2: {
      score: 0,
      pos: startP2,
    },
  }

  game: while (true) {
    for (const player of ["player1", "player2"]) {
      const moves = [nextDie(++rolls), nextDie(++rolls), nextDie(++rolls)]
      players[player].pos = nextPos(players[player].pos, _.sum(moves))
      players[player].score += players[player].pos
      if (players[player].score >= 1000) break game
    }
  }

  return Math.min(players.player1.score, players.player2.score) * rolls
}

// console.log("Sample:", solve1(sample))
// console.log("Task:", solve1(data))

/// Part 2

const solve2 = ([startP1, startP2]) => {
  const rolls = []

  stack = []
  stack.push([
    [startP1, 0, 0],
    [startP2, 0, 0],
  ])

  // while (stack.length > 0) {
  // const [pos, score, ]
  // }

  return 0
}

console.log("Sample:", solve2(sample))
// console.log("Task:", solve2(data))
