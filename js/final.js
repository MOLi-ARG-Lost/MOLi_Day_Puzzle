var sleep = (ms = 0) => {
    return new Promise(r => setTimeout(r, ms));
}

var imgPath;
async function imgChange() {
    $('#img').css('display', 'block');
    for (let i = 0; i < 10; i++) {
        for (let i = 1; i <= 2; i++) {
            imgPath = '../img/drone' + i + '.png';
            $('#img').attr('src', imgPath);
            await sleep(100);
            $('#img').css('opacity', Math.random() - 0.4);
        }
    }
    $('#img').css('display', 'none');
}


async function bgChange() {
    while (true) {
        await sleep(Math.random() * 10000 + 10000);
        await imgChange();
    }
}
bgChange();