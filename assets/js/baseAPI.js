// 在执行ajax请求前，会先执行ajaxPrefilter这个函数，option获取ajax请求的所有配置项
$(function() {
    $.ajaxPrefilter(function(option) {
        console.log(option);
        option.url = 'http://api-breakingnews-web.itheima.net' + option.url
    })
})