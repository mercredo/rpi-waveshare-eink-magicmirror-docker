'use strict';

const puppeteer = require('puppeteer');
const cron = require('node-cron');
const { Jimp } = require("jimp");
const { spawnSync } = require('child_process');

const cfg = require('./config');

const fileName = '/app/static/screenshot.png';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

cron.schedule(cfg.cron, async () => {

    await init();
});

const init = async () => {

    await takeScreenshot().then(() => {delay(2*1000)});

    await sendToWaveshare();
}

const takeScreenshot = async () => {
    const browser = await puppeteer.launch( {
        headless: true,
        defaultViewport: null,
        executablePath: '/usr/bin/chromium',
        args: [
            '--no-sandbox',
            '--disable-setui-sandbox',
            '--disable-gpu'
        ],
        defaultViewport: null
    });

    const page = await browser.newPage();

    await page.setViewport({
        width: cfg.displayWidth,
        height: cfg.displayHeight
    });
    
    var waitForPromises = [];
    if (Array.isArray(cfg.waitForDom) && cfg.waitForDom.length > 0) {
        cfg.waitForDom.forEach(el => {
            waitForPromises.push(page.waitForSelector(el, {visible: true}));
        });

        await Promise.all(waitForPromises).then(() => {
            console.log(`All ${cfg.waitForDom.length} DOM selectors loaded`);
        });
    }    

    if (!isNaN(cfg.waitInSeconds)) {
        await delay(cfg.waitInSeconds*1000).then(() => {
            console.log(`Waited for ${cfg.waitInSeconds} seconds`)});
    }

    await page.screenshot({path: fileName}).then(() => {
        console.log('Screen captured');
    });
    
    if (cfg.invertColor) {
        const img = await Jimp.read(fileName);
        await img.invert();
        await img.write(fileName);
    }
};

const sendToWaveshare = async () => {
    const pythonProcess = await spawnSync('/app/waveshare/bin/python3', [
        '/app/waveshare/eink.py',
        cfg.displayType
    ]);
    const result = pythonProcess.stdout?.toString()?.trim();
    const error = pythonProcess.stderr?.toString()?.trim();

    if (result !== 'OK') {
        console.log(error);
    }
};

init()