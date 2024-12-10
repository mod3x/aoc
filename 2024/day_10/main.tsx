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

const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

function toCacheKey(r: number, c: number) {
  return `${r};${c}`;
}

async function part1() {
  const matrix = await loadInput();
  const rows = matrix.length;
  const cols = matrix[0].length;

  const bfs = (initialRow: number, initialCol: number) => {
    let occurrences = 0;

    const queue = [[initialRow, initialCol]];
    const visited = new Set();

    while (queue.length !== 0) {
      const [r, c] = queue.shift()!;

      if (matrix[r][c] === 9) {
        occurrences += 1;
        continue;
      }

      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;
        const cacheKey = toCacheKey(nr, nc);

        if (
          nr < 0 ||
          nr >= rows ||
          nc < 0 ||
          nc >= cols ||
          matrix[nr][nc] - matrix[r][c] !== 1 ||
          visited.has(cacheKey)
        ) {
          continue;
        }

        visited.add(cacheKey);
        queue.push([nr, nc]);
      }
    }

    return occurrences;
  };

  let result = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (matrix[r][c] === 0) {
        result += bfs(r, c);
      }
    }
  }

  console.log(`Part 1 result : ${result}`);
}

async function part2() {
  const matrix = await loadInput();
  const rows = matrix.length;
  const cols = matrix[0].length;

  const dfs = (row: number, col: number, digit: number) => {
    if (matrix[row][col] === 9) {
      return 1;
    }

    const nextDigit = digit + 1;

    let totalTrails = 0;

    for (const [dr, dc] of directions) {
      const nr = row + dr;
      const nc = col + dc;
      if (
        nr >= 0 &&
        nr < rows &&
        nc >= 0 &&
        nc < cols &&
        matrix[nr][nc] === nextDigit
      ) {
        totalTrails += dfs(nr, nc, nextDigit);
      }
    }

    return totalTrails;
  };

  let result = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (matrix[r][c] === 0) {
        result += dfs(r, c, 0);
      }
    }
  }

  console.log(`Part 2 result : ${result}`);
}

// await part1();
await part2();
