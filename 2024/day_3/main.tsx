import { open } from "node:fs/promises";
import { createInterface as createReadline } from "node:readline/promises";

const re = /mul\((\d{1,3}),(\d{1,3})\)/g;
const re2 = /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g;

function stringToInt(str: string) {
  return parseInt(str, 10);
}

async function loadInput(
  filePath: string = "./2024/day_3/input.txt"
): Promise<string[]> {
  const list: string[] = [];

  const fd = await open(filePath);
  const stream = fd.createReadStream();

  const rl = createReadline({
    input: stream,
  });

  for await (const line of rl) {
    list.push(line);
  }

  return Promise.resolve(list);
}

async function part1() {
  const list = await loadInput();

  let result = 0;

  for (const str of list) {
    const matches = str.matchAll(re);
    for (const m of matches) {
      result += stringToInt(m[1]) * stringToInt(m[2]);
    }
  }

  console.log(`Part 1 result : ${result}`);
}

async function part2() {
  const list = await loadInput();

  let result = 0;
  let include = true;

  for (const str of list) {
    const matches = str.matchAll(re2);

    for (const m of matches) {
      if (m[0] === "do()") {
        include = true;
      } else if (m[0] === "don't()") {
        include = false;
      } else if (include === true) {
        result += stringToInt(m[1]) * stringToInt(m[2]);
      }
    }
  }

  console.log(`Part 2 result : ${result}`);
}

await part1();
await part2();
