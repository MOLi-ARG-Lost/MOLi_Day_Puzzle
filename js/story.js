function printHost() {
    let hostName = 'OS_0000001@earth:~$';
    $('.container').append('<br /><span class="host">' + hostName + '&nbsp;</span>');
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

function printStory(storyNum) {
    printHost();
    // 讀入故事並存進陣列
    var story = ['整個世界要毀滅啦'];
    printText(story[0]);
}

function checkInput(input_data) {
    var data = input_data.split(' ');
    console.log(data[0]);
    switch (data[1]) {
        case '1':
            printStory(1);
            return true;
        case '2':
            printStory(2);
            return true;
        case '3':
            printStory(3);
            return true;
        case '4':
            printStory(4);
            return true;
        case '5':
            printStory(5);
            return true;
        case '6':
            printStory(6);
            return true;
        case '7':
            printStory(7);
            return true;
        default:
            return false;
    }
}

async function user_input() {
    printHost();

    $('.container .host').last().append('<input type="text" name="id_and_code" class="id_and_code">');
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

let text = ['你好', '歡迎來到終端', '請輸入你的卡片辨識碼以及 Story Code', '如: 15601800 XC15D8E'];

async function main() {
    for (let i = 0; i < text.length; i++) {
        printHost();
        await printText(text[i]);
        await sleep(300);
    }
    user_input();
}
main()