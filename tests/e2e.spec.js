import { test, expect } from '@playwright/test';

test('dashboard loads and shows start button', async ({ page }) => {
    await page.goto('/');

    // Check Title
    await expect(page).toHaveTitle(/EV Sound Simulator/);

    // Check Start Button
    const startBtn = page.getByRole('button', { name: 'START ENGINE' });
    await expect(startBtn).toBeVisible();

    // Click Start (might fail if audio context blocks, but UI should update)
    await startBtn.click();
    await expect(startBtn).toBeHidden();

    // Check Dashboard Elements
    await expect(page.locator('canvas')).toBeVisible();
});
