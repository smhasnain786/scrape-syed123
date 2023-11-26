const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res) => {
 
  const browser = await puppeteer.launch({
    headless:true,
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  try {
    const page1 = await browser.newPage();
    console.log('site loaded');
     page1.setDefaultNavigationTimeout(60 * 60 * 1000);
    await page1.goto('https://services.ecourts.gov.in/ecourtindia_v6/'); 
    console.log('site loaded');
    // const radio = await page1.waitForSelector('input#rdb_0'); 
    // await radio.click();
  
    await page1.waitForSelector('img#captcha_image');
    
      const elements = await page1.waitForSelector('img#captcha_image', {timeout:50000});
      await elements.screenshot({ path: './uploads1/screenshot.png' });
      console.log('clicked');
   
    // wait for the selector to load
    // declare a variable with an ElementHandle await page1.waitForSelector('input#cino');
    await page1.type('input[id=cino]', 'MHAU030151912016');
    // await page.$eval('input[id=cino]', el => el.value = 'Adenosine triphosphate');
    const page = await browser.newPage(); await page.goto('https://www.google.com.my/imghp');
    console.log('Google Image Search page loaded');
    const button = await page.waitForSelector('div.dRYYxd > div.nDcEnd');
    console.log(button);
     await button.click();
    console.log('Button clicked1');
    await button.click();
    await button.click();
    await button.click();
    console.log('Button clicked2');
    await page.$eval('.cB9M7', el => el.value = 'https://syed.loca.lt/img');
    setTimeout(async () => {
      const submit = await page.waitForSelector('div.Qwbd3');
      console.log('----------->', submit);
      await submit.click();
    }, 3000)
    await page.waitForNavigation();
    const textButton = await page.waitForSelector('#ucj-3');
    console.log('<---------,', textButton);
    await textButton.click()
    await page.waitForSelector('.QeOavc')
    let element = await page.waitForSelector('[dir="ltr"]' )
    // const values = await page.evaluate(el => el.querySelector('[dir="ltr"]').innerHTMl, element)
    // console.log((values));
    const text = await page.evaluate(el => {
      const spanElement = el.querySelector('div.QeOavc > [dir="ltr"]');
      return spanElement.textContent;
  }, element);
  
  console.log(text);
    var codes = (text) 
    page.close();
    await page1.waitForSelector('input#fcaptcha_code')
    await page1.type('input[id=fcaptcha_code]', codes);
    const view = await page1.waitForSelector('button#searchbtn' ,{timeout:300000})
    await view.click()
    // const numberlink = await page1.waitForSelector('a#SearchWMDatagrid_ctl03_lnkbtnappNumber1')
    // await numberlink.click() console.log('hi1234');
    // await page1.waitForNavigation();
    setTimeout(async()=>{
      const bodyHandle = await page1.waitForSelector('div#history_cnr');
      const html = await page1.evaluate(body => body.innerHTML, bodyHandle);
      console.log("html",html);
       res.send(html)
       await bodyHandle.dispose();
    }, 10000)
    
    
    // await page1.evaluate(() => { 
    // console.log(document.getElementById('panelgetdetail').innerHTML); 
    // })
  } catch (e) {
    console.error(e);
    // await browser.close();
    // scrapeLogic(res)
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };