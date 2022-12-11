import _ from "lodash"
import BigNumber from "bignumber.js"
import data, { sample } from "./data.js"

function isFloat(n) {
  return n === +n && n !== (n | 0)
}

console.log("🎄 Day X")

/// Part 1

const solve1 = (input) => {
  const monkeys = input.data.map(([__, items, op, tst, ...conditions], monkeyIndex) => {
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
        const worryLevel = eval(`var oldVal = ${item}; var newVal; ${monkey.operation}`)
        const worryLevelDivided = Math.floor(worryLevel / 3)
        const target = !isFloat(worryLevelDivided / monkey.divisible) ? monkey.conditions[0] : monkey.conditions[1]
        monkeys[target].items = [...monkeys[target].items, worryLevelDivided]
        monkeys[index].items.shift()
        // console.log(`item with worry level ${worryLevelDivided} is thrown to monkey ${target}`)
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

/// Part 2

const solve2 = (input) => {
  const monkeys = input.data.map(([__, items, op, tst, ...conditions]) => {
    return {
      items: items
        .split(":")[1]
        .split(",")
        .map((n) => new BigNumber(n.trim())),
      operation: op.split("new = old ")[1].split(" "),
      divisible: new BigNumber(_.last(tst.split(" "))),
      conditions: conditions.map((cond) => parseInt(cond.split(" ").pop())),
      inspects: 0,
    }
  })

  _.times(20, () => {
    monkeys.forEach((monkey, index) => {
      const tempItems = [...monkey.items]

      tempItems.forEach((item) => {
        var worryLevel = BigNumber(item)
        var opVal = monkey.operation[1] === "old" ? item : new BigNumber(monkey.operation[1])

        switch (monkey.operation[0]) {
          case "+":
            worryLevel = worryLevel.plus(opVal)
            break
          case "-":
            worryLevel = worryLevel.minus(opVal)
            break
          case "*":
            worryLevel = worryLevel.multipliedBy(opVal)
            break
          case "/":
            worryLevel = worryLevel.dividedBy(opVal)
            break
        }

        const worryLevelDivided = Math.floor(worryLevel / 3)
        const target = !isFloat(worryLevelDivided / monkey.divisible) ? monkey.conditions[0] : monkey.conditions[1]
        monkeys[target].items = [...monkeys[target].items, worryLevelDivided]
        monkeys[index].items.shift()
        monkeys[index].inspects += 1
      })
    })

    // if (round % 100 === 0) {
    //   console.log(round / 100 + "% done")
    // }

    // if ([0, 19, 999].includes(round)) {
    //   debugger
    // }
  })

  const inspects = monkeys
    .map((m) => m.inspects)
    .sort((a, b) => a - b)
    .reverse()
  const top2 = _.take(inspects, 2)
  return top2.reduce((v, a) => v * a, 1)
}

const sRes2 = [{ data: sample }].map(solve2)
const res2 = 0 // [{ data: data }].map(solve2)

console.log("Sample:", sRes2, "Task:", res2)
