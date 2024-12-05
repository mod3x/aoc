import { open } from "node:fs/promises";
import { createInterface as createReadline } from "node:readline/promises";

const WORD = "XMAS";

async function loadInput(
  filePath: string = "./2024/day_4/input.txt"
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
  const rows = grid.length;
  const cols = grid[0].length;
  const directions = [
    [-1, 0], // Up
    [1, 0], // Down
    [0, -1], // Left
    [0, 1], // Right
    [-1, -1], // Up-left diagonal
    [-1, 1], // Up-right diagonal
    [1, -1], // Down-left diagonal
    [1, 1], // Down-right diagonal
  ];

  function searchFromPosition(r: number, c: number) {
    let occurrences = 0;

    for (const [dx, dy] of directions) {
      let match = true;

      for (let k = 0; k < WORD.length; k++) {
        const newRow = r + dx * k;
        const newCol = c + dy * k;

        if (
          newRow < 0 ||
          newRow >= rows ||
          newCol < 0 ||
          newCol >= cols ||
          grid[newRow][newCol] !== WORD[k]
        ) {
          match = false;
          break;
        }
      }

      if (match) {
        occurrences++;
      }
    }

    return occurrences;
  }

  let result = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === WORD[0]) {
        result += searchFromPosition(r, c);
      }
    }
  }

  console.log(`Part 1 result : ${result}`);
}

async function part2() {
  const grid = await loadInput();
  const rows = grid.length;
  const cols = grid[0].length;

  function searchFromPosition(r: number, c: number) {
    if (r < 1 || r > rows - 2 || c < 1 || c > cols - 2) {
      return 0;
    }

    const diag1 = new Set();
    diag1.add(grid[r - 1][c - 1]).add(grid[r + 1][c + 1]);
    if (!diag1.has("M") || !diag1.has("S")) {
      return 0;
    }

    const diag2 = new Set();
    diag2.add(grid[r - 1][c + 1]).add(grid[r + 1][c - 1]);
    if (!diag2.has("M") || !diag2.has("S")) {
      return 0;
    }

    return 1;
  }

  let result = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === WORD[2]) {
        result += searchFromPosition(r, c);
      }
    }
  }

  console.log(`Part 2 result : ${result}`);
}

await part1();
await part2();
