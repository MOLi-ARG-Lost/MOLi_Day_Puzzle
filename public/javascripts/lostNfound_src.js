var lnfApp = (() => {
    var modules = {};

    var currentIndex = $('tbody>tr:last>th').html();

    var sleep = (ms = 0) => {
        return new Promise(r => setTimeout(r, ms));
    }

    async function imgChange() {
        let imgPath;
        while (true) {
            for (let i = 1; i <= 3; i++) {
                imgPath = '/images/bus0' + i + '.png';
                $('#adImg').attr('src', imgPath);
                await sleep(500);
            }
        }
    }

    function clearForm() {
        $('#form26').val('');
        $('#form34').val('');
        $('#form29').val('');
        $('#form8').val('');
    }

    modules.init = () => {
        // 檢查有無 localstorage
        if (typeof(Storage) !== "undefined") {
            if(localStorage.code && localStorage.place && localStorage.time) {
                $('#ad').removeClass('d-none');
                $('tbody').append(`
                    <tr>
                        <th scope="row">${++currentIndex}</th>
                        <td>${localStorage.code}</td>
                        <td>${localStorage.place}</td>
                        <td>${localStorage.time}</td>
                    </tr>
                `);
            }
        } else {
            alert('您的瀏覽器不支援本服務，請使用其他瀏覽器或更新版本');
        }
        // 綁定建立遺失物按鈕事件
        $('#newFound').on('click', () => {
            let currentTime = new Date();
            // 顯示目前時間
            $('#form32').val(currentTime.getHours() + ':' + ('0'+currentTime.getMinutes()).slice(-2) );
        });
        // 綁定送出按鈕事件
        $('#send').on('click', async () => {
            $('#send').prop('disabled', true);

            let foundObject = {
                'id': $('#form26').val(),
                'code': $('#form34').val(),
                'place': $('#form29').val(),
                'time': $('#form32').val()
            }

            let url = '/_api/lnf/found';
            let responseStatus = 0;
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'id': foundObject.id, 'code': foundObject.code})
            }).then((response) => {
                responseStatus = response.status;
                return response.json();
            }).then((jsonData) => {
                if(responseStatus === 200) {
                    // 寫入本地 storage
                    localStorage.setItem("code", foundObject.code);
                    localStorage.setItem("place", foundObject.place);
                    localStorage.setItem("time", foundObject.time);
                    // 填入頁面
                    $('tbody').append(`
                        <tr>
                            <th scope="row">${++currentIndex}</th>
                            <td>${foundObject.code}</td>
                            <td>${foundObject.place}</td>
                            <td>${foundObject.time}</td>
                        </tr>
                    `);
                    // 清除表單
                    clearForm();
                    // 顯示訊息
                    alert(jsonData.message + ', You got a secret code: "' + jsonData.storyCode + '" Please keep it in you mind.');
                    $('#modalContactForm').modal('toggle');
                    $('#send').prop('disabled', false);
                    $('#ad').removeClass('d-none');
                }
                if(responseStatus == 403 || responseStatus === 404 || responseStatus === 500) {
                    alert(jsonData.error);
                    $('#send').prop('disabled', false);
                }
            });
        });
        // 公車閃爍起來
        imgChange();
    }

    return modules;
})();