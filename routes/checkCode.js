var express = require('express');
var router = express.Router();

var storyArray = ['PTIKK42SQG', 'HS44APEBS8', 'APRVL69UB3', '7GF2M2XM2L', '36EF11SSOC', 'UC752H9W22', 'EM5NM91GA6'];

function getStory(storyCode) {
    switch (storyCode) {
        case 'PTIKK42SQG':
            return ['■■■ 坐在推理同好會的社辦，翻著筆電裡的照片，那是一些奇怪的身影，總是在深夜出沒於管院，從頭到腳一身黑，從沒看過其他顏色的衣服，並且在離開時一定扛著許多大型的黑色袋子和箱子。', '「肯定有問題。」■■■ 說，一邊看著照片中的神秘身影「我一定會揪出他們的真面目!」當初會加入推理同好會，便是由於自小對各種神秘的事件感到興趣，總是期待著自己有一天也能破解現實世界中的事件，而今在學校發現可疑的人，不免勾起 ■■■ 心中的偵探魂。'];
        case 'HS44APEBS8':
            return ['「欸我們禮拜四要去聚餐，副社你訂一下位，晚上七點半，6 個人。」社長說。', '「1, 2, 3, 4, 5…」副社數著人數「社長，我們幹部只有 5 個人欸」', '「咦?我怎麼會數錯?哈哈哈哈」社長一邊大笑，心裡卻隱約覺得好像有什麼不對勁。', '「幹幹幹!忘記要開會!怎麼沒人提醒我啊!」■■■ 在崎下車站急匆匆的翻找著學生證「吼校車要來了阿我的學生證是死去哪裡啦!」', '■■■ 一邊翻找著學生證，一邊對著公車招手，沒想到，公車司機卻彷彿沒看到他一樣，直接左轉開走了。', '「靠邀喔!」■■■ 看著開走的校車忍不住罵出了聲「媽啦今天怎麼那麼衰」', '■■■ 拿出手機，想到社團群組跟大家說明自己缺席的原因，殊不知，所有社群軟體、通訊軟體完全沒有他的帳號紀錄，也無法登入，■■■ 不敢相信自己的眼睛，眨了兩下眼，再定睛一看，這回卻連 SIM 卡的訊號都消失了。', '「搞屁喔!」■■■ 把手機往書包裡一丟，開始往學校的方向走。'];
        case 'APRVL69UB3':
            return ['■■■ 氣喘吁吁地走在汽車道上，剛走科院對面的公車站，便坐在裝置藝術上休息，便思考著剛發生的事情。', '「到底是為什麼…」■■■ 拿出手機，看著上面的 “偵測不到 SIM 卡”，嘆了口氣。', '正當 ■■■ 要把手機再丟回書包的時候，手機螢幕忽然開始不停閃爍，並發出奇怪的聲音，■■■ 嚇得趕緊把手機往路邊一丟，並站起身，這時，手機卻投影出一個人，並開口說話了。', '「嗨! ■■■」那投影出的人說「我是 OS。」', '「What the …」■■■ 看著眼前不可思議的人像，啞然失語。', '「嗯!意料之內的反應，」 OS 說，「我們注意到了你最近在調查一些神秘的人，對吧?」■■■ 沒有說話，只是用「我看到了什麼」的表情看著 OS。', '「你注意到的那些，其實是為了維護系統能正確運行的程式」OS 一點也不在乎 ■■■ 的表情，不急不徐的繼續說著。', '「由於你先前調查並企圖對這些維護系統的程式進行具有攻擊性的行為，你已經被視為錯誤執行的程式，並且有影響系統執行的風險，因此我們已經開始針對這個問題進行處置，你的所有資訊將在一周內被清除，當這個世界沒有任何一個其他的程式使用到你的資訊時，你就會被…喔!看看你的表情!」', 'OS 像是終於注意到 ■■■ 的表情，做了點補充說明 :「你可曾聽說過 整個世界是一個在電腦上運行的程式 這個傳說 ? 我現在告訴你，那是真的。」'];
        case '7GF2M2XM2L':
            return ['■■■ 感到一陣惡寒，難道自己就要這樣消失在這個世界了嗎 ? 如果是這樣，或許應該在最後留下自己曾經存在的證明，■■■ 這麼想著，便撿起石頭，在地上畫出自己的名字。然而，就在畫好後沒幾秒，名字就這麼消失了。', '「沒有用的，要讓你被清除，怎麼可能讓你留下關於自己的資訊。」OS 看著 ■■■ 錯愕的臉說到。', '聽到這句話，■■■ 憤怒的把石頭朝 OS 丟過去，石頭理所當然地穿過了 OS 的投影，並在路邊的車上刮出一道刮痕，而 OS 只是看著 ■■■ ，搖搖頭後就消失了。', '這下 ■■■ 徹底相信 OS 了，自己的存在正在被抹滅。', '「難道就沒有任何辦法嗎…」 ■■■ 抱著頭喃喃自語。忽然間，他看到了被他丟的石頭刮壞的車子， ■■■ 靈光一閃，再撿起一塊石頭，在地上寫了個 FUCK，這次，文字卻沒有消失。', '「我懂了!」 ■■■ 興奮地站了起來「只要被判斷不是我的資訊，就不會被清除!」■■■ 彷彿看到一線曙光。', '「首先，先從想辦法告訴社團的人開始。」■■■ 拿起書包，繼續往校園內走。'];
        case '36EF11SSOC':
            return ['一夜大雨。', '清晨，偌大的校園被朝霧籠罩，準備上課的社長，穿過大草皮，往學院直直地前進。', '踏進學院，一股不協調感湧上心頭，總覺得有什麼地方跟平常不太一樣，社長歪著頭，左看右看，一道陽光照穿薄霧，濡濕的中庭一隅顯出了被什麼人刻意留下的記號，社長瞪大眼睛，立刻拿出手機拍了下來，並傳到了幹部群組。', '下午，社團一群人又聚了起來。', '「總務，你檢查一下帳本，我們的收支表有沒有哪裡不太正常的。」社長對著總務說「如果我沒猜錯，社費收入的部分應該會比現有社員多一筆。」', '「OK!」總務馬上從書包裡拿出帳本，並拿出手機計算機開始核對。', '「社長，早上的照片是…?」副社語氣中透著些許的不安。', '「我就直說了，我們幹部，其實有 6 個人。」社長說。'];
        case 'UC752H9W22':
            return ['「找到了!在總帳的地方，實際收入確實比社員數量多了一筆!」總務激動的說。', '「好，看來事情是這樣的，我們有一位幹部，因為不知名的原因而消失了」社長嚴肅的說「這些話聽起來也許很可笑，但卻是事實，今天早上在人院看到的記號就是那個消失的幹部為了告訴我們這件事所留下的。」', '「嗯...大家聚在一起的時候我也總覺得好像有少了誰...」副社說。', '「但是，我們所有的活動紀錄，都沒有第 6 人啊!」學術翻著臉書，還有群組的紀錄，提出了疑惑。', '「確實，現在的世界上幾乎每個人都會在網路上有紀錄，僅憑我們些微的印象或感覺，很難證明這個人存在。」社長說「但是，透過這些虛擬的資訊來定義一個人是否存在，你不覺得這更荒謬嗎?」', '眾人面面相覷，一時語塞。', '「那我們現在應該怎麼做?」文書問到。', '「他會透過留下記號的方式通知我們，就表示他沒有辦法直接留下清楚的訊息，我相信他也留下了其他的訊息，告訴我們如何找到他，因此我們接下來要做的事就是我們最擅長的了。」社長說。'];
        case 'EM5NM91GA6':
            return ['「其實我知道你在打什麼主意。」OS 冷不防的從 ■■■ 的手機中跳出來，環顧四週，竟是圖書館的屋頂。', '「我想也是。」■■■ 沒有轉頭，冷冷地說到。', '「意外的冷靜呢。」OS 略帶笑意地說「放棄了嗎?」', '「這倒不是，」■■■ 凝視著夕陽「只是我能做的都做了。」', '「真是坦率。」OS 說。', '兩人陷入沉默。', '「其實挺有趣的。」OS 說到', '■■■ 轉過頭，用「你在公三小」的臉看著 OS。', '「好吧，老實說，有別的辦法，能在不完全抹消你的情況下除掉你的程序錯誤，而這個方法簡單來說就是重新啟動。」OS 開始解釋，■■■ 瞪大了眼睛，怒火正要發作，卻被 OS 給打斷。', '「你別吵，先聽我說，在我們允許的情況下，可以對死亡的人設定特殊條件，在達成特殊條件之後，可以讓人死而復生，不過，在你死後我們會修改你的資料和程式，並重新編譯執行，讓你忘記關於我們的事，並且永遠不會再注意到我們。」', '「你在公三小?」■■■ 把表情轉化成言語。', '「意思就是，」OS 舉起手，向 ■■■ 走近「你必須去死。」', 'OS 彈了一下手指， ■■■ 身下坐著的水泥忽然變成無數發光的 0 和 1，而 ■■■ 就這麼掉了下去，在碰到地面的一瞬間，■■■ 也變成無數發光的 0 和 1，並被吸進 OS 手上的一張學生證。', '「那麼，條件就是 : 找到學生證，找到你的名字，找到與我對話的窗口，如此一來，我就可以將你重新啟動了。」', '一陣和風拂過，掃起幾張落葉，夕陽下的圖書館屋頂上，什麼都沒有。'];
    }
}

