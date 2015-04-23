
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
    this.capture("tmp/url-before.png");
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
// casper.thenOpen('https://github.com/settings/profile');

casper.run(function() {
    echoInfo(this);
    this
        .capture("tmp/url-after.png")
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

    //this.echo(data);
}

function echoInfo(that)
{
    echo('{');
    echo('    title= ' + that.getTitle() );
    echo('    url  = ' + that.getCurrentUrl() );
    echo('}');
}

/**
 *  列出物件所有的 keys
 *
 *  example:
 *      dumpObjectKeys(this);
 */
function dumpObjectKeys(object)
{
    var keys = [];
    for( hash in object ) {
        keys.push(hash);
    }
    console.log( keys.join(",") );
}

