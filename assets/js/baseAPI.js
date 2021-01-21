// 在执行ajax请求前，会先执行ajaxPrefilter这个函数，option获取ajax请求的所有配置项
$(function() {
    $.ajaxPrefilter(function(option) {
        option.url = 'http://api-breakingnews-web.itheima.net' + option.url;
        // 统一为有权限的接口，设置请求头
        if (option.url.indexOf('/my/') !== -1) {
            option.headers = {
                Authorization: localStorage.getItem('token')
            }
        }
        option.complete = function(res) {
            // 如果用户没有登录，不能通过网址直接访问首页
            // complete回调函数：不管请求成功与否，都会调用

            if (res.responseJSON.status === 1 && res.message === '身份认证失败！') {
                localStorage.removeItem('token');
                location.href = 'login.html';
            }
        }
    });
})