/* 檢驗密碼的 API */

router.post('/OOXX', function(req, res, next) {
    let formData = req.body;
    if(formData['secretCode'] && (formData['secretCode'] === "0000192940" || formData['secretCode'] === "0000192-940")) {
        res.status(200).send({'message': 'Roger that, here is your "O"', 'storyCode': 'HS44APEBS8', 'nextUrl': 'ConnectToWorld', 'terminal': 'UntouchableWindows'});
    } else {
        res.status(403).send({'message': 'You got a wrong call.'});
    }
});

/* 獲得團隊終端機進度 */

router.post('/getProgress', function(req, res, next) {
    let formData = req.body;
    let database = req.database;
    if(formData['teamCode']) {
        database.collection('teams').get()
        .then((snapshot) => {
            for(let docIndex in snapshot.docs) {
                let teamRegObject = snapshot.docs[docIndex].data();
                if(teamRegObject['teamCode'] && teamRegObject['teamCode'] === formData['teamCode']) {
                    if(teamRegObject['當前進度']) {
                        // 有進度
                        res.cookie('teamID', teamRegObject['teamCode'], {httpOnly: false, maxAge: 7*24*60*60*1000}).cookie('level', teamRegObject['當前進度'], {httpOnly: true, maxAge: 7*24*60*60*1000}).status(200).send({'status': true, 'story': getStory(teamRegObject['當前進度'])});
                    } else {
                        // 無進度
                        res.status(200).send({'status': false});
                    }
                    return;
                }
            }
            res.status(404).send({'error': ' ID 辨識碼錯誤'});
        }).catch((err) => {
            console.log('Get progress error. Error: ' + err);
            res.status(500).send({'error': '伺服器網路發生錯誤，請稍後再試'});
        });
    } else {
        res.status(403).send({'error': '沒有輸入 ID 辨識碼'});
    }
});

