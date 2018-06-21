
mui('.lt_category_l .mui-scroll-wrapper').scroll({
  deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  scrollY: true, //是否竖向滚动
  scrollX: false, //是否横向滚动
  indicators: false, //是否显示滚动条
});
$.ajax({
  type:'get',
  url:'/category/queryTopCategory',
  success:function (info) { 

    var id = info.rows[0].id;
    // console.log(id);
    render(id)
    $('.lt_category_l ul').html(template('tpl',info))
   }
});

mui('.lt_category_r .mui-scroll-wrapper').scroll({
  deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  scrollY: true, //是否竖向滚动
  scrollX: false, //是否横向滚动
  indicators: false, //是否显示滚动条
});
$('.lt_category_l ul').on('click','li',function () { 
  // console.log('sss')
  var id = $(this).data('id');
  $(this).addClass('now').siblings().removeClass('now');
  render(id);
 })
 function render(id) { 
  $.ajax({
    type:'get',
    url:'/category/querySecondCategory',
    data:{
      id:id,
    },
    success:function (info) { 
      // console.log(info);
      $('.lt_category_r ul').html(template('tpl2',info));
     }
  })
  }