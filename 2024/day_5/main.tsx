import { open } from "node:fs/promises";
import { createInterface as createReadline } from "node:readline/promises";

function stringToInt(str: string) {
  return parseInt(str, 10);
}

async function loadPrereq(
  filePath: string = "./2024/day_5/input.txt"
): Promise<Map<number, number[]>> {
  const adjList = new Map<number, number[]>();

  const fd = await open(filePath);
  const stream = fd.createReadStream();

  const rl = createReadline({
    input: stream,
  });

  for await (const line of rl) {
    const [src, dst] = line.split("|").map(stringToInt);

    if (!adjList.has(src)) {
      adjList.set(src, [dst]);
    } else {
      const current = adjList.get(src);
      current?.push(dst);
    }
  }

  return Promise.resolve(adjList);
}

async function loadInput(
  filePath: string = "./2024/day_5/input2.txt"
): Promise<number[][]> {
  const list: number[][] = [];

  const fd = await open(filePath);
  const stream = fd.createReadStream();

  const rl = createReadline({
    input: stream,
  });

  for await (const line of rl) {
    list.push(line.split(",").map(stringToInt));
  }

  return Promise.resolve(list);
}

function isValidSequence(nums: number[], adjList: Map<number, number[]>) {
  for (let i = 0; i < nums.length - 1; i++) {
    if (!adjList.get(nums[i])?.includes(nums[i + 1])) {
      return false;
    }
  }

  return true;
}

function restoreSequence(nums: number[], adjList: Map<number, number[]>) {
  const copy = nums.slice();
  return copy.sort((a, b) => {
    if (adjList.get(a)?.includes(b)) {
      return -1;
    } else if (adjList.get(b)?.includes(a)) {
      return 1;
    }

    return 0;
  });
}

function getPivot(nums: number[]) {
  const mid = Math.floor(nums.length / 2);
  return nums[mid];
}

async function part1() {
  const adjList = await loadPrereq();
  const list = await loadInput();

  let result = 0;

  for (const nums of list) {
    if (isValidSequence(nums, adjList)) {
      result += getPivot(nums);
    }
  }

  console.log(`Part 1 result : ${result}`);
}

async function part2() {
  const adjList = await loadPrereq();
  const list = await loadInput();

  let result = 0;

  for (const nums of list) {
    if (!isValidSequence(nums, adjList)) {
      const restored = restoreSequence(nums, adjList);
      result += getPivot(restored);
    }
  }

  console.log(`Part 2 result : ${result}`);
}

await part1();

console.time();
await part2();
console.timeEnd();
