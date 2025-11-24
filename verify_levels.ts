import { test, expect } from '@playwright/test';

test('verify levels and puzzle UI', async ({ page }) => {
  // 1. Go to the app
  await page.goto('http://localhost:5173');

  // 2. Start Game
  await page.getByRole('button', { name: /Start/i }).click();

  // 3. Verify Level 1 Display
  // Expect "LVL 1" and "Novice"
  await expect(page.locator('text=LVL 1')).toBeVisible();
  await expect(page.locator('text=Novice')).toBeVisible();

  // 4. Skip through questions to reach Puzzle type (Level 4)
  // We have ~9-10 questions before Level 4 starts (index 12, id 401).
  // Actually, based on `getQuestionsByFilter`, we are using `allQuestions`.
  // Level 1: Q1, 101, 2, 102 (4 questions)
  // Level 2: 201, 301, 202 (3 questions)
  // Level 3: 5, 302 (2 questions)
  // Level 4: 401 (id 9 in array index)

  // Total array length is 13.
  // 0-3: Lvl 1
  // 4-7: Lvl 2 (Indices 4,5,6,7) -> Wait, 201, 301, 202, 5.
  // 8-11: Lvl 3
  // 12+: Lvl 4

  // Let's iterate until we find "Puzzle" type text or "LVL 4".

  let foundPuzzle = false;
  for (let i = 0; i < 15; i++) {
    // Check for puzzle specific element
    const puzzleElement = page.locator('text=DECRYPT THE MESSAGE');
    if (await puzzleElement.isVisible()) {
        foundPuzzle = true;
        await page.screenshot({ path: 'puzzle_ui_verification.png' });
        break;
    }

    // Click an option (first one)
    const options = page.locator('button').filter({ hasText: /./ });
    // Filter generic buttons, we specifically want the quiz options.
    // In the new UI, options are buttons inside the grid.
    // The "Next" button appears after.

    // If "Next Challenge" is visible, click it.
    if (await page.getByRole('button', { name: /Next Challenge/i }).isVisible()) {
        await page.getByRole('button', { name: /Next Challenge/i }).click();
        await page.waitForTimeout(500); // Animation
    } else {
        // Find options.
        // We can just click the first button that isn't the "Start" button (which is gone).
        // The options share a common class structure, but locator is easier by text or order.
        // Let's just click the first available button in the main container.
        await page.locator('.grid button, .space-y-2 button, .space-y-3 button').first().click();
        await page.waitForTimeout(500);
    }
  }

  expect(foundPuzzle).toBeTruthy();
});
