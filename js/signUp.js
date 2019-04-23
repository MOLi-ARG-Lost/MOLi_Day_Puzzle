var app = (() => {
    var modules = {};

    function getHint() {
        alert('You have to looking for the clues in this page');
    }

    function slidePanel() {
        $('#errorPanel, #puzzleInfo').removeClass('d-block');
        $('#errorPanel, #puzzleInfo').addClass('d-none');
        $('#registerPanel, #registeInfo').removeClass('d-none');
        $('#registerPanel, #registeInfo').addClass('d-block');
    }

    modules.init = () => {
        console.log('init');
        $('#getHint').bind('click', getHint);
        $('#label-brain').bind('click', slidePanel);
    }

    return modules;
})();

console.log(app);