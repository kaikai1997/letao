$(function () {
  var page = 1;
  var pageSize = 5;
  render()
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: page,
        pageSize: pageSize,
      },
      success: function (info) {
        // console.log(info)
        $('tbody').html(template('tpl', info));

        $('#pagintor').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currenPage: page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (a, b, c, p) {
            page = p;
            render();
          }
        }),

          $('.btn_add').on('click', function () {
            $('#addModal').modal('show');

            $('form').bootstrapValidator({
              feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
              },
              fields: {
                categoryName: {
                  validators: {
                    notEmpty: {
                      message: '请输入一级分类的名称'
                    },
                  },
                },
              },
            });

            $("form").on('success.form.bv', function (e) {
              e.preventDefault();
              //使用ajax提交逻辑
              $.ajax({
                type: 'post',
                url: '/category/addTopCategory',
                data: $('form').serialize(),
                success: function (info) {
                  // console.log(info);
                  if (info.success) {
                    $("#addModal").modal('hide');
                    page = 1;
                    render();
                    $('form').data("bootstrapValidator").resetForm(true);
                  }
                }
              });
            });

          });

      }
    });
  }
})