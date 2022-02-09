const { chromium } = require("playwright-chromium");

const dotenv = require("dotenv");

dotenv.config();

(async () => {
  const browser = await chromium.launch({ chromiumSandbox: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // page.on("request", async (req) => {
  //   console.log(await req.headersArray());
  // });
  await page.goto("https://jobs.blognone.com/login");
  await page.type("#email", process.env.USERNAME);
  await page.type("#password", process.env.PASSWORD);
  await page.click('button[type="submit"]');
  await page.waitForNavigation();

  // SENIOR
  console.log("Refreshing Senior Rails Engineer post...");

  await page.goto(process.env.URL);
  await Promise.all([
    page.waitForNavigation(),
    page.click("input[value='Publish Job']"),
  ]);

  browser.close();

  console.log("Done!");
})();
