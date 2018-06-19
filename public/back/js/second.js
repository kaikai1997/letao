$(function () {
  var page = 1;
  var pageSize = 5;
  render();
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: page,
        pageSize: pageSize,
      },
      success: function (info) {

        $('tbody').html(template('tpl', info));
        $('#pagintor').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currenPage: page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (a, b, c, p) {
            page = p;
            render();
          }
        });
        $('.btn_add').on('click', function () {
          $('#addModal').modal('show');
          var page = 1;
          var pageSize = 100;
          $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
              page: page,
              pageSize: pageSize,
            },
            success: function (info) {

              $('.dropdown-menu').html(template('tpl2', info));
            }
          });
        });

        $('.dropdown-menu').on('click', 'a', function () {
          var txt = $(this).text();
          $('.dropdown_text').text(txt)
          var id = $(this).data('id');
          $('[name="categoryId"]').val(id);
          $('form').data('bootstrapValidator').updateStatus('categoryId', 'VALID');
        });


        $('#fileupload').fileupload({
          dataType: 'json',
          done: function (e, data) {

            $('.img_box img').attr('src', data.result.picAddr);


            $('[name="brandLogo"]').val(data.result.picAddr);

            $('form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID');

          },
        });

        $('form').bootstrapValidator({
          excluded: [],
          feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },
          fields: {
            categoryId: {
              validators: {
                notEmpty: {
                  message: '清选择一级分类'
                }
              }
            },

            categoryName: {
              validators: {
                notEmpty: {
                  message: '请输入二级分类名'
                }
              }
            },

            brandLogo: {
              validators: {
                notEmpty: {
                  message: '请上传二级分类的图片'
                }
              }
            }
          },
        });

        $("form").on('success.form.bv', function (e) {
          e.preventDefault();
          $.ajax({
            type: 'post',
            url: '/category/addSecondCategory',
            data: $('form').serialize(),
            success:function (info) { 
              if (info.success) {
                $('#addModal').modal('hide');
                render();
                $("form").data('bootstrapValidator').resetForm(true);
                $('.dropdown_text').text('请选择一级分类');
                $('.img_box img').attr('src','images/none.png')
              }
             }
          })
        });
      }
    });
  };
});