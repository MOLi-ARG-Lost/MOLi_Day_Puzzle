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

async function checkInput(input_data) {
    if (input_data == '王翰同') {
        let endText = ['恭喜', '你果然找到了失去的存在', '如此一來我們便可將王翰同重新啟動',
            '不過', '包含你們在內', '關於我們事情的記憶', '會全部消失', '畢竟我們不能再承受任何風險',
            '再會...', '不', '永別了'];
        for (var i in endText) {
            printHost();
            await printText(endText[i]);
            await sleep(300);

        }
        for(let i = 0; i < 30; i++) {
            printHost();
            await sleep(300 - (i * 10));
        }
        for(let i = 0; i < 100; i++) {
            printHost();
        }
        // 看要改哪裡
        // location.href = 'https://www.facebook.com';
        return true;
    }
    return false;
}

async function user_input() {
    printHost();

    $('.container .host').last().append('<input type="text" id="id_and_code" name="id_and_code" class="col-4 col-md-6 col-lg-8 m-0 p-0">');
    $('#id_and_code').focus();
    $('#id_and_code').keypress(async function (event) {
        if (event.keyCode == 13) {
            $('#id_and_code').attr('disabled', 'disabled');
            // 如果輸入錯誤
            let result = await checkInput($('#id_and_code').val());
            if(!result) {
                printHost();
                await printText('Error');
                location.href = 'http://www.lmgtfy.com/?q=%E5%A6%82%E6%9E%9C%E6%88%91%E6%9C%8B%E5%8F%8B%E5%BE%9E%E4%B8%96%E7%95%8C%E4%B8%8A%E6%B6%88%E5%A4%B1%E4%BA%86%E8%A9%B2%E6%80%8E%E9%BA%BC%E8%BE%A6%EF%BC%9F';
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
let text = ['你好', '歡迎來到終端', '能走到這表示你已經找到失去的存在了吧', '那麼', '告訴我你的名字吧'];

async function main() {
    $('.container').append(verInfo);
    for (let i = 0; i < text.length; i++) {
        printHost();
        await printText(text[i]);
        await sleep(300);
    }
    await user_input();
}
main();
pageScroll();