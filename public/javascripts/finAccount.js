function changeImg(clicked) {
    if (clicked == 'moon') {
        $('#accountImg').attr('src', '/images/帳表.png');
        $('body').addClass('bg-dark');
    } else {
        $('#accountImg').attr('src', '/images/帳表NoBarCode.png');
        $('body').removeClass('bg-dark');
    }
}