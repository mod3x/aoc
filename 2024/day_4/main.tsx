import { open } from "node:fs/promises";
import { createInterface as createReadline } from "node:readline/promises";

async function loadInput(
  filePath: string = "./2024/day_4/input_example.txt"
): Promise<string[][]> {
  const grid: string[][] = [];

  const fd = await open(filePath);
  const stream = fd.createReadStream();

  const rl = createReadline({
    input: stream,
  });

  for await (const line of rl) {
    grid.push(line.split(""));
  }

  return Promise.resolve(grid);
}

async function part1() {
  const grid = await loadInput();

  let result = 0;

  console.log(`Part 1 result : ${result}`);
}

async function part2() {
  const grid = await loadInput();

  let result = 0;

  console.log(`Part 2 result : ${result}`);
}

await part1();
// await part2();
