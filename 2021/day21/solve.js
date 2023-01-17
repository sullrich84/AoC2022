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

console.log("Sample:", solve1(sample))
console.log("Task:", solve1(data))

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

  const play = ({ p1, p2, turn }) => {
    const key = [p1.score, p1.pos, p2.score, p2.pos, turn].join()
    if (key in cache) return cache[key]
    var [p1Wins, p2Wins] = [0, 0]

    if (turn === 0) {
      // Turn: Player 1
      for (const r of rolls) {
        const posP1 = ((p1.pos + r - 1) % 10) + 1
        const scoreP1 = p1.score + posP1

        if (scoreP1 >= 21) {
          p1Wins += 1
        } else {
          var [np1Wins, np2Wins] = play({ p1: { score: scoreP1, pos: posP1 }, p2, turn: 1 })
          p1Wins += np1Wins
          p2Wins += np2Wins
        }
      }
    } else {
      // Turn: Player 2
      for (const r of rolls) {
        const posP2 = ((p2.pos + r - 1) % 10) + 1
        const scoreP2 = p2.score + posP2

        if (scoreP2 >= 21) {
          p2Wins += 1
        } else {
          var [np1Wins, np2Wins] = play({ p1, p2: { score: scoreP2, pos: posP2 }, turn: 0 })
          p1Wins += np1Wins
          p2Wins += np2Wins
        }
      }
    }

    cache[key] = [p1Wins, p2Wins]
    return [p1Wins, p2Wins]
  }

  return _.max(
    play({
      p1: { score: 0, pos: startP1 },
      p2: { score: 0, pos: startP2 },
      turn: 0,
    }),
  )
}

console.log("Sample:", solve2(sample))
console.log("Task:", solve2(data))
