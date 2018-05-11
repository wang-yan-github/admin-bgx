$(function () {
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
    });
    $(".file-img").fileinput({
        'allowedFileExtensions' : ['jpg', 'png','gif'],
    });
})

