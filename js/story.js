function pageScroll() {
    window.scrollBy(0,1);
    scrolldelay = setTimeout(pageScroll,10);
}

function printHost() {
    let hostName = 'OS_0000001@earth:~$';
    $('.container').append('<br /><span class="host col-12 m-0 p-0">' + hostName + '&nbsp;</span>');
}

var sleep = (ms = 0) => {
    return new Promise(r => setTimeout(r, ms));
}

async function printText(word) {

    $('.container .host').last().append('<span class="console"></span>');
    for (var i in word) {
        $('.container .host span').last().append(word[i]);
        await sleep(30);
    }
}

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

async function user_input() {
    printHost();

    $('.container .host').last().append('<input type="text" id="id_and_code" name="id_and_code" class="col-4 col-md-6 col-lg-8 m-0 p-0">');
    $('.id_and_code').last().focus();
    $('.id_and_code').last().keypress(async function (event) {
        if (event.keyCode == 13) {
            $('.id_and_code').last().attr('disabled', 'disabled');

            // 如果輸入錯誤
            if (!checkInput($('.id_and_code').last().val())) {
                printHost();
                await printText('輸入錯誤, 請重新輸入');
                user_input();
            }
        }
    });
}
var verInfo = `Welcome to WorldSimulation 2019.05 LTS (GNU/Linux 4.4.0-139-generic x86_64)

<br/><br/><br/> &nbsp;* Documentation:  https://help.WorldSimulation.com
<br/> &nbsp;* Management:     https://landscape.WorldSimulation.com
<br/> &nbsp;* Support:        https://WorldSimulation.com/advantage
<br/><br/><br/> 79 packages can be updated.
<br/> 0 updates are security updates.


<br/><br/><br/> *** System restart required ***
<br/> Last login: Sun Apr 21 01:52:42 2019 from 101.12.8.172 <br />`;
let text = ['你好', '歡迎來到終端', '請輸入你的卡片辨識碼以及 Story Code', '如: 15601800 XC15D8E'];

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
pageScroll();