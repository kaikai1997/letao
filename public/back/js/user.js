


$(function () {
  var page = 1;
  var pageSize = 5;
  render()
  function render() {
    $.ajax({
      type: "get",
      url: '/user/queryUser',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        var html = template('tpl', info)
        $('tbody').html(html);
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3, //指定bootstrap的版本
          currentPage: page,//指定当前页数
          totalPages: Math.ceil(info.total / info.size),//设置总页数
          size: 'small',
          onPageClicked: function (a, b, c, p) {
            page = p;
            render()
          }
        });
      },
    });
  };

//启动启用禁用功能
$('tbody').on('click','.btn',function () { 
  
  $("#userModal").modal("show");
  var id = $(this).parent().data('id');

  var isDelete = $(this).hasClass('btn-success')? 1 : 0;

   $('.btn_confirm').on('click',function () { 
     $.ajax({
        type:'post',
        url:'/user/updateUser',
        data:{
          id:id,
          isDelete:isDelete,
        },
        success:function (info) { 
          // console.log(info);
          if (info.success) {
            $('#userModal').modal('hide');
            render();
          }
         }
     });
    });
 });


});