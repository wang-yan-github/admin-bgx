var loadAddress = 'http://bgx.lingser.cn/getmessagelist?token=' + customSession.data.token;
var modalAddFormAddress = 'http://bgx.lingser.cn/addcmmsg?token=' + customSession.data.token;
var modalEditFormAddress = 'http://bgx.lingser.cn/editcmmsg?token=' + customSession.data.token;
var deleteAddress = 'http://bgx.lingser.cn/deletecmmsg?token=' + customSession.data.token;

// 加载
$(function () {
    $('.table').bootstrapTable({
        method: 'post',
        contentType: "application/x-www-form-urlencoded",
        url: loadAddress,
        undefinedText: '',//当数据为 undefined 时显示的字符
        pagination:true,//是否分页
        queryParamsType:'limit',//查询参数组织方式
        sidePagination:'server',//指定服务器端分页
        pageNumber: 1, //初始化加载第一页，默认第一页
        pageSize:10,//单页记录数
        pageList: [10],
        paginationPreText: "上一页",
        paginationNextText: "下一页",
        queryParams : function (params) { //请求服务器时所传的参数
            //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            var temp = {
                pagecount: params.limit, //每页多少条数据
                page:(params.offset / params.limit) + 1,//页码
                code:$('#code').val(),
                title:$('#title').val()
            };
            return temp;
        },
        responseHandler: function (res) { // 格式化数据,res为从服务器请求到的数据
            if(res.code == 1004){
                swal(
                    {
                        title: "登陆过期，请重新登陆！",
                        text: "",
                        type: "warning",
                        showCancelButton: false,                //是否显示“取消”按钮。
                        cancelButtonText: "取消",            //按钮内容
                        cancelButtonColor: "#B9B9B9",

                        showConfirmButton: true,               //是否显示“确认”按钮。
                        confirmButtonColor: "#1ab394",
                        confirmButtonText: "确认",

                        closeOnConfirm: false,
                        closeOnCancel: true                //点击返回上一步操作
                    },
                    function () {
                        location.href = './login.html';
                    }
                );
            }
            return res.data;
        },
        columns: [
            {
                field: 'title',
                title: '标题',
                align: 'center'
            },
            {
                field: 'msg_name',
                title: '消息类型',
                align: 'center'
            },
            {
                field: 'operation',
                title: '发布人',
                align: 'center'
            },
            {
                field: 'create_time',
                title: '发布时间',
                align: 'center'
            },
            {
                title: "操作",
                align: 'center',
                valign: 'middle',
                formatter: function (value, row, index) {
                    var res = '<button class="btn btn-outline btn-info btn-xs" onclick="getEdit(\'' + row.id + '\',\'' + row.d_code + '\',\'' + row.title + '\',\'' + row.content +'\')">修改</button>' +
                        '&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-outline btn-danger btn-xs" onclick="deleteById(\'' + row.id + '\')">删除</button>';

                    return res;
                }
            }
        ],
        onLoadSuccess: function (res) {  //加载成功时执行
            console.info("加载数据成功");
        },
        onLoadError: function () {  //加载失败时执行
            console.info("加载数据失败");
        },
        locale: 'zh-CN',//中文支持,
    })
})
// 加载下拉信息
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
                $('#code').append(new Option('',''));
                for(var i = 0; i < data.data.types.length; i ++){
                    $('#code').append(new Option(data.data.types[i].d_name,data.data.types[i].d_code));
                }
                // 新增下拉列表
                for(var i = 0; i < data.data.types.length; i ++){
                    $('#formSave [name=msg_code]').append(new Option(data.data.types[i].d_name,data.data.types[i].d_code));
                }
                // 编辑下拉列表
                for(var i = 0; i < data.data.types.length; i ++){
                    $('#formEdit [name=msg_code]').append(new Option(data.data.types[i].d_name,data.data.types[i].d_code));
                }
            }else{
                toastr.error(data.msg)
            }

        },
        error: function (data) {
            toastr.error(data.msg)
        }
    });
})

