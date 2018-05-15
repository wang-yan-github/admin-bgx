var loadAddress = costomUrl + 'getbgxlist?token=' + customSession.data.token;
var modalDetailFormAddress = costomUrl + 'getbgxdetail?token=' + customSession.data.token;
var modalAuditFormAddress = costomUrl + 'auditbgx?token=' + customSession.data.token;

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
                l_tel:$('#l_tel').val()
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
                title: '姓名',
                align: 'center'
            },
            {
                field: 'l_tel',
                title: '电话',
                align: 'center'
            },
            {
                field: 'l_achi',
                title: '业绩',
                align: 'center'
            },
            {
                field: 'l_money',
                title: '涉及金额',
                align: 'center'
            },
            {
                field: 'l_creditrating',
                title: '信用等级',
                align: 'center'
            },
            {
                field: 'status_text',
                title: '状态',
                align: 'center'
            },
            {
                title: "操作",
                align: 'center',
                formatter: function (value, row, index) {
                    var res = '<button class="btn btn-outline btn-info btn-xs" onclick="getDetail(\'' + row.l_id + '\')">详情</button>';
                    if(row.l_status == 101){
                        res += '&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-outline btn-success btn-xs" onclick="getAudit(\'' + row.l_id + '\')">审核</button>'
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

// 获取审核
function getAudit(l_id){
    $('#formAudit [name=re_content]').val('');
    $.ajax({
        type:'post',
        url:modalDetailFormAddress,
        dataType:'json',
        data:{'l_id':l_id},
        success:function (data) {
            if(data.code == 200){
                _.each(_.pairs(data.data),function (value) {
                    $('#formAudit [name='+ value[0] +']').val('');
                    $('#formAudit [name='+ value[0] +']').val(value[1]);
                    if(value[0] == 'l_head_url'){
                        $('#formAudit [name='+ value[0] +']').attr('src','');
                        $('#formAudit [name='+ value[0] +']').attr('src',value[1]);
                    }
                });
                $('#accordion-audit').html('');
                _.each(_.values(data.data.yj),function (value,index) {
                    htmlyj(value,index+1,'accordion-audit');
                });
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
function getDetail(l_id) {
    $.ajax({
        type:'post',
        url:modalDetailFormAddress,
        dataType:'json',
        data:{'l_id':l_id},
        success:function (data) {
            if(data.code == 200){
                _.each(_.pairs(data.data),function (value) {
                    $('#formDetail [name='+ value[0] +']').val('');
                    $('#formDetail [name='+ value[0] +']').val(value[1]);
                    if(value[0] == 'l_head_url'){
                        $('#formDetail [name='+ value[0] +']').attr('src','');
                        $('#formDetail [name='+ value[0] +']').attr('src',value[1]);
                    }
                });
                $('#accordion-detail').html('');
                _.each(_.values(data.data.yj),function (value,index) {
                    htmlyj(value,index+1,'accordion-detail');
                });
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
    $('#l_tel').val('');
    $('.table').bootstrapTable('refresh');
});

function htmlyj(value,index,parent) {
    var html = '                   <div class="panel panel-default">\n' +
        '                            <div class="panel-heading">\n' +
        '                                <h5 class="panel-title">\n' +
        '                                    <a data-toggle="collapse" data-parent="#' + parent + '" href="#collapse' + index + '"><i class="fa fa-info-circle">&nbsp;&nbsp;&nbsp;&nbsp;包工侠项目业绩 ' + index + '</i></a>\n' +
        '                                </h5>\n' +
        '                            </div>\n' +
        '                            <div id="collapse' + index + '" class="panel-collapse collapse">\n' +
        '                                <div class="panel-body">\n' +
        '                                    <div class="form-group">\n' +
        '                                        <label class="control-label">项目名称</label>\n' +
        '                                        <input type="text" class="form-control"\n' +
        '                                               disabled="disabled" value="'+ value.p_name +'">\n' +
        '                                    </div>\n' +
        '                                    <div class="form-group">\n' +
        '                                        <label class="control-label">施工地址</label>\n' +
        '                                        <input type="text" class="form-control"\n' +
        '                                               disabled="disabled" value="' + value.p_addr + '">\n' +
        '                                    </div>\n' +
        '                                    <div class="form-group">\n' +
        '                                        <label class="control-label">分包单位</label>\n' +
        '                                        <input type="text" class="form-control"\n' +
        '                                               disabled="disabled" value="' + value.p_contract_com + '">\n' +
        '                                    </div>\n' +
        '                                    <div class="form-group">\n' +
        '                                        <label class="control-label">证明人</label>\n' +
        '                                        <input type="text" class="form-control"\n' +
        '                                               disabled="disabled" value="' + value.p_provepeople + '">\n' +
        '                                    </div>\n' +
        '                                    <div class="form-group">\n' +
        '                                        <label class="control-label">联系电话</label>\n' +
        '                                        <input type="text" class="form-control"\n' +
        '                                               disabled="disabled" value="' + value.p_provephone + '">\n' +
        '                                    </div>\n' +
        '                                    <div class="form-group">\n' +
        '                                        <label class="control-label">劳动合同</label>\n' +
        '                                        <img class="img-responsive" src="' + value.ht_url + '">\n' +
        '                                    </div>\n' +
        '                                    <div class="form-group">\n' +
        '                                        <label class="control-label">施工内容</label>\n' +
        '                                        <textarea rows="3" class="form-control"\n' +
        '                                                  disabled="disabled">' + value.p_remark + '</textarea>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                        </div>';
    $('#' + parent + '').append(html);
}