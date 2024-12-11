const input = ["3028", "78", "973951", "5146801", "5", "0", "23533", "857"];

function createWriteToMap(map: Map<string, number>) {
  return function (key: string, value: number) {
    map.set(key, (map.get(key) ?? 0) + value);
  };
}

function solution(blinkTimes: number) {
  let result = new Map<string, number>();
  const writeToMap = createWriteToMap(result);
  for (const num of input) {
    writeToMap(num, 1);
  }

  for (let i = 0; i < blinkTimes; i++) {
    const newResult = new Map<string, number>();
    const writeToMap = createWriteToMap(newResult);

    for (const [stone, count] of result.entries()) {
      if (stone === "0") {
        writeToMap("1", count);
      } else if (stone.length % 2 === 0) {
        const mid = stone.length / 2;
        const leftStr = stone.slice(0, mid);
        const rightStr = stone.slice(mid);

        const leftVal = parseInt(leftStr, 10).toString();
        const rightVal = parseInt(rightStr, 10).toString();

        writeToMap(leftVal, count);
        writeToMap(rightVal, count);
      } else {
        const asNumber = parseInt(stone, 10);
        const newVal = (asNumber * 2024).toString();

        writeToMap(newVal, count);
      }
    }

    result = newResult;
  }

  let total = 0;
  for (const count of result.values()) {
    total += count;
  }

  console.log(`Solution for blinking ${blinkTimes} times is : ${total}`);
}

solution(25);
solution(75);
