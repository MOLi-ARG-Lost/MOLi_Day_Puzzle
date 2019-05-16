var game = (() => {
    var playerSymbol = "O";
    var enemySymbol = "X";
    var win;  // TRUE if somebody won the game
    var turn; // Number of the current turn
    var row, column;  // Will contain "coordinates"for a specific cell
    var cpuEnabled = true;  // Set this to false to play against a human
    var current = 0;
    var gameLimit = 2;
    var getO = false;
    var storyCode = undefined;
    var nextUrl = undefined;
    var terminal = undefined;

    var modules = {};

    /******  FUNCTIONS  ******/

    var sleep = (ms = 0) => {
        return new Promise(r => setTimeout(r, ms));
    }

    // Inserts a symbol in the clicked cell
    function insertSymbol(element, symbol) {
        element.innerHTML = symbol;

        if (symbol === enemySymbol)
            $("#" + element.id).addClass("player-two"); // Color enemy symbol differently
        $("#" + element.id).addClass("cannotuse");  // Show a "disabled" cursor on already occupied cells

        checkWinConditions(element);
        if(win) {
            // 把 hover 移除
            $('.cell').unbind('mouseenter').unbind('mouseleave');
            // 彈出確認視窗
            let check = confirm('You Win Huh? Here is you code: "' + storyCode + '" As usually, keep it in mind.');
            if(check) {
                alert('Wrong choice. But the browser is gradually become weird');
                sleep(5000);
                location.replace('/' + terminal);
            } else {
                alert('Right choice. But make sure you got the weird thing in this page.')
                sleep(1000);
                location.replace('/' + nextUrl);
            }
        }
        turn++;
        // Game end - If somebody has won or all cells are filled
        if (win || turn >= 6) {
            $("#restart").addClass("btn-green");  // Highlights "restart" button
            $(".cell").addClass("cannotuse");  // Tells visually you can't interact anymore with the game grid
        }
        else if (cpuEnabled && turn % 2 !== 0) {
            cpuTurn();
        }
    }

    /* Changes screen with a fade effect */
    function startGame() {
        /* Shows the game screen when the intro screen is completely hidden */
        $("#game-screen").fadeIn(1000);
        restartGame();
    }

    /* Sets everything to its default value */
    function restartGame() {
        current = 0;
        turn = 0;
        win = false;
        $(".cell").text("");
        $(".cell").removeClass("wincell");
        $(".cell").removeClass("cannotuse");
        $(".cell").removeClass("player-two");
        $("#restart").removeClass("btn-green");
    }

    /* Check if there's a winning combination in the grid (3 equal symbols in a row/column/diagonal) */
    function checkWinConditions(element) {
        // Retrieve cell coordinates from clicked button id
        row = element.id[4];
        column = element.id[5];

        // 1) VERTICAL (check if all the symbols in clicked cell's column are the same)

        win = true;
        for (var i = 0; i < 3; i++) {
            if ($("#cell" + i + column).text() !== element.innerHTML) {
                win = false;
            }
        }
        if (win) {
            for (var i = 0; i < 3; i++) {
                // Highlight the cells that form a winning combination
                $("#cell" + i + column).addClass("wincell");
            }

            return; // Exit from the function, to prevent "win" to be set to false by other checks
        }

        // 2) HORIZONTAL (check the clicked cell's row)

        win = true;
        for (var i = 0; i < 3; i++) {
            if ($("#cell" + row + i).text() !== element.innerHTML) {
                win = false;
            }
        }
        if (win) {
            for (var i = 0; i < 3; i++) {
                $("#cell" + row + i).addClass("wincell");
            }
            return;
        }

        // 3) MAIN DIAGONAL (for the sake of simplicity it checks even if the clicked cell is not in the main diagonal)

        win = true;
        for (var i = 0; i < 3; i++) {
            if ($("#cell" + i + i).text() !== element.innerHTML) {
                win = false;
            }
        }
        if (win) {
            for (var i = 0; i < 3; i++) {
                $("#cell" + i + i).addClass("wincell");
            }
            return;
        }

        // 3) SECONDARY DIAGONAL

        win = false;
        if ($("#cell02").text() === element.innerHTML) {
            if ($("#cell11").text() === element.innerHTML) {
                if ($("#cell20").text() === element.innerHTML) {
                    win = true;
                    $("#cell02").addClass("wincell");
                    $("#cell11").addClass("wincell");
                    $("#cell20").addClass("wincell");
                }
            }
        }
    }

    // Simple AI (clicks a random empty cell)
    async function cpuTurn() {
        var ok = false;

        while (!ok) {
            row = Math.floor(Math.random() * 3);
            column = Math.floor(Math.random() * 3);
            if ($("#cell" + row + column).text() === "") {
                // We have found it! Stop looking for an empty cell
                ok = true;
            }
        }
        await sleep(50);
        $("#cell" + row + column).click(); // Emulate a click on the cell
    }

    function getCheat() {
        if(!getO) {
            $('#secretCode').prop('disabled', true);
            $('#sendOut').prop('disabled', true);
            let url = '/_api/check/OOXX';
            let responseStatus = 0;
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'secretCode': $('#secretCode').val()})
            }).then((response) => {
                responseStatus = response.status;
                return response.json();
            }).then((jsonData) => {
                if(responseStatus === 200) {
                    // 驗證成功
                    alert(jsonData.message);
                    storyCode = jsonData.storyCode;
                    nextUrl = jsonData.nextUrl;
                    terminal = jsonData.terminal;
                    gameLimit++;
                    getO = true;
                }
                if(responseStatus === 403) {
                    // 驗證失敗
                    alert(jsonData.message);
                    $('#secretCode').prop('disabled', false);
                    $('#sendOut').prop('disabled', false);
                }
            }).catch((err) => {
                alert('網路錯誤，請重新再試');
                $('#secretCode').prop('disabled', false);
                $('#sendOut').prop('disabled', false);
                console.log('Network Error: ', err);
            })
        } else {
            alert('You already got "O"!');
        }
    }

    modules.init = () => {
        startGame();
        $('#sendOut').on('click', function() {
            getCheat();
        });
        // Game screen buttons
        $("#restart").on("click", function () {
            restartGame();
        });
        $(".cell").on("click", function () {
            // If nobody has won yet and clicked cell is empty
            if (!win && this.innerHTML === "") {
                if (turn % 2 === 0) { // Even number = player turn
                    if(current < gameLimit) {
                        insertSymbol(this, playerSymbol);
                        current++;
                    } else if(gameLimit === 3){
                        alert('You lose your chance to win, try again.');
                    } else {
                        alert('Your haven\'t enough "O", try to find it.');
                    }
                }
                else { // Odd number = enemy turn
                    insertSymbol(this, enemySymbol);
                }
            }
        });
    }

    return modules;

})();