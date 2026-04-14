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

    await takeScreenshot();

    await sendToWaveshare();
}

const takeScreenshot = async () => {
    const browser = await puppeteer.launch( {
        headless: true,
        defaultViewport: null,
        executablePath: '/usr/bin/chromium',
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
    await page.goto('http://magicmirror:8080', {waitUntil: 'networkidle2'});

    if (!isNaN(cfg.waitInSeconds)) {
        await delay(cfg.waitInSeconds*1000);
    }

    await page.screenshot({path: fileName});
    
    if (cfg.invertColor) {
        const img = await Jimp.read(fileName);
        await img.invert();
        await img.write(fileName);

        delay(5*1000);
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