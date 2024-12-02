import { open } from "node:fs/promises";
import { createInterface as createReadline } from "node:readline/promises";

function stringToInt(str: string) {
  return parseInt(str, 10);
}

async function loadInput(
  filePath: string = "./2024/day_2/input.txt"
): Promise<number[][]> {
  const list: number[][] = [];

  const fd = await open(filePath);
  const stream = fd.createReadStream();

  const rl = createReadline({
    input: stream,
  });

  for await (const line of rl) {
    const nums = line.split(" ").map(stringToInt);
    list.push(nums);
  }

  return Promise.resolve(list);
}

function isValidIncrease(a: number, b: number) {
  return b > a && Math.abs(b - a) >= 1 && Math.abs(b - a) <= 3;
}

function isValidDecrease(a: number, b: number) {
  return a > b && Math.abs(a - b) >= 1 && Math.abs(a - b) <= 3;
}

function getPairOrder(a: number, b: number) {
  if (b > a) {
    return "asc";
  }

  return "desc";
}

function validateLevel(nums: number[]) {
  const order = getPairOrder(nums[0], nums[1]);

  for (let i = 0; i < nums.length - 1; i++) {
    const left = nums[i];
    const right = nums[i + 1];

    if (
      left === right ||
      (order === "asc" && !isValidIncrease(left, right)) ||
      (order === "desc" && !isValidDecrease(left, right))
    ) {
      return false;
    } else {
      continue;
    }
  }

  return true;
}

function validateLevelWithRemoval(nums: number[]) {
  for (let i = 0; i < nums.length; i++) {
    const newNums = nums.slice();
    newNums.splice(i, 1);
    if (validateLevel(newNums)) {
      return true;
    }
  }

  return false;
}

async function part1() {
  const list = await loadInput();

  let result = 0;

  for (const nums of list) {
    if (validateLevel(nums)) {
      result += 1;
    }
  }

  console.log(`Part 1 result : ${result}`);
}

// NOTE: Not optimal O(n^2) solution
async function part2() {
  const list = await loadInput();

  let result = 0;

  for (const nums of list) {
    if (validateLevel(nums)) {
      result += 1;
    } else if (validateLevelWithRemoval(nums)) {
      result += 1;
    }
  }

  console.log(`Part 2 result : ${result}`);
}

await part1();
await part2();
