import { chromium } from 'playwright';
import path from 'path';

(async () => {
  console.log('Launching browser to capture real screenshots...');
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });
  const page = await context.newPage();

  // Navigate to dev server
  await page.goto('http://localhost:5174', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // 1. QR Designer Light Screenshot
  const lightPath = path.join(process.cwd(), 'public', 'screenshots', 'qr_designer_light.png');
  await page.screenshot({ path: lightPath, fullPage: true });
  console.log('Saved real light mode screenshot to:', lightPath);

  // 2. Toggle Dark Mode
  const darkToggleBtn = page.locator('button:has-text("Toggle Theme"), button[aria-label*="theme"], button:has(.lucide-sun), button:has(.lucide-moon)').first();
  if (await darkToggleBtn.isVisible()) {
    await darkToggleBtn.click();
    await page.waitForTimeout(500);
  } else {
    await page.evaluate(() => document.documentElement.classList.add('dark'));
  }

  // 3. QR Designer Dark Screenshot
  const darkPath = path.join(process.cwd(), 'public', 'screenshots', 'qr_designer_dark.png');
  await page.screenshot({ path: darkPath, fullPage: true });
  console.log('Saved real dark mode screenshot to:', darkPath);

  // 4. Click Bulk tab
  const bulkBtn = page.locator('button:has-text("Bulk Batch")').first();
  if (await bulkBtn.isVisible()) {
    await bulkBtn.click();
    await page.waitForTimeout(500);
  }

  // 5. Bulk Generator Screenshot
  const bulkPath = path.join(process.cwd(), 'public', 'screenshots', 'qr_bulk_generator.png');
  await page.screenshot({ path: bulkPath, fullPage: true });
  console.log('Saved real bulk generator screenshot to:', bulkPath);

  await browser.close();
  console.log('Successfully captured all real application screenshots!');
})();
