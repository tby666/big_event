// 设置接口配置项
// 在执行ajax请求前，会先执行ajaxPrefilter这个函数，option是ajax请求的所有配置项，调用ajax时option当形参接收ajax里面的实参
$(function() {
    $.ajaxPrefilter(function(option) {
        option.url = 'http://api-breakingnews-web.itheima.net' + option.url;
        // 统一为有权限的接口，设置请求头----------------------------------------
        // 以 /my 开头的请求路径，需要在请求头中携带 Authorization 身份认证字段，才能正常访问成功
        if (option.url.indexOf('/my/') !== -1) {
            option.headers = {
                Authorization: localStorage.getItem('token') //取出身份认证令牌
            }
        }
        option.complete = function(res) {
            // 如果用户没有登录，不能通过网址直接访问首页
            // complete回调函数：不管请求成功与否，都会调用
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                //身份认证失败后删除令牌，跳转到登录页面
                localStorage.removeItem('token');
                location.href = 'login.html';
            }
        }
    });
})