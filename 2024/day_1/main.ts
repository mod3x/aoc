import { open } from 'node:fs/promises'
import { createInterface as createReadline } from 'node:readline/promises';

import { MinPriorityQueue } from '@datastructures-js/priority-queue'

function stringToInt(str: string) {
	return parseInt(str, 10)
}

async function loadInput(filePath: string = './2024/day_1/input.txt'): Promise<[number[], number[]]> {
	const list1: number[] = []
	const list2: number[] = []

	const fd = await open(filePath)
	const stream = fd.createReadStream();

	const rl = createReadline({
		input: stream,
	});

	for await (const line of rl) {
		const [left, right] = line.split('   ').map(stringToInt)
		list1.push(left)
		list2.push(right)
	}

	return Promise.resolve([list1, list2])
}

async function part1() {
	const [list1, list2] = await loadInput()

	const leftQueue = MinPriorityQueue.fromArray(list1)
	const rightQueue = MinPriorityQueue.fromArray(list2)

	let result = 0

	while (!leftQueue.isEmpty()) {
		result += Math.abs(leftQueue.dequeue() - rightQueue.dequeue())
	}

	console.log(`Part 1 result : ${result}`)
}

async function part2() {
	const [list1, list2] = await loadInput()

	const list2Frequency = new Map<number, number>()

	for (const item of list2) {
		list2Frequency.set(item, (list2Frequency.get(item) ?? 0) + 1)
	}

	let result = 0

	for (const item of list1) {
		result += (list2Frequency.get(item) ?? 0) * item
	}

	console.log(`Part 2 result : ${result}`)
}

await part1()
await part2()
