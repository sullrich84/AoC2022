import _ from "lodash";
import data from "./data.js";

const part1 = _.max(_.map(data, _.sum));
console.log("Part 1", part1);

const part2 = _.sum(_.take(_.sortBy(_.map(data, _.sum)).reverse(), 3));
console.log("Part 2", part2);
