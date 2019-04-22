var sleep = (ms = 0) => {
    return new Promise(r => setTimeout(r, ms));
}

var imgPath;
async function imgChange() {
    while (true) {
        for (let i = 1; i <= 4; i++) {
            imgPath = '../img/codeConer0' + i + '.jpg';
            $('#codeImg').attr('src', imgPath);
            await sleep(100);
            $('#codeImg').css('opacity', Math.random()- 0.2);
        }
    }
}

imgChange();