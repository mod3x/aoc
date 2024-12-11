import { open } from "node:fs/promises";
import { createInterface as createReadline } from "node:readline/promises";

function stringToInt(str: string) {
  return parseInt(str, 10);
}

async function loadInput(
  filePath: string = "./2024/day_10/input.txt"
): Promise<number[][]> {
  const matrix: number[][] = [];

  const fd = await open(filePath);
  const stream = fd.createReadStream();

  const rl = createReadline({
    input: stream,
  });

  for await (const line of rl) {
    matrix.push(line.split("").map(stringToInt));
  }

  return Promise.resolve(matrix);
}

async function part1() {
  const matrix = await loadInput();

  let result = 0;

  console.log(`Part 1 result : ${result}`);
}

async function part2() {
  const matrix = await loadInput();

  let result = 0;

  console.log(`Part 2 result : ${result}`);
}

await part1();
await part2();
