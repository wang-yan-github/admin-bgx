var loadAddress = 'https://bgx.lingser.cn/homebasciinfo?token=' + customSession.data.token;

// 加载
$(function () {
    $.ajax({
        //几个参数需要注意一下
        type: "post",// 方法类型
        data:{'':''},
        dataType: "json",// 服务器返回的数据类型
        url: loadAddress,// url
        success: function (data) {
            if(data.code == 200){

                // 查询下拉列表
            _.each(data.data,function (value) {
                $('#content').append(indexHtml(value));
            })

            }else{
                toastr.error(data.msg)
            }

        },
        error: function (data) {
            toastr.error(data.msg)
        }
    });
})

function indexHtml(value) {
    return '<div class="hr-line-dashed"></div>\n' +
        '       <div class="search-result">\n' +
        '           <h3>'+value+'</h3>\n' +
        '       </div>\n'+
        '   </div>';
}
