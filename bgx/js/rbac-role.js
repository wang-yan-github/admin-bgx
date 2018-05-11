var loadAddress = 'https://bgx.lingser.cn/addminrolelist?token=' + customSession.data.token;
var modalAddFormAddress = 'https://bgx.lingser.cn/addrole?token=' + customSession.data.token;
var modalEditFormAddress = 'https://bgx.lingser.cn/editrole?token=' + customSession.data.token;
var deleteAddress = 'https://bgx.lingser.cn/deleterole?token=' + customSession.data.token;
var modalGetRoleFormAddress = 'https://bgx.lingser.cn/getrolecate?token=' + customSession.data.token;
var modalUpdateRoleFormAddress = 'https://bgx.lingser.cn/roleauthmanager?token=' + customSession.data.token;

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
                rolecode:$('#rolecode').val(),
                rolename:$('#rolename').val()
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
                field: 'code',
                title: '角色编码',
                align: 'center'
            },
            {
                field: 'name',
                title: '角色名称',
                align: 'center'
            },
            {
                field: 'remark',
                title: '备注',
                align: 'center'
            },
            {
                field: 'operator',
                title: '创建人',
                align: 'center'
            },
            {
                field: 'create_time',
                title: '创建时间',
                align: 'center'
            },
            {
                title: "操作",
                align: 'center',
                valign: 'middle',
                formatter: function (value, row, index) {
                    var res = '<button class="btn btn-outline btn-info btn-xs" onclick="getEdit(\'' + row.id + '\',\'' + row.code + '\',\'' + row.name + '\',\'' + row.remark +'\')">修改</button>' +
                        '&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-outline btn-danger btn-xs" onclick="deleteById(\'' + row.id + '\')">删除</button>'+
                        '&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-outline btn-warning btn-xs" onclick="getTree(\'' + row.id + '\')">关系维护</button>';

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
                $('#modal-add-form').modal('hide');
                $('#modal-add-form [name=modal-add-form]').attr('disabled',true);
                $('#modal-add-form [name=code]').val();
                $('#modal-add-form [name=name]').val();
                $('#modal-add-form [name=remark]').val();
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
function getEdit(id,code,name,remark) {
    $('#formEdit input[name="id"]').val(id);
    $('#formEdit input[name="code"]').val(code);
    $('#formEdit input[name="name"]').val(name);
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
                $('#modal-edit-form').modal('hide');
                $('#modal-edit-form [name=modal-edit-form]').attr('disabled',true);
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
                data: {"r_id": id},
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

// 获取关系维护数据
function getTree(id){
    $('#modal-tree-form [name=modal-tree-form]').attr('disabled',false);
    $('#modal-tree-form input[name="r_id"]').val(id);
    $("#formTree").jstree({
        "core" : {
            "themes" : {
                "responsive": false
            },
            "data" :function (obj, callback) {
                var jsonstr="[]";
                $.ajax({
                    type: "POST",
                    dataType: "JSON",
                    //'./bgx/json/rbac-role.json'
                    url: modalGetRoleFormAddress,
                    data: {"id": id},
                    async: false,
                    success: function (data) {
                        jsonstr = data.data;
                    },
                    error: function (data) {
                        swal("操作异常，请刷新页面！", data.msg, "error");
                    }
                });
                callback.call(this, jsonstr);
            }
        },
        "types" : {
            "default" : {
                "icon" : "glyphicon glyphicon-flash"
            },
            "file" : {
                "icon" : "glyphicon glyphicon-ok"
            }
        },
        "plugins" : [ "themes","data","types","checkbox"],
    });
    $('#modal-tree-form').modal('show');
}
// 保存关系维护数据
$(document).on('click', '#modal-tree-form [name=modal-tree-form]', function(){
    var nodes  = $('#formTree').jstree('get_checked');
    var ref = $('#formTree').jstree(true);//获得整个树
    var sel = ref.get_selected(true); //获得所有选中节点，返回值为数组
    var r_id = $('#modal-tree-form input[name="r_id"]').val();
    $.ajax({
        type: "POST",
        dataType: "JSON",
        url: modalUpdateRoleFormAddress,
        data: {"r_id": r_id,"a_url":nodes},
        success: function (data) {
            if(data.code == 200){
                $('#modal-tree-form').modal('hide');
                $('#modal-tree-form [name=modal-tree-form]').attr('disabled',true);
                $("#formTree").jstree('destroy');
                swal("操作成功!", "已成功添加菜单数据！", "success");
                //重新加载数据
                $(".table").bootstrapTable('refresh', {url: loadAddress});
            }else{
                swal("操作异常，请刷新页面！", data.msg, "info");
            }

        },
        error: function (data) {
            swal("操作异常，请刷新页面！", data.msg, "error");
        }
    });
});

// 查询
$(document).on('click', '#searchInfo', function(){
    $('.table').bootstrapTable('refresh');
});
// 重置
$(document).on('click', '#reset', function(){
    $('#rolecode').val('');
    $('#rolename').val('');
    $('.table').bootstrapTable('refresh');
});