
phantom.injectJs('/var/www/browser-auto/helper/bootstrap.js');



// log level: "info", "debug"
var casper = require('casper').create({
    logLevel: "info",
    verbose: false
});
var url = 'https://localhost/project';

// ================================================================================
// Event
// ================================================================================

//
casper.start(url, function() {
    echoInfo(this);
});
casper.then(captureImageFunc('w1-url.png'));


//
casper.then(function() {
    this.thenEvaluate(function(config) {
        $('input[name="account"]').val(config.wsystem.account);
        $('input[name="password"]').val(config.wsystem.pwd);
        $('form button[type="submit"]').click();
    }, getConfig());
});
casper.then(captureImageFunc('w2-login.png'));


// add comment
casper.then(function() {
    this.thenOpen('https://localhost/project/newComment');
})
.then(function() {
    this.thenEvaluate(function(config) {
        $('#content').val('hello world');
        $('form button[type="submit"]').click();
    }, getConfig());
});
casper.then(captureImageFunc('w3-add-comment.png'));


//
casper.run(function() {
    this
        .echo('==== The End ====')
        .exit();
});


/* --------------------------------------------------------------------------------

-------------------------------------------------------------------------------- */