// 获取保存
$(document).on('click', '#add', function(){
    $('#formSave [name="d_code"]').find("option").each(function (i) {
        $(this).removeAttr("selected");
    });
    $('#formSave input[name="title"]').val('');
    $('#formSave [name="content"]').val('');
    $('#modal-add-form [name=modal-add-form]').attr('disabled',false);
    $('#modal-add-form').modal('show');
})
// 保存
$(document).on('click', '#modal-add-form [name=modal-add-form]', function(){
    $('#modal-add-form [name=modal-add-form]').attr('disabled',true);
    $.ajax({
        //几个参数需要注意一下
        type: "POST",// 方法类型
        dataType: "json",// 服务器返回的数据类型
        url: modalAddFormAddress,// url
        data: $('#formSave').serialize(),
        success: function (data) {
            if(data.code == 200){
                $('#modal-add-form').modal('hide');
                $('#modal-add-form [name=modal-add-form]').attr('disabled',true);
                // 添加成功,重新刷新页面
                $(".table").bootstrapTable('refresh', {url: loadAddress});
            }else{
                toastr.error(data.msg)
            }

        },
        error: function (data) {
            toastr.error(data.msg)
        },
        complete:function () {
            $('#modal-add-form [name=modal-add-form]').attr('disabled',false);
        }
    });
});

// 获取修改信息
function getEdit(id,d_code,title,content) {
    $('#formEdit input[name="id"]').val('');
    $('#formEdit input[name="id"]').val(id);
    $('#formEdit [name="d_code"]').find("option").each(function (i) {
        $(this).removeAttr("selected");
    });
    $('#formEdit [name="d_code"]').find('option[value="' + d_code + '"]').attr("selected",true);;
    $('#formEdit input[name="title"]').val('');
    $('#formEdit input[name="title"]').val(title);
    $('#formEdit [name="content"]').val('');
    $('#formEdit [name="content"]').val(content);
    $('#modal-edit-form [name=modal-edit-form]').attr('disabled',false);
    $('#modal-edit-form').modal('show');
}
// 保存修改
$(document).on('click', '#modal-edit-form [name=modal-edit-form]', function(){
    $.ajax({
        //几个参数需要注意一下
        type: "POST",// 方法类型
        dataType: "json",// 服务器返回的数据类型
        url: modalEditFormAddress,// url
        data: $('#formEdit').serialize(),
        success: function (data) {
            if(data.code == 200){
                // 添加成功,重新刷新页面
                $('#modal-edit-form').modal('hide');
                $('#modal-edit-form [name=modal-edit-form]').attr('disabled',true);
                $(".table").bootstrapTable('refresh', {url: loadAddress});
            }else{
                toastr.error(data.msg)
            }
        },
        error: function (data) {
            toastr.error(data.msg);
        }
    });
});

//删除
function deleteById(id) {
    swal(
        {
            title: "是否删除？",
            text: "",
            type: "warning",
            showCancelButton: true,                //是否显示“取消”按钮。
            cancelButtonText: "取消",            //按钮内容
            cancelButtonColor: "#B9B9B9",

            showConfirmButton: true,               //是否显示“确认”按钮。
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确认",

            closeOnConfirm: false,
            closeOnCancel: true                //点击返回上一步操作
        },
        function () {
            $.ajax({
                type: "POST",
                dataType: "JSON",
                url: deleteAddress,
                data: {"id": id},
                success: function (data) {
                    swal("操作成功!", "已成功删除数据！", "success");
                    //重新加载数据
                    $(".table").bootstrapTable('refresh', {url: loadAddress});
                },
                error: function (data) {
                    swal("操作异常，请刷新页面！", data.msg, "error");
                }
            });
        }
    );
}

// 查询
$(document).on('click', '#searchInfo', function(){
    $('.table').bootstrapTable('refresh');
});
// 重置
$(document).on('click', '#reset', function(){
    $('#code').val('');
    $('#title').val('');
    $('.table').bootstrapTable('refresh');
});