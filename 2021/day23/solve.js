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

const roomEntry = { A: 2, B: 4, C: 6, D: 8 }

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

  const _ref = debugState(state)
  stack.push([state, 0, []])

  loop: while (stack.length > 0) {
    const [state, energy, history] = stack.pop()

    const rooms = _.flatten([state.A, state.B, state.C, state.D, state.hallway])
    const roomKey = rooms.map((a) => a || ".").join("")

    if (roomKey in seen) continue loop
    seen[roomKey] = energy

    if (roomKey.substr(0, 8) === "AABBCCDD") {
      minEnergy = energy
      break loop
    }

    // 1. Handle players in hallway
    hallway: for (var pos = 0; pos < state.hallway.length; pos++) {
      const player = state.hallway[pos]
      if (player === null) continue hallway

      // Check if amphipod can access it destination room
      const top = state[player][0] || null
      const bot = state[player][1] || null
      if (top !== null || (bot !== null && bot !== player)) continue hallway

      // Calculate taxi way to destination room
      const cp = roomEntry[player]
      const [ts, te] = [Math.min(pos, cp), Math.max(pos, cp) + 1]
      const tw = state.hallway.slice(ts, te)

      // Clear current amphipod from taxi way
      pos < cp ? (tw[0] = null) : (tw[tw.length - 1] = null)

      // Check if taxi way is passable
      const wayBlocked = !!tw.find((e) => e !== null)
      if (wayBlocked) continue hallway

      if (bot === null) {
        // Move to bottom in destination room
        var hallway = _.set([...state.hallway], pos, null)
        const costs = (2 + Math.abs(cp - pos)) * moveCosts[player]
        var msg = `${player}: HW(${pos}) -> ${player}(1) @${energy} + ${costs}`
        stack.push([{ ...state, [player]: [null, player], hallway }, energy + costs, [...history, msg]])
      } else {
        // Move to top in destination room
        var hallway = _.set([...state.hallway], pos, null)
        const costs = (1 + Math.abs(cp - pos)) * moveCosts[player]
        var msg = `${player}: HW(${pos}) -> ${player}(0) @${energy} + ${costs}`
        stack.push([{ ...state, [player]: [player, bot], hallway }, energy + costs, [...history, msg]])
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
        // Calculate taxi way to destination room
        const ap = top
        const cp = roomEntry[roomName]
        const ep = roomEntry[ap]
        const tw = state.hallway.slice(Math.min(ep, cp), Math.max(ep, cp) + 1)
        const twFree = !tw.find((e) => e !== null)

        // Check if destination room is accessible
        const dr = state[ap]
        const drAccess = dr[0] === null && (dr[1] === null || dr[1] === ap)

        if (twFree && drAccess) {
          if (dr[1] !== null) {
            // Move from top to destination top
            const costs = (1 + tw.length) * moveCosts[ap]
            var msg = `${ap}: ${roomName}(0) -> ${ap}(0) @${energy} + ${costs}`
            stack.push([{ ...state, [roomName]: [null, bot], [ap]: [ap, dr[1]] }, energy + costs, [...history, msg]])
          } else {
            // Move from top to destination bottom
            const costs = (2 + tw.length) * moveCosts[ap]
            var msg = `${ap}: ${roomName}(0) -> ${ap}(1) @${energy} + ${costs}`
            stack.push([{ ...state, [roomName]: [null, bot], [ap]: [null, ap] }, energy + costs, [...history, msg]])
          }
        } else {
          // Park top amphipod in hallway
          for (const wps of wait[roomName]) {
            wp: for (const wp of wps) {
              // Break loop when encounter first blocking amphipod
              if (state.hallway[wp] !== null) break wp

              var hallway = _.set([...state.hallway], wp, ap)
              const costs = (1 + Math.abs(cp - wp)) * moveCosts[ap]
              var msg = `${ap}: ${roomName}(0) -> HW(${wp}) @${energy} + ${costs}`
              stack.push([{ ...state, [roomName]: [null, bot], hallway }, energy + costs, [...history, msg]])
            }
          }
        }
      }

      // Move second amphipod
      if (top === null && bot !== null && bot !== roomName) {
        // Calculate taxi way to destination room
        const ap = bot
        const cp = roomEntry[roomName]
        const ep = roomEntry[ap]
        const tw = state.hallway.slice(Math.min(ep, cp), Math.max(ep, cp) + 1)
        const twFree = !tw.find((e) => e !== null)

        // Check if destination room is accessible
        const dr = state[ap]
        const drAccess = dr[0] === null && (dr[1] === null || dr[1] === ap)

        if (twFree && drAccess) {
          if (dr[1] !== null) {
            // Move from bottom to destination top
            const costs = (2 + tw.length) * moveCosts[ap]
            var msg = `${ap}: ${roomName}(1) -> ${ap}(0) @${energy} + ${costs}`
            stack.push([{ ...state, [roomName]: [null, null], [ap]: [ap, dr[1]] }, energy + costs, [...history, msg]])
          } else {
            // Move from bottom to destination bottom
            const costs = (3 + tw.length) * moveCosts[ap]
            var msg = `${ap}: ${roomName}(1) -> ${ap}(1) @${energy} + ${costs}`
            stack.push([{ ...state, [roomName]: [null, null], [ap]: [null, ap] }, energy + costs, [...history, msg]])
          }
        } else {
          // Park bottom amphipod in hallway
          for (const wps of wait[roomName]) {
            wp: for (const wp of wps) {
              // Break loop when encounter first blocking amphipod
              if (state.hallway[wp] !== null) break wp

              var hallway = _.set([...state.hallway], wp, ap)
              const costs = (2 + Math.abs(cp - wp)) * moveCosts[ap]
              var msg = `${ap}: ${roomName}(1) -> HW(${wp}) @${energy} + ${costs}`
              stack.push([{ ...state, [roomName]: [null, null], hallway }, energy + costs, [...history, msg]])
            }
          }
        }
      }
    }

    stack.sort(([_a, ae], [_b, be]) => be - ae)
  }

  return minEnergy
}

console.log("Sample:", [{ data: sample }].map(solve1))
console.log("Task:", [{ data: data }].map(solve1))

/// Part 2
const solve2 = ({ data }) => {
  const seen = {}
  const stack = []

  var minEnergy = Number.POSITIVE_INFINITY

  const state = {
    A: [_.get(data, [2, 3]), "D", "D", _.get(data, [3, 3])],
    B: [_.get(data, [2, 5]), "C", "B", _.get(data, [3, 5])],
    C: [_.get(data, [2, 7]), "B", "A", _.get(data, [3, 7])],
    D: [_.get(data, [2, 9]), "A", "C", _.get(data, [3, 9])],
    hallway: _.times(11, () => null),
  }

  return minEnergy
}

// console.log("Sample:", [{ data: sample }].map(solve2))
// console.log("Task:", [{ data: data }].map(solve2))
