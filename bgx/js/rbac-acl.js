var loadAddress = 'https://bgx.lingser.cn/adminrolemenu?token=' + customSession.data.token;
var modalAddFormAddress = 'https://bgx.lingser.cn/addmenu?token=' + customSession.data.token;
var modalLevelFormAddress = 'https://bgx.lingser.cn/addmenu?token=' + customSession.data.token;
var modalEditFormAddress = 'https://bgx.lingser.cn/editmenu?token=' + customSession.data.token;
var modalLevelEditFormAddress = 'https://bgx.lingser.cn/editmenu?token=' + customSession.data.token;
var deleteAddress = 'https://bgx.lingser.cn/deletemenu?token=' + customSession.data.token;

// 加载
$(function () {
    $('.table').bootstrapTable({
        method: 'post',
        contentType: "application/x-www-form-urlencoded",
        url: loadAddress,
        undefinedText: '',//当数据为 undefined 时显示的字符
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
                field: 'c_title',
                title: '菜单名称',
                formatter: function (value, row, index) {
                    if (row.pid != 0) {
                        value = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + value;
                    }
                    return value;
                },
                rowStyle: function (row, index) { //设置行的特殊样式
                    //这里有5个取值颜色['active', 'success', 'info', 'warning', 'danger'];
                    var strclass = "";
                    if (row.pid != 0) {
                        strclass = "warning";
                    }
                    return {classes: strclass}
                }
            },
            {
                field: 'c_url',
                title: '访问地址',
                align: 'center'
            },
            {
                field: 'c_sort',
                title: '排序权重',
                align: 'center'
            },
            {
                field: 'c_remark',
                title: '备注',
                align: 'center'
            },
            {
                title: "操作",
                align: 'center',
                valign: 'middle',
                formatter: function (value, row, index) {
                    var res = '';
                    if (row.pid == 0) {
                         res += '<button class="btn btn-outline btn-primary btn-xs" onclick="getLevel(\'' + row.id + '\',\'' + row.c_title + '\')">下级菜单</button>' +
                            '&nbsp;&nbsp;<button class="btn btn-outline btn-info btn-xs" onclick="getEdit(\'' + row.id + '\',\'' + row.c_title + '\',\'' + row.c_sort + '\',\'' + row.c_remark +'\')">修改</button>' +
                            '&nbsp;&nbsp;<button class="btn btn-outline btn-danger btn-xs" onclick="deleteById(\'' + row.id + '\')">删除</button>';
                    } else {
                        res += '<button class="btn btn-outline btn-info btn-xs" onclick="getLevelEdit(\'' + row.id + '\',\'' + row.pid + '\',\'' + row.c_title + '\',\'' + row.c_url + '\',\'' + row.c_sort + '\',\'' + row.c_remark +'\')">修改</button>'+
                            '&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-outline btn-danger btn-xs" onclick="deleteById(\'' + row.id + '\')">删除</button>';
                    }
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

// 获取保存
$(document).on('click', '#add', function(){
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
                $('#modal-add-form [name=c_title]').val('');
                $('#modal-add-form [name=c_sort]').val('');
                $('#modal-add-form [name=c_remark]').val('');
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

// 获取父级菜单
function getLevel(id,title) {
    $('#formLevel input[name="pid"]').val(id);
    $('#formLevel input[name="pidValue"]').val(title);
    $('#modal-level-form [name=modal-level-form]').attr('disabled',false);
    $('#modal-level-form').modal('show');
}
// 下级菜单保存
$(document).on('click', '#modal-level-form [name=modal-level-form]', function(){
    $.ajax({
        //几个参数需要注意一下
        type: "POST",// 方法类型
        dataType: "json",// 服务器返回的数据类型
        url: modalLevelFormAddress,// url
        data: $('#formLevel').serialize(),
        success: function (data) {
            if(data.code == 200){
                // 清空数据
                $('#modal-level-form').modal('hide');
                $('#modal-level-form [name=modal-level-form]').attr('disabled',true);
                $('#modal-level-form [name=c_title]').val('');
                $('#modal-level-form [name=c_url]').val('');
                $('#modal-level-form [name=c_sort]').val('');
                $('#modal-level-form [name=c_remark]').val('');
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
function getEdit(id,c_title,c_sort,c_remark) {
    $('#formEdit input[name="id"]').val('');
    $('#formEdit input[name="id"]').val(id);
    $('#formEdit input[name="c_title"]').val('');
    $('#formEdit input[name="c_title"]').val(c_title);
    $('#formEdit input[name="c_sort"]').val('');
    $('#formEdit input[name="c_sort"]').val(c_sort);
    $('#formEdit [name="c_remark"]').val('');
    $('#formEdit [name="c_remark"]').val(c_remark);
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
                //清空数据
                $('#modal-edit-form').modal('hide');
                $('#modal-edit-form [name=modal-edit-form]').attr('disabled',true);
                $('#modal-edit-form [name=id]').val();
                $('#modal-edit-form [name=c_title]').val();
                $('#modal-edit-form [name=c_sort]').val();
                $('#modal-edit-form [name=c_remark]').val();
                // 添加成功,重新刷新页面
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

// 获取下级菜单修改
function getLevelEdit(id,pid,c_title,c_url,c_sort,c_remark) {
    $('#formLevelEdit input[name="id"]').val(id);
    $('#formLevelEdit input[name="pid"]').val(pid);
    $('#formLevelEdit input[name="c_title"]').val(c_title);
    $('#formLevelEdit input[name="c_url"]').val(c_url);
    $('#formLevelEdit input[name="c_sort"]').val(c_sort);
    $('#formLevelEdit [name="c_remark"]').val(c_remark);
    $('#modal-level-edit-form [name=modal-level-edit-form]').attr('disabled',false);
    $('#modal-level-edit-form').modal('show');
}
// 保存下级菜单修改
$(document).on('click', '#modal-level-edit-form [name=modal-level-edit-form]', function(){
    $.ajax({
        //几个参数需要注意一下
        type: "POST",// 方法类型
        dataType: "json",// 服务器返回的数据类型
        url: modalLevelEditFormAddress,// url
        data: $('#formLevelEdit').serialize(),
        success: function (data) {
            if(data.code == 200){
                // 清空数据
                $('#modal-level-edit-form').modal('hide');
                $('#modal-level-edit-form [name=modal-level-edit-form]').attr('disabled',true);
                $('#modal-level-edit-form [name=id]').val();
                $('#modal-level-edit-form [name=pid]').val();
                $('#modal-level-edit-form [name=c_title]').val();
                $('#modal-level-edit-form [name=c_url]').val();
                $('#modal-level-edit-form [name=c_sort]').val();
                $('#modal-level-edit-form [name=c_remark]').val();
                // 添加成功,重新刷新页面
                $(".table").bootstrapTable('refresh', {url: loadAddress});
            }else{
                toastr.error(data.msg)
            }
        },
        error: function (data) {
            toastr.error(data.msg);
        },
        complete:function () {

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
                    if(data.code == 200){
                        swal("操作成功!", "已成功删除数据！", "success");
                        //重新加载数据
                        $(".table").bootstrapTable('refresh', {url: loadAddress});
                    }else{
                        swal('操作异常，请尝试刷新页面！',data.msg,'info');
                    }
                },
                error: function (data) {
                    swal("操作异常，请刷新页面！", data.msg, "error");
                }
            });
        }
    );
}

