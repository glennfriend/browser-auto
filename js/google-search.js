
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
    this.capture("tmp/url-before.png");
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
        .capture("tmp/url-after.png")
        .echo('==== The End ====')
        .exit();
});




/* --------------------------------------------------------------------------------
    
-------------------------------------------------------------------------------- */
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
    // echo( 'time=' + new Date().getTime() );
    echo('{');
    echo('    title=' + that.getTitle() );
    echo('    url=' + that.getCurrentUrl() );
    echo('}');
}

