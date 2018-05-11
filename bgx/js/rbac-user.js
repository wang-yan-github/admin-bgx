var loadAddress = 'https://bgx.lingser.cn/adminuserlist?token=' + customSession.data.token;
var modalAddFormAddress = 'https://bgx.lingser.cn/adminadduser?token=' + customSession.data.token;
var modalEditFormAddress = 'https://bgx.lingser.cn/adminedituser?token=' + customSession.data.token;
var startByIdAddress = 'https://bgx.lingser.cn/adminchangeuser?token=' + customSession.data.token;
var endByIdAddress = 'https://bgx.lingser.cn/adminchangeuser?token=' + customSession.data.token;
var resetByIdAddress = 'https://bgx.lingser.cn/adminrestuser?token=' + customSession.data.token;
var modalGetRoleFormAdddress = 'https://bgx.lingser.cn/getroles?token=' + customSession.data.token;
var modalAddRoleFormAdddress = 'https://bgx.lingser.cn/roleuser?token=' + customSession.data.token;

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
                account:$('#account').val(),
                username:$('#username').val()
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
                field: 'account',
                title: '登录帐号',
                align: 'center'
            },
            {
                field: 'username',
                title: '用户姓名',
                align: 'center'
            },
            {
                field: 'sex',
                title: '性别',
                align: 'center',
                formatter:function (value,row,index) {
                    if(row.sex == 1){
                        return "男";
                    }else{
                        return "女";
                    }
                }
            },
            {
                field: 'telephone',
                title: '手机号',
                align: 'center'
            },
            {
                field: 'status',
                title: '状态',
                align: 'center',
                formatter:function (value,row,index) {
                    if(row.status == 1){
                        return "启动";
                    }else{
                        return "禁用";
                    }
                }
            },
            {
                field: 'r_name',
                title: '关联角色',
                align: 'center',
            },
            {
                title: "操作",
                align: 'center',
                valign: 'middle',
                formatter: function (value, row, index) {
                    var res;
                    if(row.status == 1){
                        res = '<button class="btn btn-outline btn-info btn-xs" onclick="getEdit(\'' + row.id + '\',\'' + row.username + '\',\'' + row.sex + '\',\'' + row.birthday + '\',\'' + row.telephone + '\',\'' + row.address + '\',\'' + row.mail + '\',\'' + row.remark +'\')">修改</button>' +
                            '&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-outline btn-primary btn-xs" onclick="startById(\'' + row.id + '\',\'' + 2 + '\')" )">禁用</button>'+
                            '&nbsp;&nbsp;&nbsp;&nbsp<button class="btn btn-outline btn-warning btn-xs" onclick="getRole(\'' + row.id + '\',\'' + row.account + '\',\'' + row.username + '\',\'' + row.telephone + '\',\'' + row.mail + '\',\'' + row.role_id +'\')">角色关联</button>' +
                            '&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-outline btn-danger btn-xs" onclick="resetById(\'' +row.id + '\')">重置密码</button>';
                    }else{
                        res = '<button class="btn btn-outline btn-info btn-xs" onclick="getEdit(\'' + row.id + '\',\'' + row.username + '\',\'' + row.sex + '\',\'' + row.birthday + '\',\'' + row.telephone + '\',\'' + row.address + '\',\'' + row.mail + '\',\'' + row.remark +'\')">修改</button>' +
                            '&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-outline btn-primary btn-xs" onclick="endById(\'' + row.id + '\',\'' + 1 + '\')" )">启动</button>'+
                            '&nbsp;&nbsp;&nbsp;&nbsp<button class="btn btn-outline btn-warning btn-xs" onclick="getRole(\'' + row.id + '\',\'' + row.account + '\',\'' + row.username + '\',\'' + row.telephone + '\',\'' + row.mail + '\',\'' + row.role_id +'\')">角色关联</button>' +
                            '&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-outline btn-danger btn-xs" onclick="resetById(\'' + row.id + '\')">重置密码</button>';
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
// 加载角色下拉
$(function () {
    $.ajax({
        //几个参数需要注意一下
        type: "get",// 方法类型
        dataType: "json",// 服务器返回的数据类型
        url: modalGetRoleFormAdddress,// url
        success: function (data) {
            if(data.code == 200){
                _.each(data.data,function (value) {
                    $('#formRole [name=r_id]').append('<option value="'+ value.id +'">'+ value.name +'</option>')
                })
            }else{
                toastr.error(data.msg)
            }

        },
        error: function (data) {
            toastr.error(data.msg)
        },

    });
})

// 获取保存
$(document).on('click', '#add', function(){
    $('#modal-add-form').modal('show');
    $('#modal-add-form [name=modal-add-form]').attr('disabled',false);
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
                $('#modal-add-form input[name=account]').val('');
                $('#modal-add-form input[name=password]').val('');
                $('#modal-add-form input[name=username]').val('');
                $('#modal-add-form input[name=sex]:first').iCheck('check');
                $('#modal-add-form input[name=birthday]').val('');
                $('#modal-add-form input[name=telephone]').val('');
                $('#modal-add-form input[name=address]').val('');
                $('#modal-add-form input[name=mail]').val('');
                $('#modal-add-form [name=remark]').val('');
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
function getEdit(id,username,sex,birthday,telephone,address,mail,remark) {
    $('#formEdit input[name="uid"]').val(id);
    $('#formEdit input[name="username"]').val(username);

    if(sex == 1){
        $('#formEdit input[name="sex"]:first').iCheck('check');
    }else{
        $('#formEdit input[name="sex"]:last').iCheck('check');
    }

    if(birthday == 'undefined'){
        $('#formEdit input[name="birthday"]').val('');
    }else{
        $('#formEdit input[name="birthday"]').val(birthday);
    }

    $('#formEdit input[name="telephone"]').val(telephone);
    $('#formEdit input[name="address"]').val(address);
    $('#formEdit input[name="mail"]').val(mail);
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
                // 清空数据
                $('#modal-edit-form').modal('hide');
                $('#modal-edit-form [name=modal-edit-form]').attr('disabled',true);
                $('#formEdit input[name="uid"]').val('');
                $('#formEdit input[name="username"]').val('');
                $('#formEdit input[name="sex"]:first').iCheck('check');
                $('#formEdit input[name="birthday"]').val('');
                $('#formEdit input[name="telephone"]').val('');
                $('#formEdit input[name="address"]').val('');
                $('#formEdit input[name="mail"]').val('');
                $('#formEdit [name="remake"]').val('');
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

//启动
function startById(id,status) {
    swal(
        {
            title: "是否启用？",
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
                url: startByIdAddress,
                data: {"uid": id,"status":status},
                success: function (data) {
                    swal("操作成功!", "已成功启用数据！", "success");
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
//禁用
function endById(id,status) {
    swal(
        {
            title: "是否禁用？",
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
                url: endByIdAddress,
                data: {"uid": id,"status":status},
                success: function (data) {
                    swal("操作成功!", "已成功禁用数据！", "success");
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

//重置密码
function resetById(id) {
    swal(
        {
            title: "是否重置密码？",
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
                url: resetByIdAddress,
                data: {"uid": id},
                success: function (data) {
                    swal("操作成功!",data.data.r_pwd, "success");
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

// 获取角色关联
function getRole(id,account,username,telephone,mail,r_id){
    $('#formRole [name=uid]').val('');
    $('#formRole [name=uid]').val(id);
    $('#formRole [name=account]').val('');
    $('#formRole [name=account]').val(account);
    $('#formRole [name=username]').val('');
    $('#formRole [name=username]').val(username);
    $('#formRole [name=telephone]').val('');
    $('#formRole [name=telephone]').val(telephone);
    $('#formRole [name=mail]').val('');
    $('#formRole [name=mail]').val(mail);
    $('#formRole [name="r_id"]').find("option").each(function (i) {
        $(this).removeAttr("selected");
    });
    $('#formRole [name="r_id"]').find('option[value=\''+ r_id +'\']').attr('selected',true);
    $('#modal-role-form [name=modal-role-form]').attr('disabled',false);
    $('#modal-role-form').modal('show');
}
// 保存角色关联
$(document).on('click', '#modal-role-form [name=modal-role-form]', function(){
    $.ajax({
        //几个参数需要注意一下
        type: "POST",// 方法类型
        dataType: "json",// 服务器返回的数据类型
        url: modalAddRoleFormAdddress,// url
        data: $('#formRole').serialize(),
        success: function (data) {
            if(data.code == 200){
                $('#modal-role-form').modal('hide');
                $('#modal-role-form [name=modal-role-form]').attr('disabled',true);
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

// 查询
$(document).on('click', '#searchInfo', function(){
    $('.table').bootstrapTable('refresh');
});
// 重置
$(document).on('click', '#reset', function(){
    $('#account').val('');
    $('#username').val('');
    $('.table').bootstrapTable('refresh');
});

