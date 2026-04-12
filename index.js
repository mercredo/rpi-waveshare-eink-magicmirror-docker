'use strict';

const puppeteer = require('puppeteer');
const cron = require('node-cron');
const { Jimp } = require("jimp");
const { spawnSync } = require('child_process');

const cfg = require('./config');

const fileName = '/app/screenshot.png';

cron.schedule(cfg.cron, async () => {

    await init();
});

const init = async () => {

    await takeScreenshot();

    // await sendToWaveshare();
}

const takeScreenshot = async () => {
    const browser = await puppeteer.launch( {
        args: [
            '--no-sandbox',
            '--disable-setui-sandbox'
        ],
        defaultViewport: null
    });

    const page = await browser.newPage();

    await page.setViewport({
        width: cfg.displayWidth,
        height: cfg.displayHeight
    });
    await page.goto('http://magicmirror:8080', {waitUntil: 'networkidle2'}); //.catch(e => void 0)

    // await sleep(cfg.waitInSeconds*1000);
    // await page.waitFor(cfg.waitInSeconds*1000);


    await page.screenshot({path: fileName});
    
    if (cfg.invertColor) {
        const img = await Jimp.read(fileName);
        await img.invert();
        await img.quality(80).writeAsync(fileName);
    }
};

const sendToWaveshare = async () => {
    const pythonProcess = await spawnSync('python3', [
        '/app/waveshare/waveshare.py',
        cfg.displayType,
    ]);
    const result = pythonProcess.stdout?.toString()?.trim();
    const error = pythonProcess.stderr?.toString()?.trim();

    if (result !== 'OK') {
        console.log(error);
    }
};

init()