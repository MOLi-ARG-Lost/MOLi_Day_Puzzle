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

    // 顯示故事
    async function printStory(storyArray) {
        for(let section of storyArray) {
            printHost();
            await printText(section);
            await sleep(50);
        }
    }

    // 逐字顯示
    async function printText(word) {
        $('.container .host').last().append('<span class="console"></span>');
        for (var i in word) {
            $('.container .host span').last().append(word[i]);
            await sleep(50);
        }
    }

    // 自動下滑捲軸
    function pageScroll() {
        window.scrollBy(0,1);
        scrolldelay = setTimeout(pageScroll,10);
    }

    // 檢查進度
    async function getProgress(teamCode) {
        let url = '/_api/check/getProgress';
        let responseStatus = 0;
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'teamCode': teamCode})
        }).then((response) => {
            responseStatus = response.status;
            return response.json();
        }).then(async(jsonData) => {
            if(responseStatus === 200) {
                if(jsonData.status) {
                    // 有進度
                    await printStory(jsonData.story);
                } else {
                    await getStart();
                }
                // 設定成功
            }
            if(responseStatus === 403 || responseStatus === 404) {
                setCookie('teamID', teamCode, 0);
                await getStart();
            }
        });
    }

    // 設定進度
    async function setProgress(commands) {
        let url = '/_api/check/setProgress';
        let responseStatus = 0;
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'teamCode': commands.split(" ")[0], 'storyCode': commands.split(" ")[1]})
        }).then((response) => {
            responseStatus = response.status;
            return response.json();
        }).then(async (jsonData) => {
            printHost();
            if(responseStatus === 200) {
                // 設定成功
                await printText(jsonData.message);
                await printStory(jsonData.story);
                return true;
            }
            if(responseStatus === 403) {
                // 團隊編號或故事錯誤
                await printText(jsonData.error);
                return false;
            }
            if(responseStatus === 404) {
                // 找不到隊伍編號
                await printText(jsonData.error);
                return false;
            }
            if(responseStatus === 500) {
                // 資料庫連線錯誤
                await printText(jsonData.error);
                return false;
            }
        }).catch(async (err) => {
            await printText('網路錯誤，請重新再試');
            console.log('Network Error: ', err);
            return false;
        })
    }

    // 使用者輸入
    async function user_input() {
        printHost();

        $('.container .host').last().append('<input type="text" id="id_and_code" name="id_and_code" class="col-4 col-md-6 col-lg-8 m-0 p-0">');
        $('#id_and_code').focus();
        $('#id_and_code').keypress(async function (event) {
            if (event.keyCode == 13) {
                $('#id_and_code').prop('disabled', true);
                await setProgress($('#id_and_code').val());
                $('#id_and_code').removeAttr('id');
                user_input();
            }
        });
    }

    // 讀取資料
    async function getStart() {
        let text = ['你好', '歡迎登入世界終端', '請輸入你的 ID 辨識碼以及十位訊息代碼', '如: 21538 X9GEFX1TLL'];

        for (let i = 0; i < text.length; i++) {
            printHost();
            await printText(text[i]);
            await sleep(300);
        }

    }

    // 終端機初始化
    async function welcome() {
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
            await getProgress(getCookie("teamID"));
            // 輸出對話框
            await user_input();
        } else {
            // 初始化, 要求輸入卡片 ID 及代碼
            await getStart();
            // 輸出對話框
            await user_input();
        }
    }

    modules.init = () => {
        welcome();
        pageScroll();
    };

    return modules;

})();