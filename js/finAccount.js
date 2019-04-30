function changeImg(clicked) {
    if (clicked == 'moon') {
        $('#accountImg').attr('src', '../img/帳表.png');
        $('body').addClass('bg-dark');
    } else {
        $('#accountImg').attr('src', '../img/帳表NoBarCode.png');
        $('body').removeClass('bg-dark');
    }
}