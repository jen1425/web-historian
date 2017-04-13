// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

var helpers = require('../helpers/archive-helpers.js');
var CronJob = require('cron').CronJob;

new CronJob('* */1 * * * *', function() {
  console.log('running');
  helpers.readListOfUrls(function(urlList) {
    helpers.downloadUrls(urlList);
  });
}, null, true, 'America/Los_Angeles');