/* 設定團隊終端機進度 */

router.post('/setProgress', function(req, res, next) {
    let formData = req.body;
    let database = req.database;
    if(formData['teamCode'] && storyArray.indexOf(formData['storyCode']) >= 0) {
        database.collection('teams').get()
        .then(async (snapshot) => {
            for(let docIndex in snapshot.docs) {
                let teamRegObject = snapshot.docs[docIndex].data();
                if(formData['teamCode'] === teamRegObject['teamCode']) {
                    if((storyArray.indexOf(formData['storyCode'])) > ((teamRegObject['當前進度']) ? storyArray.indexOf(teamRegObject['當前進度']) + 1 : 0)) {
                        res.status(404).send({'error': '訊息代碼尚未開啟，請依序輸入'});
                        return;
                    } else if((storyArray.indexOf(formData['storyCode'])) === ((teamRegObject['當前進度']) ? storyArray.indexOf(teamRegObject['當前進度']) + 1 : 0)) {
                        // 送出資料
                        teamRegObject['當前進度'] = formData['storyCode'];
                        await database.collection('teams').doc(snapshot.docs[docIndex].id).update(teamRegObject);
                        res.cookie('teamID', teamRegObject['teamCode'], {httpOnly: false, maxAge: 7*24*60*60*1000}).cookie('level', teamRegObject['當前進度'], {httpOnly: true, maxAge: 7*24*60*60*1000}).status(200).send({'message': '進度設置成功', 'story': getStory(formData['storyCode'])});
                        return;
                    } else if((storyArray.indexOf(formData['storyCode'])) < ((teamRegObject['當前進度']) ? storyArray.indexOf(teamRegObject['當前進度']) + 1 : 0)) {
                        res.status(200).cookie('teamID', teamRegObject['teamCode'], {httpOnly: false, maxAge: 7*24*60*60*1000}).send({'message': '回顧歷史訊息（重新登入可獲得當前訊息）', 'story': getStory(formData['storyCode'])});
                        return;
                    }
                }
            }
            res.status(404).send({'error': ' ID 辨識碼錯誤'});
        }).catch((err) => {
            console.log('Get progress error. Error: ' + err);
            res.status(500).send({'error': '伺服器網路發生錯誤，請稍後再試'});
        });
    } else {
        res.status(403).send((formData['teamCode']) ? {'error': '訊息代碼錯誤'} :  {'error': '缺少 ID'});
    }
});

/* 獲得故事(未使用) */

router.post('/getStory', function(req, res, next) {
    let formData = req.body;
    let database = req.database;
    if(storyArray.indexOf(formData['storyCode']) !== -1) {
        database.collection('teams').doc(formData['teamCode']).get()
        .then((doc) => {
            if (!doc.exists) {
                // 回傳查無此隊伍
                res.status(404).send({'error': ' ID 辨識碼錯誤'});
            } else {
                let teamObject = doc.data();
                if (teamObject['當前進度'] && (storyArray.indexOf(teamObject['當前進度']) >= storyArray.indexOf(formData['storyCode']))) {
                    res.status(200).send({'message': '查詢成功', 'story': getStory(formData['storyCode'])});
                } else {
                    res.status(403).send({'error': '非當前進度可見'});
                }
            }
        }).catch((err) => {
            console.log('Get progress error. Error: ' + err);
            res.status(500).send({'error': '伺服器網路發生錯誤，請稍後再試'});
        });
    } else {
        res.status(403).send({'error': '訊息代碼錯誤'});
    }
});

module.exports = router;