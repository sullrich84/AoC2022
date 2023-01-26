import _ from "lodash"
import data, { sample } from "./data.js"

console.log("🎄 Day 23: Amphipod")

/// Part 1

const moveCosts = { A: 1, B: 10, C: 100, D: 1000 }

const debugState = (state) => {
  const map = [
    ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
    ["#", ...state.hallway.map((e) => (e === null ? "." : e)), "#"],
    [
      "#",
      "#",
      "#",
      state.A[0] || ".",
      "#",
      state.B[0] || ".",
      "#",
      state.C[0] || ".",
      "#",
      state.D[0] || ".",
      "#",
      "#",
      "#",
    ],
    [
      "#",
      "#",
      "#",
      state.A[1] || ".",
      "#",
      state.B[1] || ".",
      "#",
      state.C[1] || ".",
      "#",
      state.D[1] || ".",
      "#",
      "#",
      "#",
    ],
    ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
  ]

  return map.map((row) => row.join(""))
}

const conn = { A: 2, B: 4, C: 6, D: 8 }

const wait = {
  A: [
    [1, 0],
    [3, 5, 7, 9, 10],
  ],
  B: [
    [3, 1, 0],
    [5, 7, 9, 10],
  ],
  C: [
    [5, 3, 1, 0],
    [7, 9, 10],
  ],
  D: [
    [7, 5, 3, 1, 0],
    [9, 10],
  ],
}

const solve1 = ({ data }) => {
  const seen = {}
  const stack = []

  var minEnergy = Number.POSITIVE_INFINITY

  const state = {
    A: [_.get(data, [2, 3]), _.get(data, [3, 3])],
    B: [_.get(data, [2, 5]), _.get(data, [3, 5])],
    C: [_.get(data, [2, 7]), _.get(data, [3, 7])],
    D: [_.get(data, [2, 9]), _.get(data, [3, 9])],
    hallway: _.times(11, () => null),
  }

  const ref = debugState(state)

  stack.push([state, 0])

  loop: while (stack.length > 0) {
    const [state, energy] = stack.pop()

    const key = JSON.stringify([state, energy])
    if (key in seen) continue
    seen[key] = true

    // Skip inefficient branches
    if (energy > minEnergy) continue
    const il = stack.length

    const res = _.flatten([state.A, state.B, state.C, state.D]).join("")

    if (res === "AABBCCDD") {
      minEnergy = energy
      continue loop
    }

    // 1. Handle players in hallway
    hallway: for (var pos = 0; pos < state.hallway.length; pos++) {
      const player = state.hallway[pos]
      if (player === null) continue hallway

      // Check if amphipod can access it destination room
      const top = state[player][0] || null
      const bot = state[player][1] || null
      if (top !== null || (bot !== null && bot !== player)) continue hallway

      // Check if way to destination room is free
      const cp = conn[player]
      const [ws, we] = [Math.min(pos, cp), Math.max(pos, cp) + 1]
      const way = state.hallway.slice(ws, we)
      pos < cp ? (way[0] = null) : (way[way.length - 1] = null)
      const wayBlocked = !!way.find((e) => e !== null)
      if (wayBlocked) continue hallway

      if (bot === null) {
        // Move to bottom in destination room
        var hallway = _.set([...state.hallway], pos, null)
        const ne = energy + (2 + Math.abs(cp - pos)) * moveCosts[player]
        stack.push([{ ...state, [player]: [null, player], hallway }, ne])
        debugger
      } else {
        // Move to top in destination room
        var hallway = _.set([...state.hallway], pos, null)
        const ne = energy + (1 + Math.abs(cp - pos)) * moveCosts[player]
        stack.push([{ ...state, [player]: [player, bot], hallway }, ne])
        debugger
      }
    }

    // 2. Handle players in rooms
    rooms: for (const roomName of ["A", "B", "C", "D"]) {
      const top = state[roomName][0] || null
      const bot = state[roomName][1] || null

      // Skip room if empty or in target state
      if ((top === bot) === roomName || (top === bot) === null) continue rooms

      // Move top amphipod
      if (top !== null) {
        const cp = conn[roomName]

        for (const wps of wait[roomName]) {
          wp: for (const wp of wps) {
            // Skip loop when encounter first blocking amphipod
            if (state.hallway[wp] !== null) break wp

            var hallway = _.set([...state.hallway], wp, top)
            const ne = energy + (1 + Math.abs(cp - wp)) * moveCosts[top]
            stack.push([{ ...state, [roomName]: [null, bot], hallway }, ne])
          }
        }
      }

      // Move second amphipod
      if (top === null && bot !== null && bot !== roomName) {
        const cp = conn[roomName]

        for (const wps of wait[roomName]) {
          wp: for (const wp of wps) {
            // Skip loop when encounter first blocking amphipod
            if (state.hallway[wp] !== null) continue wp

            var hallway = _.set([...state.hallway], wp, bot)
            const ne = energy + (2 + Math.abs(cp - wp)) * moveCosts[bot]
            stack.push([{ ...state, [roomName]: [null, null], hallway }, ne])
          }
        }
      }
    }

    if (stack.length === il) {
      debugger
    }

    // Priorize low cost branches
    stack.sort(([_s1, s1e], [_s2, s2e]) => s2e - s1e)
  }

  return minEnergy
}

console.log("Sample:", [{ data: sample }].map(solve1))
// console.log("Task:", [{ data: data }].map(solve1))

/// Part 2

const solve2 = ({ data }) => {
  return 0
}

// console.log("Sample:", [{ data: sample }].map(solve2))
// console.log("Task:", [{ data: data }].map(solve2))
