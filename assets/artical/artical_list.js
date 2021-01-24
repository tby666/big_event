$(function() {
    var layer = layui.layer;
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_name: '',
        state: ''
    }
    initTable(); // 渲染文章列表数据
    // 渲染文章列表数据的函数
    function initTable() {
        $.ajax({
            type: 'get',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章数据列表失败！')
                }
                // 使用模板引擎渲染数据到页面
                var a = template('tpl', res);
                $('tbody').html(a);
            }
        })
    }





















})