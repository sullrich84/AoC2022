import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 11")

/// Part 1

const solve1 = (input) => {
  const monkeys = input.data.map(([__, items, op, tst, ...conditions]) => {
    return {
      items: items
        .split(":")[1]
        .split(",")
        .map((n) => parseInt(n.trim())),
      operation: op.split(": ")[1].replaceAll("new", "newVal").replaceAll("old", "oldVal"),
      divisible: parseInt(_.last(tst.split(" "))),
      conditions: conditions.map((cond) => parseInt(cond.split(" ").pop())),
      inspects: 0,
    }
  })

  _.times(20, () => {
    monkeys.forEach((monkey, index) => {
      const tempItems = [...monkey.items]

      tempItems.forEach((item) => {
        var worryLevel = eval(`var oldVal = ${item}; var newVal; ${monkey.operation}`)
        worryLevel = Math.floor(worryLevel / 3)
        const target = worryLevel % monkey.divisible === 0 ? monkey.conditions[0] : monkey.conditions[1]
        monkeys[target].items = [...monkeys[target].items, worryLevel]
        monkeys[index].items.shift()
        monkeys[index].inspects += 1
      })
    })
  })

  const inspects = monkeys
    .map((m) => m.inspects)
    .sort((a, b) => a - b)
    .reverse()
  const top2 = _.take(inspects, 2)
  return top2.reduce((v, a) => v * a, 1)
}

const sRes1 = [{ data: sample }].map(solve1)
const res1 = [{ data: data }].map(solve1)

console.log("Sample:", sRes1, "Task:", res1)

/// Part 2 --------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const solve2 = (input) => {
  const monkeys = input.data.map(([__, items, op, tst, ...conditions]) => {
    return {
      items: items
        .split(":")[1]
        .split(",")
        .map((n) => parseInt(n.trim())),
      operation: op.split(": ")[1].replaceAll("new", "newVal").replaceAll("old", "oldVal"),
      divisible: parseInt(_.last(tst.split(" "))),
      conditions: conditions.map((cond) => parseInt(cond.split(" ").pop())),
      inspects: 0,
    }
  })

  const gcd = monkeys.map((m) => m.divisible).reduce((acc, val) => acc * val, 1)

  _.times(10000, (round) => {
    monkeys.forEach((monkey, index) => {
      const tempItems = [...monkey.items]

      tempItems.forEach((item) => {
        const worryLevel = eval(`var oldVal = ${item}; var newVal; ${monkey.operation}`)
        const target = worryLevel % monkey.divisible === 0 ? monkey.conditions[0] : monkey.conditions[1]
        monkeys[target].items = [...monkeys[target].items, worryLevel % gcd]
        monkeys[index].items.shift()
        monkeys[index].inspects += 1
      })
    })
  })

  const inspects = monkeys
    .map((m) => m.inspects)
    .sort((a, b) => a - b)
    .reverse()
  const top2 = _.take(inspects, 2)
  const result = top2.reduce((v, a) => v * a, 1)
  return result
}

const sRes2 = [{ data: sample }].map(solve2)
const res2 = [{ data: data }].map(solve2)

console.log("Sample:", sRes2, "Task:", res2)
