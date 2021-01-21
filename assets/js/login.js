$(function() {
    $('#link-reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    });

    $('#link-login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    });
    // 密码验证
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],

        repwd: function(value) {
            var pass = $('#pass').val();
            if (value !== pass)
                return alert('两次密码不一致');

        }

    });
    // 注册功能
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功，请登录')
                $('#link-login').click();

            }
        });

    });
    // 登录功能
    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                } else {
                    layer.msg('登录成功', { time: 1500 }, function() {
                        localStorage.setItem('token', res.token);
                        location.href = 'index.html'
                    })
                }
            }
        })
    })





















})