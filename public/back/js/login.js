$(function () {


  $('form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      username: {
        validators: {
          notEmpty: {
            message: '用户名不能为空',
          },
          callback: {
            message: '用户名不存在',
          },
          stringLength: {
            min: 4,
            max: 18,
            message: '用户名长度在4到18之间',
          },
          regexp: {
            regexp: /^[a-zA-Z0-9_\.]+$/,
            message: '用户名由数字字母下划线和.组成'
          }
        },
      },
      password: {
        validators: {

          notEmpty: {
            message: '用户密码不能为空',
          },
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度在6到12位之间'
          },
          callback: {
            message: '密码错误',
          },
        },
      },
    },
    
  });
  $('form').on('success.form.bv',function (e) { 
    e.preventDefault();
    $.ajax({
      type:'post',
      url:'/employee/employeeLogin',
      data:$('form').serialize(),
      success:function (info) { 
        console.log(info);
        if (info.success){
          location.href = 'index.html';
        }
        if (info.error === 1000){
          $('form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
        };
        if (info.error === 1001) {
          $('form').data('bootstrapValidator').updateStatus('password','INVALID','callback');
        }
       }
    });
   });


   $("[type='reset']").on("click", function () {

    //重置样式
    $('form').data("bootstrapValidator").resetForm();

  });


});
