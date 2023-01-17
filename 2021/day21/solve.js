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
    p1: { score: 0, pos: startP1 },
    p2: { score: 0, pos: startP2 },
  }

  game: while (true) {
    for (const player of ["p1", "p2"]) {
      const moves = [nextDie(++rolls), nextDie(++rolls), nextDie(++rolls)]
      players[player].pos = nextPos(players[player].pos, _.sum(moves))
      players[player].score += players[player].pos
      if (players[player].score >= 1000) break game
    }
  }

  return Math.min(players.p1.score, players.p2.score) * rolls
}

// console.log("Sample:", solve1(sample))
// console.log("Task:", solve1(data))

/// Part 2

const solve2 = ([startP1, startP2]) => {
  const rolls = []

  for (const r1 of [1, 2, 3]) {
    for (const r2 of [1, 2, 3]) {
      for (const r3 of [1, 2, 3]) {
        rolls.push(r1 + r2 + r3)
      }
    }
  }

  const cache = {}
  const stack = []
  stack.push({
    p1: { score: 0, pos: startP1 },
    p2: { score: 0, pos: startP2 },
    turn: 0,
  })

  const wins = { p1: 0, p2: 0 }

  stack: while (stack.length > 0) {
    const { p1, p2, turn } = stack.pop()

    const key = [p1.score, p1.pos, p2.score, p2.pos, turn].join()
    if (key in cache) {
      if (cache[key] === 0) {
        wins.p1 += 1
      } else {
        wins.p2 += 1
      }
      continue stack
    }

    if (p1.score >= 21) {
      wins.p1 += 1
      cache[key] = 0
      continue stack
    }

    if (p2.score >= 21) {
      wins.p2 += 1
      cache[key] = 1
      continue stack
    }

    if (turn === 0) {
      // Turn: Player 1
      for (const r of rolls) {
        const pos = ((p1.pos + r - 1) % 10) + 1
        const score = p1.pos + p1.score
        stack.push({ p1: { score, pos }, p2, turn: 1 })
      }
    } else {
      // Turn: Player 2
      for (const r of rolls) {
        const pos = ((p2.pos + r - 1) % 10) + 1
        const score = p2.pos + p2.score
        stack.push({ p1, p2: { score, pos }, turn: 0 })
      }
    }
  }

  return 0
}

console.log("Sample:", solve2(sample))
// console.log("Task:", solve2(data))
