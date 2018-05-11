var loadAddress = 'http://bgx.lingser.cn/auditlist?token=' + customSession.data.token;

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
                name:$('#name').val(),
                type:$('#type').val()
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
                field: 'type_text',
                title: '审核类型',
                align: 'center'
            },
            {
                field: 'start_time',
                title: '提交审核时间',
                align: 'center'
            },
            {
                field: 'reviewer_time',
                title: '审核时间',
                align: 'center'
            },
            {
                field: 'reviewer',
                title: '审核人员',
                align: 'center'
            },
            {
                field: 're_content',
                title: '审核内容',
                align: 'center'
            },
            {
                field: 'status',
                title: '审核意见',
                align: 'center',
                formatter:function (value) {
                    if (value == 1){
                        return '通过';
                    } else {
                        return '不通过';
                    }
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
$(function () {
    $.ajax({
        type:'post',
        url:loadAddress,
        dataType:'json',
        data:{'':''},
        success:function (data) {
            if(data.code == 200){
                // 赋值
                $('#type').html('');
                $('#type').append('<option value=""></option>>');
                for(var i = 0; i < data.data.types.length; i ++){
                    $('#type').append('<option value="'+ data.data.types[i][0] +'">'+ data.data.types[i][1] +'</option>>');
                }
            }else{
                toastr.warning(data.msg);
            }
        },
        error:function (data) {
            swal('操作异常，请尝试刷新页面！',data.msg,'error');
        }
    })
})

// 查询
$(document).on('click', '#searchInfo', function(){
    $('.table').bootstrapTable('refresh');
});
// 重置
$(document).on('click', '#reset', function(){
    $('#name').val('');
    $('#type').val('');
    $('.table').bootstrapTable('refresh');
});