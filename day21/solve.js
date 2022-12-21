import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 21")

/// Part 1

const solve1 = ({ data }) => {
  const root = data.find(({ id }) => id === "root")

  const calc = ({ deps, val }) => {
    if (deps === undefined) {
      return val
    }

    const [d1, d2] = deps
    const n1 = data.find(({ id }) => id === d1)
    const n2 = data.find(({ id }) => id === d2)

    const operation = `const ${d1} = ${calc(n1)}; const ${d2} = ${calc(n2)}; ${val}`
    const res = eval(operation)

    return res
  }

  return calc(root)
}

// const sRes1 = [{ data: sample }].map(solve1)
// const res1 = [{ data: data }].map(solve1)

// console.log("Sample:", sRes1, "Task:", res1)

/// Part 2

const solve2 = ({ data }) => {
  const tree = data.map((e) => {
    if (e.id === "root") return { ...e, val: e.val.replace("+", "=") }
    if (e.id === "humn") return { ...e, val: NaN }
    return e
  })

  const treeRev = tree.map((e) => {
    if (!e.deps) return e
    var vals = e.val.split(" ")
    switch (vals[1]) {
      case "+":
        return { ...e, val: vals[0] + " - " + vals[2] }
      case "-":
        return { ...e, val: vals[0] + " + " + vals[2] }
      case "*":
        return { ...e, val: vals[0] + " / " + vals[2] }
      case "/":
        return { ...e, val: vals[0] + " * " + vals[2] }
      default:
        return e
    }
  })

  const root = tree.find(({ id }) => id === "root")
  const humn = tree.find(({ id }) => id === "humn")

  const calc = ({ deps, val }) => {
    if (deps === undefined) {
      return val
    }

    const [d1, d2] = deps
    const n1 = data.find(({ id }) => id === d1)
    const n2 = data.find(({ id }) => id === d2)

    const operation = `const ${d1} = ${calc(n1)}; const ${d2} = ${calc(n2)}; ${val}`
    const res = eval(operation)

    return res
  }

  const [hd1, hd2] = humn.deps
  const hn1 = tree.find(({ id }) => id === hd1)
  const hn2 = tree.find(({ id }) => id === hd2)

  const [rd1, rd2] = root.deps
  const rn1 = tree.find(({ id }) => id === rd1)
  const rn2 = tree.find(({ id }) => id === rd2)

  const rres1 = calc(rn1)
  const rres2 = calc(rn2)

  const hres1 = calc(hn1)
  const hres2 = calc(hn2)

  console.log("x")
}

const sRes2 = [{ data: sample }].map(solve2)
const res2 = 0 //[{ data: data }].map(solve2)

console.log("Sample:", sRes2, "Task:", res2)
