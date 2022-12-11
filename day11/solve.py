from itertools import repeat
import math

data = [
    [
        "Monkey 0:",
        "Starting items: 63, 84, 80, 83, 84, 53, 88, 72",
        "Operation: new = old * 11",
        "Test: divisible by 13",
        "If true: throw to monkey 4",
        "If false: throw to monkey 7",
    ],
    [
        "Monkey 1:",
        "Starting items: 67, 56, 92, 88, 84",
        "Operation: new = old + 4",
        "Test: divisible by 11",
        "If true: throw to monkey 5",
        "If false: throw to monkey 3",
    ],
    [
        "Monkey 2:",
        "Starting items: 52",
        "Operation: new = old * old",
        "Test: divisible by 2",
        "If true: throw to monkey 3",
        "If false: throw to monkey 1",
    ],
    [
        "Monkey 3:",
        "Starting items: 59, 53, 60, 92, 69, 72",
        "Operation: new = old + 2",
        "Test: divisible by 5",
        "If true: throw to monkey 5",
        "If false: throw to monkey 6",
    ],
    [
        "Monkey 4:",
        "Starting items: 61, 52, 55, 61",
        "Operation: new = old + 3",
        "Test: divisible by 7",
        "If true: throw to monkey 7",
        "If false: throw to monkey 2",
    ],
    [
        "Monkey 5:",
        "Starting items: 79, 53",
        "Operation: new = old + 1",
        "Test: divisible by 3",
        "If true: throw to monkey 0",
        "If false: throw to monkey 6",
    ],
    [
        "Monkey 6:",
        "Starting items: 59, 86, 67, 95, 92, 77, 91",
        "Operation: new = old + 5",
        "Test: divisible by 19",
        "If true: throw to monkey 4",
        "If false: throw to monkey 0",
    ],
    [
        "Monkey 7:",
        "Starting items: 58, 83, 89",
        "Operation: new = old * 19",
        "Test: divisible by 17",
        "If true: throw to monkey 2",
        "If false: throw to monkey 1",
    ],
]

sample = [
    [
        "Monkey 0:",
        "Starting items: 79, 98",
        "Operation: new = old * 19",
        "Test: divisible by 23",
        "If true: throw to monkey 2",
        "If false: throw to monkey 3",
    ],
    [
        "Monkey 1:",
        "Starting items: 54, 65, 75, 74",
        "Operation: new = old + 6",
        "Test: divisible by 19",
        "If true: throw to monkey 2",
        "If false: throw to monkey 0",
    ],
    [
        "Monkey 2:",
        "Starting items: 79, 60, 97",
        "Operation: new = old * old",
        "Test: divisible by 13",
        "If true: throw to monkey 1",
        "If false: throw to monkey 3",
    ],
    [
        "Monkey 3:",
        "Starting items: 74",
        "Operation: new = old + 3",
        "Test: divisible by 17",
        "If true: throw to monkey 0",
        "If false: throw to monkey 1",
    ],
]

monkeys = []

for input in data:
    _, itms, op, tst, condA, condB = input
    items = list(map(int, itms.split(": ")[1].split(",")))
    operation, opVal = op.split("new = old ")[1].split(" ")
    divisible = int(tst.split(" ").pop())
    conditionA = int(condA.split(" ").pop())
    conditionB = int(condB.split(" ").pop())
    monkeys.append({
        "items": items,
        "operation": operation,
        "opVal": opVal,
        "divisible": divisible,
        "conditionA": conditionA,
        "conditionB": conditionB,
        "inspect": 0
    })

for round in range(20):
    for index in range(len(monkeys)):
        items = monkeys[index]["items"].copy()
        monkey = monkeys[index]
        for item in items:
            worryLevel = 0

            opVal = item
            if monkey["opVal"] != "old":
                opVal = int(monkey["opVal"])

            if monkey["operation"] == "+":
                worryLevel = item + opVal
            elif monkey["operation"] == "-":
                worryLevel = item - opVal
            elif monkey["operation"] == "*":
                worryLevel = item * opVal
            elif monkey["operation"] == "/":
                worryLevel = item / opVal

            worryLevel = math.floor(worryLevel / 3)
            res = worryLevel / monkey["divisible"]

            print(res)

            target = monkey["conditionA"]
            if res % 1 != 0:
                target = monkey["conditionB"]

            # print(
            #     f"item with worry level {worryLevel} is thrown to monkey {target}")
            monkeys[index]["inspect"] += 1
            monkeys[index]["items"].pop(0)
            monkeys[target]["items"].append(worryLevel)

        # print(monkeys[0]["items"])
        # print(monkeys[1]["items"])
        # print(monkeys[2]["items"])
        # print(monkeys[3]["items"])
        # print("---")
    # print(round, "completed")

result = [monkey["inspect"] for monkey in monkeys]
result.sort()
result.reverse()
result = result[:2]
result = math.prod(result)

print(monkeys[0]["items"])
print(monkeys[1]["items"])
print(monkeys[2]["items"])
print(monkeys[3]["items"])

print(result)
