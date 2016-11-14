
phantom.injectJs(getProjectPath('/helper/helper.js'));

/**
 *
 */
function getProjectPath(path)
{
    var basePath = '/var/www/browser-auto';
    if (path) {
        return basePath + path;
    }
    return basePath;
}
