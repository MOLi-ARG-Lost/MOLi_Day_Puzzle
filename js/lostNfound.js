var sleep = (ms = 0) => {
    return new Promise(r => setTimeout(r, ms));
}

var imgPath;
async function imgChange() {
    while (true) {
        for (let i = 1; i <= 3; i++) {
            imgPath = '../img/bus0' + i + '.png';
            $('#adImg').attr('src', imgPath);
            await sleep(500);
        }
    }
}

imgChange();