import _ from "lodash"
import { data1, sample1, data2, sample2 } from "./data.js"

console.log("🎄 Day 23: Amphipod")

/// Part 1

const rules = {
  costs: { A: 1, B: 10, C: 100, D: 1000 },
  entry: { A: 2, B: 4, C: 6, D: 8 },
  wait: {
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
  },
}

const solve = ({ data }) => {
  const seen = {}
  const stack = []

  var minEnergy = Number.POSITIVE_INFINITY

  const state = {
    A: data[0],
    B: data[1],
    C: data[2],
    D: data[3],
    hallway: _.times(11, () => null),
  }

  const roomSize = data[0].length
  const finalRoomConfig = ["A", "B", "C", "D"].map((c) => c.repeat(roomSize)).join("")

  stack.push([state, 0, []])

  loop: while (stack.length > 0) {
    const [state, energy, history] = stack.pop()
    const nextStack = []

    const rooms = _.flatten([state.A, state.B, state.C, state.D, state.hallway])
    const roomKey = rooms.map((a) => a || ".").join("")
    const roomConfig = roomKey.substring(0, 4 * roomSize)

    if (roomKey in seen) continue loop
    seen[roomKey] = energy

    // Check if the game is in end state
    if (roomConfig === finalRoomConfig) {
      minEnergy = energy
      break loop
    }

    // --------------------------------------------------------------------
    // Move amphipods form their waiting position to their destination room
    // --------------------------------------------------------------------
    hallway: for (var i = 0; i < state.hallway.length; i++) {
      const curr = state.hallway[i]
      if (curr === null) continue hallway

      // Check if destination room of amphipod is accessible
      const destRoomAccess = !state[curr].find((e) => e !== null && e !== curr)
      if (!destRoomAccess) continue hallway

      // Check if taxi way from current waiting position to desitination room is accessible
      const cp = rules.entry[curr]
      const taxiWay = state.hallway.slice(Math.min(i, cp), Math.max(i, cp) + 1)
      taxiWay[i < cp ? 0 : taxiWay.length - 1] = null
      const taxiWayAccess = !taxiWay.find((e) => e !== null)
      if (!taxiWayAccess) continue hallway

      // Find last empty position in destination room
      const tp = _.lastIndexOf(state[curr], null)

      // Calculate moving costs to target position
      const costs = (taxiWay.length + tp) * rules.costs[curr]
      const nextEnergy = energy + costs

      // Create next target state
      const nextState = _.cloneDeep(state)
      nextState.hallway[i] = null
      nextState[curr][tp] = curr

      var msg = `Move ${curr} from waiting position HW:${i} to destination room ${curr}:${tp} for ${costs} costs`
      nextStack.push([nextState, nextEnergy, [...history, msg]])
    }

    // -------------------------------------------------
    // Move amphipods out from their initial spwan rooms
    // -------------------------------------------------
    rooms: for (const roomName of ["A", "B", "C", "D"]) {
      const room = state[roomName]
      // Room is in final state
      if (room.join("") === roomName.repeat(room.length)) continue rooms

      room: for (var i = 0; i < room.length; i++) {
        const curr = room[i]
        if (curr === null) continue room

        const tops = room.slice(0, i)
        const bots = room.slice(i + 1)

        // Skip room if current amphipod is blocked
        const blocked = tops.find((e) => e !== null)
        if (blocked) break room

        // Skip room if current amphipod don't have to move
        const mustMove = curr !== roomName || (bots.length > 0 && !!bots.find((e) => e !== curr))
        if (!mustMove) break room

        // Check if destination room of amphipod is accessible
        const destRoomAccess = !state[curr].find((e) => e !== null && e !== curr)

        // Check if taxi way from current room to desitination room is accessible
        const ep = rules.entry[curr]
        const cp = rules.entry[roomName]
        const taxiWay = state.hallway.slice(Math.min(ep, cp), Math.max(ep, cp) + 1)
        const taxiWayAccess = !taxiWay.find((e) => e !== null)

        // ------------------------------------------
        // Move amphipod directly to destination room
        // ------------------------------------------
        if (destRoomAccess && taxiWayAccess) {
          // Find last empty position in destination room
          const tp = _.lastIndexOf(state[curr], null)

          // Calculate moving costs to target position
          const costs = (i + 1 + Math.abs(cp - ep) + tp + 1) * rules.costs[curr]
          const nextEnergy = energy + costs

          // Create next target state
          const nextState = _.cloneDeep(state)
          nextState[roomName][i] = null
          nextState[curr][tp] = curr

          var msg = `Move ${curr} from ${roomName}:${i} to destination room ${curr}:${tp} for ${costs} costs`
          nextStack.push([nextState, nextEnergy, [...history, msg]])

          break room
        }

        // -----------------------------------------------
        // Move amphipod to all possible waiting positions
        // -----------------------------------------------
        for (const lrWp of rules.wait[roomName]) {
          wp: for (const wp of lrWp) {
            // Break loop when encounter first blocking amphipod
            if (state.hallway[wp] !== null) break wp

            // Calculate moving costs to wait position
            const costs = (i + 1 + Math.abs(cp - wp)) * rules.costs[curr]
            const nextEnergy = energy + costs

            // Create next target state
            const nextState = _.cloneDeep(state)
            nextState[roomName][i] = null
            nextState.hallway[wp] = curr

            var msg = `Move ${curr} from ${roomName}:${i} to wait at HW:${wp} for ${costs} costs`
            nextStack.push([nextState, nextEnergy, [...history, msg]])
          }
        }
      }
    }

    if (nextStack.length > 0) {
      stack.push(...nextStack)
      stack.sort(([_a, aEnergy], [_b, bEnergy]) => bEnergy - aEnergy)
    }
  }

  return minEnergy
}

console.log("Sample:", [{ data: sample1 }].map(solve))
console.log("Task:", [{ data: data1 }].map(solve))

/// Part 2

console.log("Sample:", [{ data: sample2 }].map(solve))
console.log("Task:", [{ data: data2 }].map(solve))
