$(function() {
    var form = layui.form;
    var layer = layui.layer;
    // 自定义验证规则
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    });
    // 初始化用户信息
    init();

    function init() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('获取用户信息失败！')
                }
                //把用户信息填充到表单中， 调用form.val()为表单赋值
                form.val('formUserInfo', res.data);
            }
        })
    }
    // 重置功能
    $('#btnReset').on('click', function(e) {
        e.preventDefault(); //阻止表单默认行为
        init();
    });
    // 更新用户信息
    $('.layui-form').on('submit', function(e) {
        e.preventDefault(); //阻止表单默认行为
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！');
                // 修改用户信息之后，调用首页的函数，重新渲染用户头像和欢迎文本
                window.parent.getUser();
            }
        })

    });
})