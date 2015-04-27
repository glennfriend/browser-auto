
baseLoad();

var casper = require('casper').create({
    clientScripts:  [
        'lib/jquery-1.11.1.js'
    ],
    pageSettings: {
        loadImages:  false,
        loadPlugins: false
    },
    logLevel: "info",
    verbose: true
});
var url = casper.cli.raw.get('url') || 'https://github.com/login';

casper.start(url, function() {
    this.capture( getProjectPath() + "/tmp/url-before.png");
    echoInfo(this);
});

casper.then(function() {
    this.evaluate(function(config) {
        $('#login_field').val( config.account );
        $('#password').val( config.password );
        $('#login input[name="commit"]').click();
    }, getConfig() );
});

casper.then(function() {
    echo('title = ' + this.getTitle() );
});

// redirect to
/*
casper.then(function() {
    this.thenOpen('https://github.com/settings/profile');
});
*/

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

function getConfig()
{
    return {
        account:  "帳號",
        password: "密碼",
    };
}
