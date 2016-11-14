
phantom.injectJs( '/var/www/browser-auto/helper/bootstrap.js');


var casper = require('casper').create({
    pageSettings: {
        loadImages:  true,
        loadPlugins: true
    },
    logLevel: "debug",
    verbose: true
});
var url = casper.cli.raw.get('url') || 'https://www.google.com.tw/';
var q   = casper.cli.raw.get('q')   || '江蕙';

casper.start(url, function() {
    this.capture( getProjectPath() + "/var/url-before.png");
    echoInfo(this);
});

casper.then(function() {
    this.fillSelectors('form', {
        'input[name="q"]':  q
    }, true);
});

casper.run(function() {
    echoInfo(this);
    this
        .capture( getProjectPath() + "/var/url-after.png")
        .echo('==== The End ====')
        .exit();
});

/* --------------------------------------------------------------------------------

-------------------------------------------------------------------------------- */

