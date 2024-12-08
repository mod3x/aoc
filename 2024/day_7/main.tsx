import { open } from "node:fs/promises";
import { createInterface as createReadline } from "node:readline/promises";

function stringToInt(str: string) {
  return parseInt(str, 10);
}

type InputEntry = {
  source: number;
  nums: number[];
};

async function loadInput(
  filePath: string = "./2024/day_7/input.txt"
): Promise<InputEntry[]> {
  const input: InputEntry[] = [];

  const fd = await open(filePath);
  const stream = fd.createReadStream();

  const rl = createReadline({
    input: stream,
  });

  for await (const line of rl) {
    const [source, rest] = line.split(": ");
    input.push({
      source: stringToInt(source),
      nums: rest.split(" ").map(stringToInt),
    });
  }

  return Promise.resolve(input);
}

function concatNums(a: number, b: number) {
  const digits = Math.floor(Math.log10(b || 1)) + 1;
  return a * Math.pow(10, digits) + b;
}

function hasEvaluatedToSource(entry: InputEntry, concat?: boolean) {
  const { source, nums } = entry;

  const stack: number[][] = [[nums[0]]];

  for (let i = 1; i < nums.length; i++) {
    const prev = stack[stack.length - 1];
    const choices = [];

    for (let j = 0; j < prev.length; j++) {
      choices.push(prev[j] + nums[i]);
      choices.push(prev[j] * nums[i]);
      concat && choices.push(concatNums(prev[j], nums[i]));
    }

    stack.push(choices);
  }

  return stack[stack.length - 1].includes(source);
}

async function part1() {
  const input = await loadInput();

  let result = 0;

  for (const entry of input) {
    if (hasEvaluatedToSource(entry)) {
      result += entry.source;
    }
  }

  console.log(`Part 1 result : ${result}`);
}

async function part2() {
  const input = await loadInput();

  let result = 0;

  for (const entry of input) {
    if (hasEvaluatedToSource(entry, true)) {
      result += entry.source;
    }
  }

  console.log(`Part 2 result : ${result}`);
}

await part1();
await part2();
