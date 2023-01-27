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
  var minEnergyByRoom = [
    Number.POSITIVE_INFINITY,
    Number.POSITIVE_INFINITY,
    Number.POSITIVE_INFINITY,
    Number.POSITIVE_INFINITY,
  ]

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

    // Skip ineffient states
    if (minEnergy !== Number.POSITIVE_INFINITY) {
      if (energy >= minEnergy) continue loop

      const { hallway, ...rooms } = state
      const optimisticCosts = _.sum(
        hallway.map((amphipod, pos) => {
          if (amphipod === null) return 0
          const entry = roomEntry[amphipod]
          const occupied = rooms[amphipod][1] === amphipod
          return (Math.abs(pos - entry) + occupied ? 1 : 2) * moveCosts[amphipod]
        }),
      )

      if (energy + optimisticCosts >= minEnergy) continue loop
    }

    const nextState = []

    const roomKey = _.flatten([state.A, state.B, state.C, state.D])
      .map((a) => a || ".")
      .join("")

    if (roomKey in seen && seen[roomKey] < energy) continue loop
    seen[roomKey] = energy

    // Skip branches with states that have been
    // calculated with better results before
    const key = JSON.stringify(state)
    if (key in seen && seen[key] < energy) continue loop
    seen[key] = energy

    const rooms = _.flatten([state.A, state.B, state.C, state.D])
    if (rooms.join("") === "AABBCCDD") {
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
        const ne = energy + (2 + Math.abs(cp - pos)) * moveCosts[player]
        nextState.push([{ ...state, [player]: [null, player], hallway }, ne])
      } else {
        // Move to top in destination room
        var hallway = _.set([...state.hallway], pos, null)
        const ne = energy + (1 + Math.abs(cp - pos)) * moveCosts[player]
        nextState.push([{ ...state, [player]: [player, bot], hallway }, ne])
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
            const ne = energy + (1 + tw.length) * moveCosts[ap]
            nextState.push([{ ...state, [roomName]: [null, bot], [ap]: [ap, dr[1]] }, ne])
          } else {
            // Move from top to destination bottom
            const ne = energy + (2 + tw.length) * moveCosts[ap]
            nextState.push([{ ...state, [roomName]: [null, bot], [ap]: [null, ap] }, ne])
          }
        } else {
          // Park top amphipod in hallway
          for (const wps of wait[roomName]) {
            wp: for (const wp of wps) {
              // Skip loop when encounter first blocking amphipod
              if (state.hallway[wp] !== null) break wp

              var hallway = _.set([...state.hallway], wp, ap)
              const ne = energy + (1 + Math.abs(cp - wp)) * moveCosts[ap]
              nextState.push([{ ...state, [roomName]: [null, bot], hallway }, ne])
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
            const ne = energy + (3 + tw.length) * moveCosts[ap]
            nextState.push([{ ...state, [roomName]: [null, null], [ap]: [ap, dr[1]] }, ne])
          } else {
            // Move from bottom to destination bottom
            const ne = energy + (4 + tw.length) * moveCosts[ap]
            nextState.push([{ ...state, [roomName]: [null, null], [ap]: [null, ap] }, ne])
          }
        } else {
          // Park bottom amphipod in hallway
          for (const wps of wait[roomName]) {
            wp: for (const wp of wps) {
              // Skip loop when encounter first blocking amphipod
              if (state.hallway[wp] !== null) continue wp

              var hallway = _.set([...state.hallway], wp, ap)
              const ne = energy + (2 + Math.abs(cp - wp)) * moveCosts[ap]
              nextState.push([{ ...state, [roomName]: [null, null], hallway }, ne])
            }
          }
        }
      }
    }

    // Skip states with lock situations
    if (nextState.length === 0) {
      continue
    }

    // Favor states that have completed room
    // Favor states by optimistic costs where completed rooms are equal
    const calcSortVal = ([{ hallway, ...rooms }]) => {
      const aScore = rooms["A"][1] === "A" ? (rooms["A"][0] === "A" ? 2 : 1) : 0
      const bScore = rooms["B"][1] === "B" ? (rooms["B"][0] === "B" ? 2 : 1) : 0
      const cScore = rooms["C"][1] === "C" ? (rooms["C"][0] === "C" ? 2 : 1) : 0
      const dScore = rooms["D"][1] === "D" ? (rooms["D"][0] === "D" ? 2 : 1) : 0

      const optimisticCosts = _.sum(
        hallway.map((amphipod, pos) => {
          if (amphipod === null) return 0
          const entry = roomEntry[amphipod]
          const occupied = rooms[amphipod][1] === amphipod
          return (Math.abs(pos - entry) + occupied ? 1 : 2) * moveCosts[amphipod]
        }),
      )

      return [aScore + bScore * 10 + cScore * 100 + dScore * 1000, optimisticCosts]
    }

    stack.push(...nextState)
    stack.sort((a, b) => {
      const [aScore, aOptCost] = calcSortVal(a)
      const [bScore, bOptCost] = calcSortVal(b)

      if (aScore === bScore) {
        // Ascending
        return bOptCost - aOptCost
      } else {
        // Decending
        return aScore - bScore
      }
    })
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
