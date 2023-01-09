import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 14: Extended Polymerization")

const solve = ({ template, insertions, steps }) => {
  const pairs = template
    .map((v, i, a) => (!!a[i + 1] ? v + a[i + 1] : null))
    .filter((val) => !!val)
    .reduce((acc, val) => ({ ...acc, [val]: (acc[val] || 0) + 1 }), {})

  for (var step = 0; step < steps; step++) {
    const diffs = []

    // Plan replacements
    insertions: for (const [[left, right], insertion] of insertions) {
      const pair = left + right
      if (!(pair in pairs) || pairs[pair] === 0) continue insertions
      diffs.push([pair, -pairs[pair]])
      diffs.push([left + insertion, pairs[pair]])
      diffs.push([insertion + right, pairs[pair]])
    }

    // Apply replacements
    for (const [pair, diff] of diffs) {
      pairs[pair] = (pairs[pair] || 0) + diff
      if (pairs[pair] === 0) delete pairs[pair]
    }
  }

  // Find max quantity
  const [e1, e2] = [{}, {}]
  for (const [key, val] of Object.entries(pairs)) {
    const [k1, k2] = key.split("")
    e1[k1] = (e1[k1] || 0) + val
    e2[k2] = (e2[k2] || 0) + val
  }

  // Edge elements are 1 off
  const val = Object.keys(e1).map((k) => _.max([e1[k], e2[k]]))

  const max = _.max(val)
  const min = _.min(val)
  return max - min
}

/// Part 1

console.log("Sample:", [{ template: sample[0], insertions: sample[1], steps: 10 }].map(solve))
console.log("Task:", [{ template: data[0], insertions: data[1], steps: 10 }].map(solve))

/// Part 2

console.log("Sample:", [{ template: sample[0], insertions: sample[1], steps: 40 }].map(solve))
console.log("Task:", [{ template: data[0], insertions: data[1], steps: 40 }].map(solve))
