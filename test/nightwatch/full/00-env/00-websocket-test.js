const config = require('../../../lib/configuration').getConfiguration('TEXT', 'WEBSOCKET', 'V3');

module.exports[config.header + ' long time duration test'] = '' + function simple(browser) {
  // let cont = true;
  const start = new Date().getTime();
  const strokes = config.inks[0].strokes;
  const labels = config.inks[0].labels;

  console.log('start date = ' + start);
  browser
    .init(browser.launchUrl + config.componentPath)
    .waitForElementVisible('#inkPaper', 1000 * config.timeoutAmplificator)
    .listenInkPaper()
    .waitForElementPresent('#inkPaperSupervisor', 1000 * config.timeoutAmplificator)
    .waitUntilPlayInkThenClear(config, start, strokes, labels, 20000, null);
    // .perform(playInkThenClear)
    // .getElapsedTime(start, stopCondition)
    // .log(start);
  browser.end();
};
