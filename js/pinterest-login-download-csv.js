
phantom.injectJs( '/var/www/browser-auto/helper/bootstrap.js');


var casper = require('casper').create({
    viewportSize: {
        width: 1600,
        height: 900
    },
    logLevel: "info",
    verbose: true
});
var url = casper.cli.raw.get('url') || 'https://www.pinterest.com/login/';

// ================================================================================
// Event
// ================================================================================

// 指定你要下載的檔案
casper.on('resource.received', function (resource) {
    if ( resource.stage != "end" ) {
        return;
    }

    var config = getMyConfig();
    var findString = config.adsId + "/export";
    if ((resource.url.indexOf(findString) !== -1) ) {
        echo('==== download resource: ' + resource.url );
        var file = getDownloadfileName();
        if ( !file ) {
            echo('==== ERROR: 無法正確建立下載的檔案!');
            return;
        }
        echo('==== save to file: ' + file );

        try {
            var fs = require('fs');
            var pathFile = fs.workingDirectory + '/var/' + file
            casper.download(resource.url, pathFile );
        } catch (e) {
            echo('Error: ');
            echo(e.message);
        }
    }
});

/*
casper.on('remote.message', function(msg) {
    this.echo(' ========== remote message caught: ' + msg);
});

casper.on("page.error", function(msg, trace) {
    this.echo(" ========== Page Error: " + msg, "ERROR");
});
*/

// ================================================================================
// Start
// ================================================================================

casper.start(url, function() {
    this.capture("var/url-before.png");
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
casper.thenOpen('https://ads.pinterest.com/');

// download csv file
casper.then(function() {
    echo('---- Export CSV ----');
    var config = getMyConfig();
    var from = getYesterday();
    var to   = getToday();
    casper.thenOpen('https://ads.pinterest.com/analytics/advertiser/'+ config.adsId +'/export/?start_date='+ from +'&end_date='+ to );
});

casper.run(function() {
    echoInfo(this);
    this.capture( getProjectPath()+"/var/url-after.png", {
        top: 0, left: 0, width: 1600, height: 900
    });
    this
        .echo('==== The End ====')
        .exit();
});




/* --------------------------------------------------------------------------------

-------------------------------------------------------------------------------- */
function getMyConfig()
{
    /*
        ads id 來源
            登入之後到 ads 頁面 https://ads.pinterest.com/
            "Export data" Button 點擊後會下載 CSV
            利用 browser developer tool 查看該 CSV 來源, 類似
                https://ads.pinterest.com/analytics/advertiser/999999999999/export/?start_date=2015-01-01&end_date=2015-01-31
            該 999999999999 就是 ads id
    */
    return {
        account:  "電子郵件帳號",
        password: "密碼",
        adsId:    "your ads ID"
    };
}

/**
 *  get formate date
 *  yyyy-mm-dd
 */
function getToday()
{
    var nowDate = new Date();
    return formatDate(nowDate);
}

/**
 *  get formate date
 *  yyyy-mm-dd
 */

function getYesterday()
{
    var nowDate = new Date();
    var yesterdayDate = new Date(nowDate);
    yesterdayDate.setDate(nowDate.getDate() - 1);
    return formatDate(yesterdayDate);
}

function formatDate( theDate )
{
    try {
        var yyyy = theDate.getFullYear().toString();
        var mm = (theDate.getMonth()+1).toString();
        var dd = theDate.getDate().toString();
        var mmChars = mm.split('');
        var ddChars = dd.split('');
        return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
    } catch (e) {
        echo('Error: ');
        echo(e.message);
    }
    return false;
}

// today date format
function getDownloadfileName()
{
    var from = getYesterday();
    var to   = getToday();
    if ( !from || !to ) {
        return "pinterest-undefined.csv";
    }
    return "pinterest-["+ from +"]-to-["+ to +"].csv";
}

