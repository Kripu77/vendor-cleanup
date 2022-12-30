const puppeteer = require("puppeteer"); //main automation package
require("dotenv").config();
const { convertJson } = require("./dataSource");
const path = require("path");
const { writeFileCSV } = require("./fileWriter");
const csvPath = path.resolve(__dirname, "./datacleanup.csv");
let fullName = [];
let code = [];
let status = [];
let compliedStatus = [
 
];

function pushStatus(fullNamex, codex, statusx) {
  fullName.push(fullNamex);
  code.push(codex);
  status.push(statusx);
}

// run()
//   .then(() => console.log("Done"))
//   .catch((error) => console.log(error));

async function run(json) {
  // Setting `headless: false` opens up a browser
  // window so you can watch what happens when the code runs.

  try {
    // let json = await convertJson(csvPath);
    const browser = await puppeteer.launch({
      args: ["--window-size=1220,980"],
      defaultViewport: null,
      headless: false,
      slowMo: 10,
    });
    const page = await browser.newPage();
    ///enter your URL here
    await page.goto(
      "https://hungryjacks.macromatix.net/MMS_Stores_OnlineOrderClassic.aspx?MenuCustomItemID=394"
    );

    await page.waitForNetworkIdle();
    //script for user login
    await page.evaluate(
      (userName, password) => {
        document.getElementById("Login_UserName").value = userName;
        document.getElementById("Login_Password").value = password;
      },
      process.env.USER_NAME,
      process.env.PASSWORD
    );
    //wait for page to be navigated and then click the button/ Promise resolved phase
    await Promise.all([page.waitForNavigation(), page.click("#Login_Button1")]);

    //this will write down the store name on the store input form

    await page.waitForTimeout(2000);

    await page.click("#ctl00_ph_MXStoreDDL_RadComboBoxEntity_Input");
    const x = await page.$("#ctl00_ph_MXStoreDDL_RadComboBoxEntity_Input");
    await x.type(json[0].Store);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(6000);
    // await page.click(".rwCloseButton", {delay:1000})

    // await page.click("#ctl00_ph_DropdownlistTemplateType_Input");
    await page.waitForTimeout(8000);

    // await page.evaluate((orderCategory) => {
    //   document.getElementById("ctl00_ph_DropdownlistTemplateType_Input").value =
    //     orderCategory;
    // }, json[0].orderCategory);
    // await page.waitForTimeout(8000);
    // for (i = 0; i < 3; i++) {
    //   await page.keyboard.press("ArrowDown");
    // }
    // await page.keyboard.press("Enter");

    //select the vendor

    const y = await page.$("#ctl00_ph_DropdownlistSupplier1_Input");
    await y.type(json[0].vendorName);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(3000);
    //clicks on the create button
    await page.click("#ctl00_ph_ButtonCreateTemplateOnce");
    await page.waitForTimeout(6000);
    //click on add button
    await page.click("#ctl00_ph_ButtonAddTemplateItem");
    await page.waitForTimeout(2000);
    await page.click(
      "#ctl00_ph_AddTemplateItemPanel_ItemSelector1_RadComboBoxItem_Input"
    );

    await page.keyboard.press("Backspace");
    await page.waitForTimeout(3000);

    //this will loop through the whole CSV file and treat vendorItemCode as the parent key in the JSON data
    for (i = 0; i < json.length; i++) {
      const itemCodeZ = await page.$(
        "#ctl00_ph_AddTemplateItemPanel_ItemSelector1_RadComboBoxItem_Input"
      );
      await itemCodeZ.type(json[i].vendoritemcode);
      await page.waitForTimeout(1000);
      await page.keyboard.press("ArrowDown");

      
      const linkHandlersX = await page.$x(
        "//li[contains(text(), '" + json[i].vendoritemcode + "' )]"
      );

      if (linkHandlersX.length > 0) {
        // const navListFirstItem = await page.$eval("#nav-menu > li:nth-child(1)", el => el.textContent);
       

        const innerText = await page.$eval(
          "div > .rcbList > .rcbHovered",
          (elem) => elem.textContent
        );
      
        pushStatus(innerText, json[i].vendoritemcode, "Active");
      } else {
        pushStatus("NA", json[i].vendoritemcode, "Inactive");
      }
      await itemCodeZ.click({ clickCount: 3 });
      await page.keyboard.press("Backspace");

      await page.keyboard.press("Backspace");
    }

    //convert into array of objects
    code.forEach((value, index) => {
      compliedStatus.push({
        codeDetails: fullName[index],
        Code: code[index],
        Status: status[index],
      });
    });

    //writes the data in csv, disabled due to backedn usage
    // writeFileCSV(json[0].Store, json[0].vendorName, compliedStatus);

    await page.click("#ctl00_ph_ButtonDeleteTemplate");
    await browser.close();

    return compliedStatus

  } catch (err) {
    if (err) throw err;
  } finally {
    console.log("Stores Scraped");
  }

}



module.exports ={
  run
}