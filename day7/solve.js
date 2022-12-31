import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 7: No Space Left On Device")

/// Part 1

const build = (ctx) => {
  let fs = []
  let path = []

  ctx.data.map((command) => {
    const [p1, p2, p3] = command.split(" ")

    const changeDir = (dest) => {
      dest === ".." ? path.pop() : path.push(dest)
    }

    const addFile = (size, name) => {
      const filePath = [...path, name.replace(".", "")].join(".")
      _.set(fs, filePath, parseInt(size))
    }

    if (p2 === "cd") changeDir(p3)
    else if (!isNaN(p1)) addFile(p1, p2)
  })

  return { ...ctx, fs }
}

const solve1 = ({ fs }) => {
  var answer = 0

  const calcSize = (obj) => {
    const vals = Object.values(obj)
    const files = vals.filter((v) => !_.isObject(v))
    const dirs = vals.filter((v) => _.isObject(v))
    const dSize = _.sum(dirs.map((d) => parseInt(calcSize(d))))
    const fSize = _.sum(files)

    if (dSize + fSize <= 100000) {
      answer += dSize + fSize
    }

    return dSize + fSize
  }

  calcSize(fs)
  return answer
}

const sRes1 = [{ data: sample }].map(build).map(solve1)
const res1 = [{ data: data }].map(build).map(solve1)

console.log("Sample:", sRes1, "Task:", res1)

/// Part 2

const solve2 = ({ fs }) => {
  const dirSizes = []

  const calcSize = (obj) => {
    const vals = Object.values(obj)
    const files = vals.filter((v) => !_.isObject(v))
    const dirs = vals.filter((v) => _.isObject(v))

    const dSize = _.sum(dirs.map((d) => parseInt(calcSize(d))))
    const fSize = _.sum(files)

    dirSizes.push(dSize + fSize)
    return dSize + fSize
  }

  const freeSpace = 70000000 - calcSize(fs)
  return _.min(_.filter(dirSizes, (dirSize) => freeSpace + dirSize >= 30000000))
}

const sRes2 = [{ data: sample }].map(build).map(solve2)
const res2 = [{ data: data }].map(build).map(solve2)

console.log("Sample:", sRes2, "Task:", res2)
