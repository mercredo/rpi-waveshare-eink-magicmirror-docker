/**
 * supported waveshare displaytypes
 * 
 * ['epd13in3b', 'epd13in3k', 'epd1in02', 'epd1in54', 'epd1in54_V2', 'epd1in54b', 'epd1in54b_V2',
 *  'epd1in54c', 'epd1in64g', 'epd2in13', 'epd2in13_V2', 'epd2in13_V3', 'epd2in13_V4',
 *  'epd2in13b_V3', 'epd2in13b_V4', 'epd2in13bc', 'epd2in13d', 'epd2in13g', 'epd2in15b',
 *  'epd2in15g', 'epd2in36g', 'epd2in66', 'epd2in66b', 'epd2in66g', 'epd2in7', 'epd2in7_V2',
 *  'epd2in7b', 'epd2in7b_V2', 'epd2in9', 'epd2in9_V2', 'epd2in9b_V3', 'epd2in9b_V4',
 *  'epd2in9bc', 'epd2in9d', 'epd3in0g', 'epd3in52', 'epd3in7', 'epd4in01f', 'epd4in2',
 *  'epd4in26', 'epd4in2_V2', 'epd4in2b_V2', 'epd4in2b_V2_old', 'epd4in2bc', 'epd4in37g',
 *  'epd5in65f', 'epd5in79', 'epd5in79b', 'epd5in79g', 'epd5in83', 'epd5in83_V2', 'epd5in83b_V2',
 *  'epd5in83bc', 'epd7in3e', 'epd7in3f', 'epd7in3g', 'epd7in5', 'epd7in5_HD', 'epd7in5_V2',
 *  'epd7in5_V2_old', 'epd7in5b_HD', 'epd7in5b_V2', 'epd7in5b_V2_old', 'epd7in5bc']
 */
var config = {
  "displayType": "epd7in5b_V2",
  "displayWidth": 800,
  "displayHeight": 480,
  "waitInSeconds": 10,
  "cron": "0 * * * *",
  // "timezone": "Europe/Berlin",
  "invertColor": true
};

if (typeof module !== "undefined") {module.exports = config;}