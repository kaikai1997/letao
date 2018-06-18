
//注册了全局事件，所有的ajax只要开始就会开启进度条
$(document).ajaxStart(function () { 
  NProgress.start();
 })
 $(document).ajaxStop(function () { 
   setTimeout(function () { 
      NProgress.done()
    },500);
  })
// 判断管理员是否登录，如果没有登录的话跳转到登录页面
if (location.href.indexOf('login.html') === -1) {
  $.ajax({
    type:'get',
    url:'/employee/checkRootLogin',
    success:function (info) {  
      console.log(info);
      if (info.error === 400){
        location.href = 'login.html';
      }
    },
  });
}



$('.classify').on('click', function () {
  $('.child').slideToggle(500);
});
$('.icon_menu').on('click',function () {
  $('.lt_main').toggleClass('now');
  $('.lt_aside').toggleClass('now');
});
$('.icon_logout').on('click',function () {
  $('#logoutModal').modal('show');
})
$('.btn_logout').on('click',function () {  
  $.ajax({
    type:'get',
    url:'/employee/employeeLogout',
    success:function (info) {  
      console.log(info);
      if (info.success){
        location.href = 'login.html';
      }
    },
    error:function (error) {  
      alert('退出失败');
    }
  });
})