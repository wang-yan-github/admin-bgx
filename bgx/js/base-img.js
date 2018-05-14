var loadAddress = 'https://bgx.lingser.cn/getadverlist?token=' + customSession.data.token;
var modalAddFormAddress = 'https://bgx.lingser.cn/addadver?token=' + customSession.data.token;
var modalEditFormAddress = 'https://bgx.lingser.cn/editadver?token=' + customSession.data.token;
var deleteAddress = 'https://bgx.lingser.cn/deleteadver?token=' + customSession.data.token;
var uploadAddress = 'https://bgx.lingser.cn/bgxuploadimage';

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
                field: 't_img',
                title: '图片类型',
                align: 'center'
            },
            {
                field: 'title',
                title: '标题',
                align: 'center'
            },
            {
                field: 'thumb_url',
                title: '图片',
                align: 'center',
                formatter:function (value,row,index) {
                    return '<img src="' + value + '" class="img-thumbnail img-sm">';
                }
            },
            {
                title: "操作",
                align: 'center',
                valign: 'middle',
                formatter: function (value, row, index) {
                    var res = '<button class="btn btn-outline btn-primary btn-xs" onclick="getDetail(\'' + row.id + '\',\'' + row.t_img + '\',\'' + row.title + '\',\'' + row.thumb_url+ '\',\'' + row.remark +'\')">详情</button>' +
                        '&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-outline btn-info btn-xs" onclick="getEdit(\'' + row.id + '\',\'' + row.t_img + '\',\'' + row.title + '\',\'' + row.url + '\',\'' + row.thumb_url+ '\',\'' + row.remark +'\')">修改</button>' +
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
                // 保存下拉列表
                for(var i = 0; i < data.data.types.length; i ++){
                    $('#formSave [name=t_img]').append(new Option(data.data.types[i].d_name,data.data.types[i].d_code));
                }

                // 修改下拉列表
                for(var i = 0; i < data.data.types.length; i ++){
                    $('#formEdit [name=t_img]').append(new Option(data.data.types[i].d_name,data.data.types[i].d_code));
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
    $('#formSave [name="t_img"]').find('option').each(function () {
        $(this).removeAttr('selected');
    });
    $('#formSave input[name="title"]').val('');
    $('#formSave input[name="imagename"]').val('');
    $('#formSave [name="thumburl"]').attr('src','');
    $('#formSave [name="remark"]').val('');
    $('#modal-add-form [name=modal-add-form]').attr('disabled',false);
    $('#modal-add-form').modal('show');
});
// 保存
$(document).on('click', '#modal-add-form [name=modal-add-form]', function(){
    $.ajax({
        //几个参数需要注意一下
        type: "POST",// 方法类型
        dataType: "json",// 服务器返回的数据类型
        url: modalAddFormAddress,// url
        data: $('#formSave').serialize(),
        success: function (data) {
            if(data.code == 200){
                // 清空数据
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
        }
    });
});

// 获取修改信息
function getEdit(id,t_img,title,url,thumb_url,remark) {
    $('#formEdit input[name="id"]').val('');
    $('#formEdit input[name="id"]').val(id);
    $('#formEdit [name="t_img"]').find('option').each(function () {
        $(this).removeAttr('selected');
    });
    $('#formEdit [name="t_img"]').find('option[value=\''+ t_img +'\']').attr('selected',true);
    $('#formEdit input[name="title"]').val('');
    $('#formEdit input[name="title"]').val(title);
    $('#formEdit input[name="imagename"]').val('');
    $('#formEdit input[name="imagename"]').val(url);
    $('#formEdit [name="thumburl"]').attr('src','');
    $('#formEdit [name="thumburl"]').attr('src',thumb_url);
    $('#formEdit [name="remark"]').val('');
    $('#formEdit [name="remark"]').val(remark);
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

// 详情
function getDetail(id,t_img,title,thumb_url,remark){
    $('#formDetail input[name="id"]').val('');
    $('#formDetail input[name="id"]').val(id);
    $('#formDetail [name="t_img"]').val(t_img);
    $('#formDetail input[name="title"]').val('');
    $('#formDetail input[name="title"]').val(title);
    $('#formDetail [name="img_url"]').attr('src','');
    $('#formDetail [name="img_url"]').attr('src',thumb_url);
    $('#formDetail [name="remark"]').val('');
    $('#formDetail [name="remark"]').val(remark);
    $('#modal-detail-form').modal('show');
}

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
                    if(data.code == 200){
                        swal("操作成功!", "已成功删除数据！", "success");
                        //重新加载数据
                        $(".table").bootstrapTable('refresh', {url: loadAddress});
                    }else{
                        swal("操作成功!", data.msg, "success");
                        //重新加载数据
                        $(".table").bootstrapTable('refresh', {url: loadAddress});
                    }
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

// 模拟点击事件
function fileClick(type){
    $('#formUpload [name=type]').val(type);
    // 点击上传
    $('#formUpload [name=image]').click();
}
// 图片上传事件
$(document).on('change', '#formUpload [name=image]', function(){
    if($('#formUpload [name=type]').val() == 'add-image'){
        $.ajax({
            url: uploadAddress,
            type: 'POST',
            cache: false,
            data: new FormData($('#formUpload')[0]),
            processData: false,
            contentType: false,
            success:function (data) {
                $('#formSave [name=imagename]').val(data.data.imagename);
                $('#formSave [name=thumburl]').attr('src',data.data.thumburl);
            }
        }).done(function (res) {
            toastr.info(res.msg);
        }).fail(function (res) {
        });
    }else if($('#formUpload [name=type]').val() == 'edit-image'){
        $.ajax({
            url: uploadAddress,
            type: 'POST',
            cache: false,
            data: new FormData($('#formUpload')[0]),
            processData: false,
            contentType: false,
            success:function (data) {
                $('#formEdit [name=imagename]').val(data.data.imagename);
                $('#formEdit [name=thumburl]').attr('src',data.data.thumburl);
            }
        }).done(function (res) {
            toastr.info(res.msg);
        }).fail(function (res) {
        });
    }
});