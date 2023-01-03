import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 4: Giant Squid")

const hasNum = (board, number) => {
  for (var y = 0; y < 5; y++) {
    for (var x = 0; x < 5; x++) {
      if (board[y][x] === number) {
        return [y, x]
      }
    }
  }

  return [undefined, undefined]
}

const hasBingo = (sheet) => {
  const rowMatches = _.times(5, (row) => _.sum(sheet[row]) === 5)
  const colMatches = _.times(5, (col) => _.sum(sheet.map((row) => row[col])) === 5)
  return rowMatches.includes(true) || colMatches.includes(true)
}

/// Part 1

const solve1 = ({ selects, boards }) => {
  const bingo = _.times(boards.length, () => _.times(5, () => _.times(5, () => 0)))
  const winningBoards = []
  var winningBoard, finalScore

  game: while (selects.length > 0) {
    const number = selects.shift()
    round: for (const [idx, board] of boards.entries()) {
      if (winningBoards.includes(idx)) continue round
      const [my, mx] = hasNum(board, number)

      if (my === undefined || mx === undefined) continue round
      bingo[idx][my][mx] = 1

      if (hasBingo(bingo[idx])) {
        winningBoard = idx
        finalScore = number
        winningBoards.push(idx)
        break game
      }
    }
  }

  const umatched = boards[winningBoard].map((row, y) =>
    row.map((num, x) => (bingo[winningBoard][y][x] === 0 ? num : 0)),
  )

  return _.sum(_.flatten(umatched)) * finalScore
}

console.log("Sample:", [{ selects: _.head(sample), boards: _.tail(sample) }].map(solve1))
console.log("Task:", [{ selects: _.head(data), boards: _.tail(data) }].map(solve1))

/// Part 2

const solve2 = ({ selects, boards }) => {
  const finalScores = []
  const winningBoards = []

  while (winningBoards.length < boards.length) {
    const sSelects = [...selects]
    const bingo = _.times(boards.length, () => _.times(5, () => _.times(5, () => 0)))
    var winningBoard, finalScore

    game: while (sSelects.length > 0) {
      const number = sSelects.shift()
      round: for (const [idx, board] of boards.entries()) {
        if (winningBoards.includes(idx)) continue round
        const [my, mx] = hasNum(board, number)

        if (my === undefined || mx === undefined) continue round
        bingo[idx][my][mx] = 1

        if (hasBingo(bingo[idx])) {
          winningBoard = idx
          finalScore = number
          winningBoards.push(idx)
          break game
        }
      }
    }

    const umatched = boards[winningBoard].map((row, y) =>
      row.map((num, x) => (bingo[winningBoard][y][x] === 0 ? num : 0)),
    )

    finalScores.push(_.sum(_.flatten(umatched)) * finalScore)
  }

  return _.tail(finalScores)
}

console.log("Sample:", [{ selects: _.head(sample), boards: _.tail(sample) }].map(solve1))
console.log("Task:", [{ selects: _.head(data), boards: _.tail(data) }].map(solve1))
