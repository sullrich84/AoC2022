import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 2")

/// Part 1

const points = {
  A: 1,
  B: 2,
  C: 3,

  LOSE: 0,
  DRAW: 3,
  WIN: 6,
}

const pointsPerRound = data.map(([oppHand, outcome]) => {
  let gamePoints
  let handPoints

  switch (outcome) {
    case "X": // LOSE
      gamePoints = points.LOSE

      switch (oppHand) {
        case "A":
          handPoints = points.C
          break
        case "B":
          handPoints = points.A
          break
        case "C":
          handPoints = points.B
          break
      }
      break

    case "Y": // DRAW
      gamePoints = points.DRAW
      handPoints = points[oppHand]
      break

    case "Z": // WIN
      gamePoints = points.WIN

      switch (oppHand) {
        case "A":
          handPoints = points.B
          break
        case "B":
          handPoints = points.C
          break
        case "C":
          handPoints = points.A
          break
      }
      break
  }

  console.log("Points:", handPoints, gamePoints)
  return handPoints + gamePoints
})

const sum = pointsPerRound.reduce((acc, val) => acc + val, 0)
console.log("Part 2:", sum)

/// Part 2

// const part2 = data;
// console.log("Part 2", part2);
