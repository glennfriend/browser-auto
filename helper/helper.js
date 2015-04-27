
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

