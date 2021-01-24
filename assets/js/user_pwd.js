$(function() {
    var form = layui.form;
    // 通过 form.verify() 函数自定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //规则： 新密码与原密码不能相同
        samePwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新密码与原密码不能相同'
            }
        },
        // 规则：确认密码与新密码要一致
        rePwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致'
            }
        }

    });
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                    // 把表单转换为dom对象，使用重置方法清空所有表单内容
                } else {
                    layui.layer.msg(res.message);
                    $('.layui-form')[0].reset();
                }



            }
        })
    })
})