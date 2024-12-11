import { open } from "node:fs/promises";
import { createInterface as createReadline } from "node:readline/promises";

async function loadInput(
  filePath: string = "./2024/day_8/input_example.txt"
): Promise<string[][]> {
  const matrix: string[][] = [];

  const fd = await open(filePath);
  const stream = fd.createReadStream();

  const rl = createReadline({
    input: stream,
  });

  for await (const line of rl) {
    matrix.push(line.split(""));
  }

  return Promise.resolve(matrix);
}

function createInBounds(rows: number, cols: number) {
  return function (r: number, c: number) {
    return r >= 0 && r < rows && c >= 0 && c < cols;
  };
}

async function part1() {
  const matrix = await loadInput();
  const rows = matrix.length;
  const cols = matrix[0].length;

  const inBounds = createInBounds(rows, cols);

  const antennas = new Map<string, number[][]>();

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const entry = matrix[r][c];
      if (entry !== ".") {
        antennas.get(entry)
          ? antennas.get(entry)?.push([r, c])
          : antennas.set(entry, [[r, c]]);
      }
    }
  }

  let result = 0;

  for (const points of antennas.values()) {
    for (let i = 0; i < points.length; i++) {
      for (let j = 0; j < points.length; j++) {
        if (i !== j) {
          const a = points[i];
          const b = points[j];

          console.log(a, b);
        }
      }
    }
  }

  console.log(`Part 1 result : ${result}`);
}

async function part2() {
  const matrix = await loadInput();

  let result = 0;

  console.log(`Part 2 result : ${result}`);
}

await part1();
// await part2();
