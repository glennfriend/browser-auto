
baseLoad();

var casper = require('casper').create({
    logLevel: "info",
    verbose: true
});
var url = casper.cli.raw.get('url') || 'https://www.pinterest.com/login/';

// ================================================================================
// Event
// ================================================================================

casper.start(url, function() {
    this.capture( getProjectPath() + "/tmp/url-before.png");
    echoInfo(this);
});

casper.then(function() {
    this.thenEvaluate(function(config) {
        $('input[name="username_or_email"]').val( config.account );
        $('input[name="password"]').val( config.password );
        $('form button[type="submit"]').click();
    }, getConfig() );
});

// redirect to
casper.then(function() {
    this.thenOpen('https://www.pinterest.com/');
});

casper.run(function() {
    echoInfo(this);

    this.capture( getProjectPath() + "/tmp/url-after.png")
    this
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

function getConfig()
{
    return {
        account:  "帳號",
        password: "密碼",
    };
}

