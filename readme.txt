前置作業

    確認版本
        https://bitbucket.org/ariya/phantomjs/downloads/

    安裝必要套件
        sudo apt-get update
        sudo apt-get install build-essential g++ flex bison gperf ruby perl \
                libsqlite3-dev libfontconfig1-dev libicu-dev libfreetype6 libssl-dev \
                libpng-dev libjpeg-dev

install casperjs & phantomjs

    安裝方法很多
    這裡提供以 nodejs 為主的安裝方式

    sudo apt-get update
    sudo apt-get install nodejs nodejs-legacy

    mkdir -p /usr/developer-tool/casperjs 
    cd /usr/developer-tool/casperjs
    
    npm install phantomjs
    sudo ln -s /usr/developer-tool/casperjs/node_modules/phantomjs/bin/phantomjs  /usr/bin/phantomjs
    phantomjs -v

    npm install casperjs
    sudo ln -s /usr/developer-tool/casperjs/node_modules/casperjs/bin/casperjs  /usr/local/bin/casperjs
    casperjs -v

how

    casperjs script.js --url="http://localhost" --remote-debugger-port=9000 --remote-debugger-autorunese

try

    casperjs test js/test.js
    casperjs js/login-github.js     # 請先編輯裡面的 account/password

