
var casper = require('casper').create({
    logLevel: "info",
    verbose: true
});
var url = casper.cli.raw.get('url') || 'https://www.pinterest.com/login/';

// ================================================================================
// Event
// ================================================================================

casper.start(url, function() {
    this.capture("tmp/url-before.png");
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
casper.thenOpen('https://www.pinterest.com/');

casper.run(function() {
    echoInfo(this);
    this.capture("tmp/url-after.png");
    this
        .echo('==== The End ====')
        .exit();
});




/* --------------------------------------------------------------------------------
    
-------------------------------------------------------------------------------- */
function getConfig()
{
    return {
        account:  "帳號",
        password: "密碼",
    };
}

function echo(data)
{
    var type = Object.prototype.toString.call(data);
    switch (type) {
        case '[object String]':
            console.log(data);
            break;

        case '[object Array]':
            var items = [];
            for( key in data ) {
                items.push( data[key] );
            }
            content = '[' + items.join(",") + ']';
            console.log(content);
            break;

        case '[object Object]':
            var items = [];
            for( key in data ) {
                items.push( key +'='+ data[key] );
            }
            content = '{'+ items.join(",") +'}';
            console.log(content);
            break;

        default:
            console.log(type);
    }
}

function echoInfo(that)
{
    // echo( 'time=' + new Date().getTime() );
    echo('{');
    echo('    title=' + that.getTitle() );
    echo('    url=' + that.getCurrentUrl() );
    echo('}');
}

