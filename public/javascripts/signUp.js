var signUp_modules = (() => {
    var modules = {};

    // Regex 定義

    // Ex: 10(4213083) 必須為 10 開頭且有後七碼數字
    const idCheck = new RegExp(/^10\d{7}$/);
    // 中英文可含空白、-, 並且至少要2位元
    const nameCheck = new RegExp(/^[-a-zA-Z_\s\u4e00-\u9fa5]{2,}$/);
    const emailCheck = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    // 密碼最少四個字且要有一碼為英文
    const passwordCheck = new RegExp(/^(?=.*[a-zA-Z])[0-9a-zA-Z]{4,}$/);

    // 顯示提示
    function _getHint() {
        alert('You have to looking for the clues in this page');
    }

    // 頁面切換
    function _slidePanel() {
        $('#errorPanel').fadeOut('slow', () => {
            $('#errorPanel, #puzzleInfo').removeClass('d-block');
            $('#errorPanel, #puzzleInfo').addClass('d-none');
        });

        $('#registerPanel').fadeIn('slow', () => {
            $('#registerPanel, #registeInfo').removeClass('d-none');
            $('#registerPanel, #registeInfo').addClass('d-block');
        })
    }

    // 綁定輸入檢查事件
    function _bindInputRegex() {
        function showSuccess(inputObject) {
            inputObject.addClass('is-valid');
            inputObject.removeClass('is-invalid');
        }

        function showError(inputObject) {
            inputObject.addClass('is-invalid');
            inputObject.removeClass('is-valid');
        }

        $('#teamPassword').on('focusout', (e) => {
            if(passwordCheck.test(e.target.value)) {
                showSuccess($('#teamPassword'));
            } else {
                showError($('#teamPassword'));
            }
        });

        $('#mainStudentID, #secondStudentID, #thirdStudentID').on('focusout', (e) => {
            if(idCheck.test(e.target.value)) {
                showSuccess($('#' + e.target.id));
            } else {
                showError($('#' + e.target.id));
            }
        });

        $('#mainName, #secondName, #thirdName').on('focusout', (e) => {
            if(nameCheck.test(e.target.value)) {
                showSuccess($('#' + e.target.id));
            } else {
                showError($('#' + e.target.id));
            }
        });

        $('#mainEmail, #secondEmail, #thirdEmail').on('focusout', (e) => {
            if(emailCheck.test(e.target.value)) {
                showSuccess($('#' + e.target.id));
            } else {
                showError($('#' + e.target.id));
            }
        });
    }

    function _checkForm() {
        // 格式化 String Array
        function formatInvalid(invalidArray) {
            let resultStr = '';
            for(let i = 0; i < invalidArray.length; i++) {
                resultStr += invalidArray[i];
                if(i !== invalidArray.length - 1) {
                    resultStr += ', ';
                }
            }
            return resultStr;
        }

        // 沒有填寫的欄位
        invalid = [];

        // 團隊資料欄位
        teamObject = {
            '團隊密碼': (passwordCheck.test($('#teamPassword').val())) ? $('#teamPassword').val() : "",
            '主要聯絡人': {
                '學號': (idCheck.test($('#mainStudentID').val())) ? $('#mainStudentID').val() : "",
                '姓名': (nameCheck.test($('#mainName').val())) ? $('#mainName').val() : "",
                '信箱': (emailCheck.test($('#mainEmail').val())) ? $('#mainEmail').val() : ""
            },
            '夥伴一': {
                '學號': (idCheck.test($('#secondStudentID').val())) ? $('#secondStudentID').val() : "",
                '姓名': (nameCheck.test($('#secondName').val())) ? $('#secondName').val() : "",
                '信箱': (emailCheck.test($('#secondEmail').val())) ? $('#secondEmail').val() : ""
            },
            '夥伴二': {
                '學號': (idCheck.test($('#thirdStudentID').val())) ? $('#thirdStudentID').val() : "",
                '姓名': (nameCheck.test($('#thirdName').val())) ? $('#thirdName').val() : "",
                '信箱': (emailCheck.test($('#thirdEmail').val())) ? $('#thirdEmail').val() : ""
            }
        };

        for(let key in teamObject) {
            if(typeof(teamObject[key]) === "object") {
                for(let subKey in teamObject[key]) {
                    if(teamObject[key][subKey] === "") {
                        invalid.push("無效的" + key + subKey);
                    }
                }
            } else if(teamObject[key] === "") {
                invalid.push("無效的" + key);
            }
        }

        // 當有無效資料
        if(invalid.length > 0) {
            // Show message
            $('#showMsg').removeClass('d-none');
            $('#showMsg').addClass('d-block');
            $('#showMsg').text(formatInvalid(invalid));
        } else {
            // clear it
            $('#showMsg').removeClass('d-block');
            $('#showMsg').addClass('d-none');
            $('#showMsg').text("");
            // disable button
            $('#submit').prop('disabled', true);
            $('#submit').removeClass('btn-primary');
            $('#submit').addClass('btn-secondary');
            // submit
            _submit(teamObject);
        }
    }

    function _submit(teamObject) {
        let url = '/_api/register';
        let responseStatus = 0;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(teamObject)
        }).then((response) => {
            responseStatus = response.status;
            return response.json();
        }).then((jsonData) => {
            if(responseStatus === 200) {
                // 註冊成功
                alert(jsonData.message);
                $('#submit').removeClass('btn-secondary');
                $('#submit').addClass('btn-success');
                $("#submit").html('註冊成功');
            }
            if(responseStatus === 403) {
                // 註冊失敗
                alert(jsonData.error);
                $('#submit').prop('disabled', false);
                $('#submit').removeClass('btn-secondary');
                $('#submit').addClass('btn-primary');
            }
        }).catch((err) => {
            alert('網路錯誤，請重新再試');
            $('#submit').prop('disabled', false);
            $('#submit').removeClass('btn-secondary');
            $('#submit').addClass('btn-primary');
            console.log('Network Error: ', err);
        })
    }

    modules.init = () => {
        $('#getHint').bind('click', _getHint);
        $('#label-brain').bind('click', _slidePanel);
        $('#submit').bind('click', _checkForm);
        _bindInputRegex();
    }

    return modules;
})();