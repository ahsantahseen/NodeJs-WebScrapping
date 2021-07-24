//Importing Pupprteer
const puppeteer = require("puppeteer");
// This is where we'll put the code to get around the tests.
const preparePageForTests = async (page) => {
  // Pass the User-Agent Test.
  const userAgent =
    "Mozilla/5.0 (X11; Linux x86_64)" +
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36";
  await page.setUserAgent(userAgent);
};
//Running async function
(async () => {
  //Defining Essentials
  let movieURL =
    "https://m.imdb.com/what-to-watch/fan-favorites/?ref_=watch_tpks_tab";
  let browser = await puppeteer.launch({
    args: ["--disable-web-security"],
    headless: false,
  });
  let page = await browser.newPage();
  await preparePageForTests(page);
  //Scarpping Data
  await page.goto(movieURL, { waitUntil: "networkidle0" });
  const images = await page.$$eval(".ipc-image", (node) =>
    node.map((n) => n.src)
  );
  const names = await page.$$eval(
    'a[class="ipc-poster-card__title ipc-poster-card__title--clamp-2 ipc-poster-card__title--clickable"]>span',
    (node) => node.map((n) => n.innerText)
  );
  const rating = await page.$$eval(
    'span[class="ipc-rating-star ipc-rating-star--baseAlt ipc-rating-star--imdb"]',
    (node) => node.map((n) => n.innerText)
  );

  let data = {
    names: names,
    images: images,
    rating: rating,
  };
  console.log(data);
  debugger;
  await browser.close();
})();
