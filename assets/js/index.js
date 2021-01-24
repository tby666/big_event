$(function() {
    // 入口函数里面只调用函数或注册事件等操作，不要封装函数
    getUser();
    var layer = layui.layer;
    // 退出功能
    $('#btnout').on('click', function() {
        // 使用确认提示框
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function() {
            //退出首页后，移除身份令牌，跳转到登录页面
            localStorage.removeItem('token');
            location.href = 'login.html';
        });
    });
});
// 在入口函数外面封装函数
// 获取用户的基本信息的函数
function getUser() {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            } else {
                console.log(res);
                // 调用函数渲染用户头像
                renderAvatar(res.data);
            }

        }

    })
};

// 渲染用户头像的函数
function renderAvatar(user) {
    // 获取用户头像
    var name = user.nickname || user.username;
    // 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp; &nbsp; &nbsp;' + name);
    // 3. 按需渲染用户的头像
    if (user.user_pic != null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase(); //用户名拼音首字母大写
        $('.text-avatar').html(first).show();

    }
};