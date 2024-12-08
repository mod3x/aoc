import { open } from "node:fs/promises";
import { createInterface as createReadline } from "node:readline/promises";

const nextMovePositions = new Map<string, [number, number]>()
  .set("^", [-1, 0])
  .set(">", [0, 1])
  .set("v", [1, 0])
  .set("<", [0, -1]);

const nextMoveTurns = new Map<string, string>()
  .set("^", ">")
  .set(">", "v")
  .set("v", "<")
  .set("<", "^");

async function loadInput(
  filePath: string = "./2024/day_6/input.txt"
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

function toCacheKey(row: number, col: number) {
  return `${row};${col}`;
}

async function part1() {
  const matrix = await loadInput();
  const rows = matrix.length;
  const cols = matrix[0].length;

  const countVisits = (
    initialRow: number,
    initialCol: number,
    initialDirection: string,
    visits: Set<string>
  ) => {
    let mutRow = initialRow;
    let mutCol = initialCol;
    let mutDirection = initialDirection;

    while (true) {
      visits.add(toCacheKey(mutRow, mutCol));

      const [dr, dc] = nextMovePositions.get(mutDirection)!;
      const newRow = mutRow + dr;
      const newCol = mutCol + dc;

      if (
        newRow < 0 ||
        newRow >= rows ||
        newCol < 0 ||
        newCol >= cols ||
        (newRow === initialRow &&
          newCol === initialCol &&
          mutDirection === initialDirection)
      ) {
        break;
      }

      if (matrix[newRow][newCol] === "#") {
        mutDirection = nextMoveTurns.get(mutDirection)!;
      } else {
        mutRow = newRow;
        mutCol = newCol;
      }
    }
  };

  let visits = new Set<string>();
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (nextMovePositions.has(matrix[r][c])) {
        countVisits(r, c, matrix[r][c], visits);
      }
    }
  }

  console.log(`Part 1 result : ${visits.size}`);
}

async function part2() {
  const matrix = await loadInput();

  let result = 0;

  console.log(`Part 2 result : ${result}`);
}

// await part1();
console.time();
await part2();
console.timeEnd();
