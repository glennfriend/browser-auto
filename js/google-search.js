
baseLoad();

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
    this.capture( getProjectPath() + "/tmp/url-before.png");
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
        .capture( getProjectPath() + "/tmp/url-after.png")
        .echo('==== The End ====')
        .exit();
});

/* --------------------------------------------------------------------------------

-------------------------------------------------------------------------------- */
function getProjectPath()
{
    return '/var/www/browser-auto';
}

function baseLoad()
{
    phantom.injectJs( getProjectPath() + '/helper/helper.js');
}
