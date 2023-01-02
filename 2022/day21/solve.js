import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 21: Monkey Math")

/// Part 1

const solve1 = ({ data }) => {
  const root = data.find(({ id }) => id === "root")

  const calc = ({ deps, val }) => {
    if (deps === undefined) return val

    const [d1, d2] = deps
    const n1 = data.find(({ id }) => id === d1)
    const n2 = data.find(({ id }) => id === d2)

    const operation = `const ${d1} = ${calc(n1)}; const ${d2} = ${calc(n2)}; ${val}`
    const res = eval(operation)

    return res
  }

  return calc(root)
}

console.log("Sample:", [{ data: sample }].map(solve1))
console.log("Task:", [{ data: data }].map(solve1))

/// Part 2

const solve2 = ({ data }) => {
  const tree = data.map((e) => {
    if (e.id === "root") return { ...e, val: e.val.replace("+", "=") }
    if (e.id === "humn") return { ...e, val: undefined }
    return e
  })

  const root = tree.find(({ id }) => id === "root")
  const humn = tree.find(({ id }) => id === "humn")

  const calc = ({ id, deps, val }, humnVal) => {
    if (deps === undefined) {
      if (id === "humn") {
        return humnVal
      }

      return val
    }

    const [d1, d2] = deps
    const n1 = tree.find(({ id }) => id === d1)
    const n2 = tree.find(({ id }) => id === d2)

    const operation = `const ${d1} = ${calc(n1, humnVal)}; const ${d2} = ${calc(n2, humnVal)}; ${val}`
    const res = eval(operation)

    return res
  }

  const [rd1, rd2] = root.deps
  const rn1 = tree.find(({ id }) => id === rd1)
  const rn2 = tree.find(({ id }) => id === rd2)

  var x = 0
  var i = 1000000000000

  var xHist = []

  while (true) {
    const rres1 = calc(rn1, x)
    const rres2 = calc(rn2, x)

    const diff = rres1 - rres2
    if (diff === 0) break

    if (diff < 0) {
      i = _.max([Math.ceil(i / 100), 1])
      x = _.max(xHist)
      xHist = [x]
      continue
    }

    xHist.push(x)
    x += i
  }

  return x
}

console.log("Sample:", [{ data: data }].map(solve2))
console.log("Task:", [{ data: data }].map(solve2))
