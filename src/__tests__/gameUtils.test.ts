import { expect, test } from "vitest";
import { rollDie, scoreRollTuple, calculateColumnScore } from "../gameUtils";

test("die roll number between 1 and 6", async () => {
  expect(rollDie()).toBeLessThanOrEqual(6);
  expect(rollDie()).toBeGreaterThanOrEqual(1);
});

test("scoreRollTuple result for [6, 2]", async () => {
  expect(scoreRollTuple([6, 2])).toBe(24);
});

test("scoreRollTuple result for [1, 3]", async () => {
  expect(scoreRollTuple([1, 3])).toBe(9);
});

test("scoreRollTuple result for [5, 1]", async () => {
  expect(scoreRollTuple([5, 1])).toBe(5);
});

test("calculateColumnScore result for [1, 2, 3]", async () => {
  expect(calculateColumnScore([1, 2, 3])).toBe(6);
});

test("calculateColumnScore result for [4, 6, 4]", async () => {
  expect(calculateColumnScore([4, 6, 4])).toBe(22);
});

test("calculateColumnScore result for [5, 5, 5]", async () => {
  expect(calculateColumnScore([5, 5, 5])).toBe(45);
});
