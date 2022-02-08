const { chromium } = require("playwright-chromium");

(async () => {
  const browser = await chromium.launch({ chromiumSandbox: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on("request", async (req) => {
    console.log(await req.headersArray());
  });

  // const browser = await puppeteer.launch({
  //   args: [
  //     "--window-size=1920,1080",
  //     "--no-sandbox",
  //     "--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36",
  //   ],
  // });
  await page.goto("https://jobs.blognone.com/login");
  await page.type("#email", process.env.USERNAME);
  await page.type("#password", process.env.PASSWORD);
  await page.click('button[type="submit"]');
  await page.waitForNavigation();

  // SENIOR
  console.log("Refreshing Senior Rails Engineer post...");

  await page.goto(process.env.URL);
  await page.waitForNavigation();
  await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
  await page.waitForTimeout(3000);
  await page.evaluate(() => {
    document.querySelector('input[value="Publish Job"]').click();
  });
  await page.waitForNavigation();

  browser.close();

  console.log("Done!");
})();
