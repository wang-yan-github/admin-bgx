var loadAddress = 'http://bgx.lingser.cn/getbgxprojectlist?token=' + customSession.data.token;
var modalAuditFormAddress = 'http://bgx.lingser.cn/changebgxproject?token=' + customSession.data.token;
var modalDetailFormAddress = 'http://bgx.lingser.cn/getbgxprojectdetail?token=' + customSession.data.token;

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
                l_name:$('#l_name').val(),
                p_name:$('#p_name').val(),
                l_status:$('#l_status').val()
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
                field: 'l_name',
                title: '包工侠名称',
                align: 'center'
            },
            {
                field: 'c_name',
                title: '企业名称',
                align: 'center'
            },
            {
                field: 'p_name',
                title: '企业项目名称',
                align: 'center'
            },
            {
                field: 'p_status_text',
                title: '企业项目状态',
                align: 'center'
            },
            {
                field: 'la_status_text',
                title: '包工侠项目状态',
                align: 'center'
            },
            {
                title: "操作",
                align: 'center',
                valign: 'middle',
                formatter: function (value, row, index) {
                    var res = '<button class="btn btn-outline btn-primary btn-xs" onclick="getDetail(\'' + row.la_id + '\')">详情</button>';
                    if(row.p_status == 311){
                        res += '&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-outline btn-success btn-xs" onclick="getAudit(\'' + row.la_id + '\')">项目完工</button>';
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
// 加载查询下拉信息
$(function () {
    $.ajax({
        //几个参数需要注意一下
        type: "POST",// 方法类型
        dataType: "json",// 服务器返回的数据类型
        url: loadAddress,// url
        data: {'':''},
        success: function (data) {
            if(data.code == 200){
                // 初始查询下拉信息
                $('#l_status').append(new Option('',''));
                for(var i =0; i < data.data.types.length; i ++){
                    $('#l_status').append(new Option(data.data.types[i][1],data.data.types[i][0]));
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


// 获取审核
function getAudit(la_id){
    $.ajax({
        type:'post',
        url:modalDetailFormAddress,
        dataType:'json',
        data:{'la_id':la_id},
        success:function (data) {
            if(data.code == 200){
                // 赋值
                $('#formAudit [name=la_id]').val(la_id);
                _.each(_.pairs(data.data),function (value) {
                    $('#formAudit [name='+ value[0] +']').val('');
                    $('#formAudit [name='+ value[0] +']').val(value[1]);
                    if(value[0] == 'ht_url'){
                        $('#formAudit [name='+ value[0] +']').attr('src','');
                        $('#formAudit [name='+ value[0] +']').attr('src',value[1]);
                    }
                })
                $('#modal-audit-form').modal('show');
            }else{
                toastr.warning(data.msg);
            }
        },
        error:function (data) {
            swal('操作异常，请尝试刷新页面！',data.msg,'error');
        }
    })
}
// 审核成功
$(document).on('click', '#modal-audit-form [name=modal-audit-success-form]', function(){
    $('#formAudit [name=status]').val(1);
    $.ajax({
        type: "POST",
        dataType: "JSON",
        url: modalAuditFormAddress,
        data: $('#formAudit').serialize(),
        success: function (data) {
            if(data.code == 200){
                swal("操作成功!", "审核通过！", "success");
                $('#modal-audit-form').modal('hide');
                //重新加载数据
                $(".table").bootstrapTable('refresh', {url: loadAddress});
            }else {
                toastr.info(data.msg);
            }

        },
        error: function (data) {
            swal("操作异常，请刷新页面！", data.msg, "error");
        }
    });
});
// 审核失败
$(document).on('click', '#modal-audit-form [name=modal-audit-failure-form]', function(){
    $('#formAudit [name=status]').val(2);
    $.ajax({
        type: "POST",
        dataType: "JSON",
        url: modalAuditFormAddress,
        data: $('#formAudit').serialize(),
        success: function (data) {
            if(data.code == 200){
                swal("操作成功!", "审核不通过！", "success");
                $('#modal-audit-form').modal('hide');
                //重新加载数据
                $(".table").bootstrapTable('refresh', {url: loadAddress});
            }else{
                toastr.info(data.msg);
            }

        },
        error: function (data) {
            swal("操作异常，请刷新页面！", data.msg, "error");
        }
    });
});

// 详情
function getDetail(la_id) {
    $.ajax({
        type:'post',
        url:modalDetailFormAddress,
        dataType:'json',
        data:{'la_id':la_id},
        success:function (data) {
            if(data.code == 200){
                // 赋值
                _.each(_.pairs(data.data),function (value) {
                    $('#formDetail [name='+ value[0] +']').val('');
                    $('#formDetail [name='+ value[0] +']').val(value[1]);
                    if(value[0] == 'ht_url'){
                        $('#formDetail [name='+ value[0] +']').attr('src','');
                        $('#formDetail [name='+ value[0] +']').attr('src',value[1]);
                    }
                })
                $('#modal-detail-form').modal('show');
            }else{
                toastr.warning(data.msg);
            }
        },
        error:function (data) {
            swal('操作异常，请尝试刷新页面！',data.msg,'error');
        }
    })
}

// 查询
$(document).on('click', '#searchInfo', function(){
    $('.table').bootstrapTable('refresh');
});
// 重置
$(document).on('click', '#reset', function(){
    $('#l_name').val('');
    $('#p_name').val('');
    $('#l_status').val('');
    $('.table').bootstrapTable('refresh');
});