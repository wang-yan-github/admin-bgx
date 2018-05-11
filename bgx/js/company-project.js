var loadAddress = 'https://bgx.lingser.cn/getporjectlist?token=' + customSession.data.token;
var modalDetailFormAddress = 'https://bgx.lingser.cn/getcomprojectdetail?token=' + customSession.data.token;
var modalAuditFormAddress = 'https://bgx.lingser.cn/auditproject?token=' + customSession.data.token;
var modalManagerFormAddress = 'https://bgx.lingser.cn/managercomproject?token=' + customSession.data.token;
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
                c_name:$('#c_name').val(),
                p_name:$('#p_name').val(),
                code:$('#code').val()
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
                field: 'c_name',
                title: '公司名称',
                align: 'center'
            },
            {
                field: 'p_name',
                title: '项目名称',
                align: 'center'
            },
            {
                field: 'p_type',
                title: '项目类型',
                align: 'center'
            },
            {
                field: 'status_text',
                title: '项目状态',
                align: 'center'
            },
            {
                title: "操作",
                align: 'center',
                formatter: function (value, row, index) {
                    var res = '<button class="btn btn-outline btn-primary btn-xs" onclick="getDetail(\'' + row.p_id + '\')">详情</button>';
                    if(row.p_status == 202){
                        res += '&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-outline btn-success btn-xs" onclick="getAudit(\'' + row.p_id  +'\')">审核</button>';
                    }
                    if(row.p_status == 207){
                        seqB = true;
                        '&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-outline btn-danger btn-xs" onclick="getManager(\'' + row.p_id + '\')">项目完工</button>';
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
                $('#code').append(new Option('',''));
                for(var i =0; i < data.data.types.length; i ++){
                    $('#code').append(new Option(data.data.types[i].d_name,data.data.types[i].d_code));
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

// 获取详情
function getDetail(p_id){
    $.ajax({
        type:'post',
        dataType:'json',
        url:modalDetailFormAddress,
        data:{'p_id':p_id},
        success:function (data) {
            // 赋值数据
            $('#formDetail input[name=p_id]').val(data.data.p_id);
            $('#formDetail input[name=p_type]').val(data.data.p_type);
            $('#formDetail input[name=p_name]').val(data.data.p_name);
            $('#formDetail input[name=p_name]').val(data.data.p_name);
            $('#formDetail input[name=start_time]').val(data.data.start_time);
            $('#formDetail input[name=end_time]').val(data.data.end_time);
            $('#formDetail input[name=p_province]').val(data.data.p_province);
            $('#formDetail input[name=p_city]').val(data.data.p_city);
            $('#formDetail input[name=p_column_price]').val(data.data.p_column_price);
            $('#formDetail input[name=p_provepeople]').val(data.data.p_provepeople);
            $('#formDetail input[name=p_provephone]').val(data.data.p_provephone);
            $('#formDetail [name=p_remark]').val(data.data.p_remark);
            $('#modal-detail-form').modal('show');
        },
        error:function (data) {
            toastr.error(data.msg);
        }
    })
}

// 获取审核信息
function getAudit(p_id){
    $.ajax({
        type:'post',
        dataType:'json',
        url:modalDetailFormAddress,
        data:{'p_id':p_id},
        success:function (data) {
            // 赋值数据
            $('#formAudit').find('input').val('');
            $('#formAudit input[name=p_id]').val(data.data.p_id);
            $('#formAudit input[name=p_type]').val(data.data.p_type);
            $('#formAudit input[name=p_name]').val(data.data.p_name);
            $('#formAudit input[name=p_name]').val(data.data.p_name);
            $('#formAudit input[name=start_time]').val(data.data.start_time);
            $('#formAudit input[name=end_time]').val(data.data.end_time);
            $('#formAudit input[name=p_province]').val(data.data.p_province);
            $('#formAudit input[name=p_city]').val(data.data.p_city);
            $('#formAudit input[name=p_column_price]').val(data.data.p_column_price);
            $('#formAudit input[name=p_provepeople]').val(data.data.p_provepeople);
            $('#formAudit input[name=p_provephone]').val(data.data.p_provephone);
            $('#formAudit [name=p_remark]').val(data.data.p_remark);
            $('#formAudit [name=re_content]').val(data.data.re_content);
            $('#modal-audit-form [name=modal-audit-success-form]').attr('disabled',false);
            $('#modal-audit-form [name=modal-audit-failure-form]').attr('disabled',false);
            $('#modal-audit-form').modal('show');
        },
        error:function (data) {
            toastr.error(data.msg);
        }
    })
}
// 审核同意
$(document).on('click', '#modal-audit-form [name=modal-audit-success-form]', function(){
    $('#modal-audit-form [name=status]').val(1);
    $.ajax({
        url:modalAuditFormAddress,
        dataType:'json',
        data:$('#formAudit').serialize(),
        success:function (data) {
            if(data.code == 200){
                swal('操作成功','审核通过','success');
                $('#modal-audit-form').modal('hide');
                $('#modal-audit-form [name=modal-audit-success-form]').attr('disabled',true);
                $(".table").bootstrapTable('refresh', {url: loadAddress});
            }else {
                toastr.warning(data.msg);
            }
        },
        error:function (data) {
            swal('操作异常，请尝试刷新页面！',data.msg,'error');
        }
    })
});
// 审核不同意
$(document).on('click', '#modal-audit-form [name=modal-audit-failure-form]', function(){
    $('#modal-audit-form [name=status]').val(2);
    $.ajax({
        url:modalAuditFormAddress,
        dataType:'json',
        data:$('#formAudit').serialize(),
        success:function (data) {
            if(data.code == 200){
                swal('操作成功','审核不通过','warning');
                $('#modal-audit-form').modal('hide');
                $('#modal-audit-form [name=modal-audit-failure-form]').attr('disabled',true);
                $(".table").bootstrapTable('refresh', {url: loadAddress});
            }else {
                toastr.warning(data.msg);
            }
        },
        error:function (data) {
            swal('操作异常，请尝试刷新页面！',data.msg,'error');
        }
    })
});

// 获取项目完工信息
function getManager(p_id){
    $('#formManager [name=re_content]').val('');
    $.ajax({
        type:'post',
        dataType:'json',
        url:modalDetailFormAddress,
        data:{'p_id':p_id},
        success:function (data) {
            // 赋值数据
            _.each(_.pairs(data.data),function (value) {
                $('#formManager [name='+ value[0] +']').val('');
                $('#formManager [name='+ value[0] +']').val(value[1]);
            });
            $('#modal-manager-form [name=modal-manager-success-form]').attr('disabled',false);
            $('#modal-manager-form [name=modal-manager-failure-form]').attr('disabled',false);
            $('#modal-manager-form').modal('show');
        },
        error:function (data) {
            toastr.error(data.msg);
        }
    })
};
// 项目完工同意
$(document).on('click', '#modal-manager-form [name=modal-manager-success-form]', function(){
    $('#modal-manager-form [name=status]').val(1);
    $.ajax({
        url:modalAuditFormAddress,
        dataType:'json',
        data:$('#formManager').serialize(),
        success:function (data) {
            if(data.code == 200){
                swal('操作成功','项目完工同意','success');
                $('#modal-manager-form').modal('hide');
                $('#modal-manager-form [name=modal-manager-success-form]').attr('disabled',true);
                $(".table").bootstrapTable('refresh', {url: loadAddress});
            }else {
                toastr.warning(data.msg);
            }
        },
        error:function (data) {
            swal('操作异常，请尝试刷新页面！',data.msg,'error');
        }
    })
});
// 项目完工不同意
$(document).on('click', '#modal-manager-form [name=modal-manager-failure-form]', function(){
    $('#modal-manager-form [name=status]').val(2);
    $.ajax({
        url:modalAuditFormAddress,
        dataType:'json',
        data:$('#formManager').serialize(),
        success:function (data) {
            if(data.code == 200){
                swal('操作成功','项目完工不同意','warning');
                $('#modal-manager-form').modal('hide');
                $('#modal-manager-form [name=modal-manager-failure-form]').attr('disabled',true);
                $(".table").bootstrapTable('refresh', {url: loadAddress});
            }else {
                toastr.warning(data.msg);
            }
        },
        error:function (data) {
            swal('操作异常，请尝试刷新页面！',data.msg,'error');
        }
    })
});

// 查询
$(document).on('click', '#searchInfo', function(){
    $('.table').bootstrapTable('refresh');
});
// 重置
$(document).on('click', '#reset', function(){
    $('#c_name').val('');
    $('#p_name').val('');
    $('#code').val('');
    $('.table').bootstrapTable('refresh');
});