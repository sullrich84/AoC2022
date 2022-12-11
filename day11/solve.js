import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 11")

/// Part 1

const solve1 = (input) => {
  const monkeys = input.data.map(([__, inItems, inOperation, inTest, ...inConditions]) => {
    return {
      items: Array.from(inItems.matchAll("\\d+"), ([m]) => parseInt(m)),
      operation: inOperation.split("= ")[1],
      divisible: parseInt(inTest.split(" ").slice(-1)),
      conditions: inConditions.map((cond) => parseInt(cond.split(" ").slice(-1))),
      inspects: 0,
    }
  })

  _.times(20, () => {
    monkeys.forEach((monkey, index) => {
      const tempItems = [...monkey.items]

      tempItems.forEach((item) => {
        const worryLevel = Math.floor(eval(`var old = ${item}; ${monkey.operation}`) / 3)
        const target = worryLevel % monkey.divisible === 0 ? monkey.conditions[0] : monkey.conditions[1]
        monkeys[target].items = [...monkeys[target].items, worryLevel]
        monkeys[index].items.shift()
        monkeys[index].inspects += 1
      })
    })
  })

  return monkeys
    .map((m) => m.inspects)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((v, a) => v * a, 1)
}

const sRes1 = [{ data: sample }].map(solve1)
const res1 = [{ data: data }].map(solve1)

console.log("Sample:", sRes1, "Task:", res1)

/// Part 2 --------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const solve2 = (input) => {
  const monkeys = input.data.map(([__, inItems, inOperation, inTest, ...inConditions]) => {
    return {
      items: Array.from(inItems.matchAll("\\d+"), ([m]) => parseInt(m)),
      operation: inOperation.split("= ")[1],
      divisible: parseInt(inTest.split(" ").slice(-1)),
      conditions: inConditions.map((cond) => parseInt(cond.split(" ").slice(-1))),
      inspects: 0,
    }
  })

  const lcm = monkeys.reduce((acc, { divisible }) => acc * divisible, 1)

  _.times(10000, () => {
    monkeys.forEach((monkey, index) => {
      const tempItems = [...monkey.items]

      tempItems.forEach((item) => {
        const worryLevel = eval(`var old = ${item}; ${monkey.operation}`)
        const target = worryLevel % monkey.divisible === 0 ? monkey.conditions[0] : monkey.conditions[1]
        monkeys[target].items = [...monkeys[target].items, worryLevel % lcm]
        monkeys[index].items.shift()
        monkeys[index].inspects += 1
      })
    })
  })

  return monkeys
    .map((m) => m.inspects)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((a, v) => a * v, 1)
}

const sRes2 = [{ data: sample }].map(solve2)
const res2 = [{ data: data }].map(solve2)

console.log("Sample:", sRes2, "Task:", res2)
