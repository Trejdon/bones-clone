import { expect, test} from 'vitest';
import { rollDie } from "../gameUtils";

test("die roll number between 1 and 6", async () => {
  expect(rollDie()).toBeLessThanOrEqual(6)
  expect(rollDie()).toBeGreaterThanOrEqual(1)
})