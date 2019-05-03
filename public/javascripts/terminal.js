var terminal = (() => {

    var modules = {};

    // 設定 cookie

    function setCookie(cname, cvalue, exdays) {
        let d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    // 找 cookie

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    // 讓我睡一會
    function sleep(ms = 0) {
        return new Promise(r => setTimeout(r, ms));
    }

    // 顯示 USER@HOST
    function printHost() {
        let hostName = 'OS_0000001@earth:~$';
        $('.container').append('<br /><span class="host col-12 m-0 p-0">' + hostName + '&nbsp;</span>');
    }

    // 逐字顯示
    async function printText(word) {
        $('.container .host').last().append('<span class="console"></span>');
        for (var i in word) {
            $('.container .host span').last().append(word[i]);
            await sleep(30);
        }
    }

    // 自動下滑捲軸
    function pageScroll() {
        window.scrollBy(0,1);
        scrolldelay = setTimeout(pageScroll,10);
    }

    // 檢查進度
    function getProgress() {
        // 載入進度
        // 重設 Cookie
        // error

    }

    // 傳送進度
    function sendInput(command) {

    }

    // 讀取輸入
    async function user_input() {
        printHost();

        $('.container .host').last().append('<input type="text" id="id_and_code" name="id_and_code" class="col-4 col-md-6 col-lg-8 m-0 p-0">');
        $('.id_and_code').focus();
        $('.id_and_code').keypress(async function (event) {
            if (event.keyCode == 13) {
                $('.id_and_code').prop('disabled', true);
                // 如果輸入錯誤
                if (!sendInput($('.id_and_code').val())) {
                    printHost();
                    await printText('錯誤指令, 無法正確執行');
                    $('.id_and_code').removeProp('id');
                    user_input();
                }
            }
        });
    }

    // 初始設定
    function getStart() {
        let verInfo = `Welcome to WorldSimulation 2019.05 LTS (GNU/Linux 4.4.0-139-generic x86_64)

        <br/><br/><br/> &nbsp;* Documentation:  https://help.WorldSimulation.com
        <br/> &nbsp;* Management:     https://landscape.WorldSimulation.com
        <br/> &nbsp;* Support:        https://WorldSimulation.com/advantage
        <br/><br/><br/> 20 packages can be updated.
        <br/> 3 updates are security updates.


        <br/><br/><br/> *** System restart required ***
        <br/> Last login: Sun Apr 21 01:52:42 2019 from 163.22.17.215 <br />`;

        $('.container').append(verInfo);

        // 檢查 cookie
        if(getCookie("teamID") !== "") {
            // 檢查進度

            // 輸出對話框
        } else {
            // 初始化, 要求輸入卡片 ID 及代碼

            // 檢查卡片 ID

            // 確認資料綁定

            // 設定 cookie

            // 檢查進度

            // 輸出對話框
        }
    }

    modules.init = () => {
        getStart();
        pageScroll();
    };

    return modules;

})();



async function printStory(storyNum) {
    printHost();
    // 讀入故事並存進陣列
    var story = [];
    await printText('story[storyNum]');
    printHost();
}

function checkInput(input_data) {
    var data = input_data.split(' ');
    // data[0] 是參賽者的卡號
    // 要接資料庫紀錄參賽隊伍的進度
    switch (data[1]) {
        case 'PTIKK42SQG':
            printStory(0);
            return true;
        case 'HS44APEBS8':
            printStory(1);
            return true;
        case 'APRVL69UB3':
            printStory(2);
            return true;
        case '7GF2M2XM2L':
            printStory(3);
            return true;
        case '36EF11SSOC':
            printStory(4);
            return true;
        case 'UC752H9W22':
            printStory(5);
            return true;
        case 'EM5NM91GA6':
            printStory(6);
            return true;
        default:
            return false;
    }
}

let text = ['你好', '歡迎登入世界終端', '請輸入你的 ID 辨識碼以及執行代碼', '如: 21538 X9GEFX1TLL'];

function printHost() {
    let hostName = 'OS_0000001@earth:~$';
    $('.container').append('<br /><span class="host col-12 m-0 p-0">' + hostName + '&nbsp;</span>');
}

function sleep(ms = 0) {
    return new Promise(r => setTimeout(r, ms));
}

async function printText(word) {
    $('.container .host').last().append('<span class="console"></span>');
    for (var i in word) {
        $('.container .host span').last().append(word[i]);
        await sleep(50);
    }
}

async function main() {
    $('.container').append(verInfo);
    for (let i = 0; i < text.length; i++) {
        printHost();
        await printText(text[i]);
        await sleep(300);
    }
    user_input();
}
main();