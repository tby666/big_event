$(function() {
    var layer = layui.layer;
    var form = layui.form;
    // 渲染文章分类列表函数
    function artical() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function(res) {
                // 使用模板引擎渲染数据到页面
                var a = template('tpl', res);
                $('tbody').html(a);
            }
        })
    }
    artical(); // 渲染文章分类列表

    var indexAdd = null;
    // 给添加类别按钮绑定点击事件，点击后弹出一个框
    $('#btnAddCate').on('click', function() {
        // 使用layer弹出层
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#tanchu-add').html() //在结构里面定义script标签，里面放弹出层内容
        })
    });
    // 通过事件委托给弹出层表单绑定提交事件
    $('body').on('submit', '#form-add', function(e) {
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/my/article/addcates',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('新增文章分类失败！');
                    } else {
                        artical();
                        layer.msg('新增文章分类成功！');
                        layer.close(indexAdd);
                    }
                }
            })
        })
        // 通过代理的形式，为 btn-edit 按钮绑定点击事件
    var indexEdit = null;
    $('tbody').on('click', '.btn-edit', function() {
            indexEdit = layer.open({
                type: 1,
                area: ['500px', '250px'],
                title: '添加文章分类',
                content: $('#tanchu-edit').html()
            })
            var id = $(this).attr('data-id')
            $.ajax({
                type: 'get',
                url: '/my/article/cates/' + id,
                success: function(res) {
                    form.val('form-edit', res.data);
                }
            })
        })
        // 编辑功能
    $('body').on('submit', '#form-edit', function(e) {
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/my/article/updatecate',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('更新分类信息失败！')
                    } else {
                        layer.msg('更新分类数据成功！')
                        layer.close(indexEdit);
                        artical();
                    }
                }
            })
        })
        // 通过代理的形式，为删除按钮绑定点击事件
    $('tbody').on('click', '.delete', function() {
        var id = $(this).attr('data-id');
        layer.confirm('确认删除？', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                type: 'get',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章分类失败！')
                    } else {
                        layer.msg('删除文章分类成功！');
                        layer.close(index);
                        artical();
                    }
                }
            })

        });

    })

















})