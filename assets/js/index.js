$(function() {
    getUser();

    function getUser() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            headers: { Authorization: localStorage.getItem('token') },
            success: function(res) {
                // console.log(res);
                if (res.status != 0) {
                    return layui.layer.msg('获取用户信息失败')
                }
                // 调用函数渲染用户头像
                renderAvatar(res.data)
            }

        })
    };
    // 渲染用户头像
    function renderAvatar(user) {
        // 获取用户头像
        var name = user.nickname || user.username;
        // 设置欢迎的文本
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
        if (user.user_pic != null) {
            $('.layui-nav-img').attr('src', user.user_pic).show();
            $('.text-avatar').hide();
        } else {
            var first = name[0].toUpperCase(); //用户名拼音首字母大写
            $('.text-avatar').html(first).show();
            $('.layui-nav-img').hide();
        }
    }




    var layer = layui.layer;

    // 退出功能
    $('#btnout').on('click', function() {
        layui.layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('token');
            location.href = 'login.html';
            layer.close(index);
        });

    })






















})