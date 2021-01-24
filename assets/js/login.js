$(function() {
    // 切换登录和注册盒子
    $('#link-reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    });

    $('#link-login').on('click', function() {
        $('.reg-box').hide();
        $('.login-box').show();
    });
    // 密码验证
    var form = layui.form; //从 layui 中获取 form 对象
    var layer = layui.layer; //从 layui 中获取 layer 对象，调用 layer.msg() 提示消息
    // 通过 form.verify() 函数自定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],

        repwd: function(value) {
            var pass = $('#pass').val();
            if (pass !== value)
                return '两次密码不一致';

        }

    });
    // 注册功能
    $('#form_reg').on('submit', function(e) {
        e.preventDefault(); //阻止表单默认行为
        // 向服务器发送数据
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: $(this).serialize(), //快速获取所有表单的值，前提是每个表单都有自己的name
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('注册失败');
                } else {
                    layer.msg('注册成功，请登录');
                    $('#link-login').click(); //模拟点击事件，跳转到登录页面
                }
            }
        });

    });
    // 登录功能
    $('#form_login').on('submit', function(e) {
        e.preventDefault(); //阻止表单默认行为
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(), //快速获取本表单的值，前提是每个表单都有name
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                } else {
                    layer.msg('登录成功', { time: 1500 }, function() {
                        //将登录成功后得到的 token 字符串，保存到localStorage中,并跳转到首页-----------------------------
                        localStorage.setItem('token', res.token);
                        location.href = 'index.html';
                    })
                }
            }
        })
    })





















})