import _ from "lodash"
import data, { sample } from "./data.js"

console.clear()
console.log("🎄 Day 16: Packet Decoder")

/// Part 1

function toPaddedBinary(hex) {
  const binary = parseInt(hex, 16).toString(2)
  return _.padStart(binary, Math.ceil(binary.length / 4) * 4, 0)
}

function getHeader (bin) {
  const verHead = bin.substring(0, 3)
  const tidHead = bin.substring(3, 6)
  const tail = bin.substring(6)

  const ver = parseInt(verHead, 2)
  const tid = parseInt(tidHead, 2)

  return [ver, tid, tail]
}

function parseLiteral(literal) {
  const chunks = _.chunk(literal, 5).filter((c) => c.length == 5)
  const last = chunks.findIndex((e) => e[0] === "0")
  const packets = chunks.slice(0, last + 1)
  const val = parseInt(packets.map(([_, ...r]) => r.join("")).join(""), 2)
  console.log("   LITERAL:", val)

  const tail = literal.substring(packets.length * 5)
  return [packets, tail]
}

function parseOperator(operator) {
  const ltid = operator.substring(1, 0)

  if (ltid == "0") {
    // 15 Bit
    const len = parseInt(operator.substring(1, 16), 2)
    console.log("   OPERATOR:", 0)
    const subPackets = operator.substring(16, 16 + len)
    const tail = operator.substring(16 + len)
    return [0, subPackets, tail]
  }

  if (ltid != "1") throw "Operator Error"

  // 11 Bit
  console.log("   OPERATOR:", 1)
  const subPacketNum = parseInt(operator.substring(1, 11), 2)
  const tail = operator.substring(11 + subPacketNum)
  return [1, subPacketNum, tail]
}

function parse(bin, vSum = 0) {
  if (bin == "" || parseInt(bin, 2) == 0) return vSum

  const [ver, tid, tail] = getHeader(bin)
  console.log("ver:", ver, "tid:", tid, "bin:", bin)

  if (tid == 4) {
    const [_, litTail] = parseLiteral(tail)
    vSum += parse(litTail, vSum)
  }
  else {
    const [ltid, subPackets, opTail] = parseOperator(tail)
    if (ltid == 0) {
      vSum += parse(subPackets, vSum) + parse(opTail, vSum)
    } else {
      vSum += parse(opTail, vSum)
    }
  }

  return vSum + ver
}

const solve1 = (data)  => {

  // console.log("vSum", parse(toPaddedBinary("D2FE28")))
  // console.log("vSum", parse(toPaddedBinary("38006F45291200")))
  // console.log("vSum", parse(toPaddedBinary("EE00D40C823060")))
  // console.log("vSum", parse(toPaddedBinary("8A004A801A8002F478")))
  // console.log("vSum", parse(toPaddedBinary("620080001611562C8802118E34")))
  // console.log("vSum", parse(toPaddedBinary("C0015000016115A2E0802F182340")))
  // console.log("vSum", parse(toPaddedBinary("A0016C880162017C3686B18A3D4780")))

  return 0
}

console.log()
console.log("Sample:", solve1(sample))
// console.log("Task:", solve1(data))

/// Part 2

const solve2 = ({ data }) => {
  return 0
}

// console.log("Sample:", [{ data: sample }].map(solve2))
// console.log("Task:", [{ data: data }].map(solve2))
