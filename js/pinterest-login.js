
phantom.injectJs( '/var/www/browser-auto/helper/bootstrap.js');

var casper = require('casper').create({
    logLevel: "info",
    verbose: true
});
var url = casper.cli.raw.get('url') || 'https://www.pinterest.com/login/';

// ================================================================================
// Event
// ================================================================================

casper.start(url, function() {
    this.capture( getProjectPath() + "/var/url-before.png");
    echoInfo(this);
});

casper.then(function() {
    this.thenEvaluate(function(config) {
        $('input[name="username_or_email"]').val( config.account );
        $('input[name="password"]').val( config.password );
        $('form button[type="submit"]').click();
    }, getMyConfig() );
});

// redirect to
casper.then(function() {
    this.thenOpen('https://www.pinterest.com/');
});

casper.run(function() {
    echoInfo(this);

    this.capture( getProjectPath() + "/var/url-after.png")
    this
        .echo('==== The End ====')
        .exit();
});


/* --------------------------------------------------------------------------------

-------------------------------------------------------------------------------- */
function getMyConfig()
{
    return {
        account:  "帳號",
        password: "密碼",
    };
}

