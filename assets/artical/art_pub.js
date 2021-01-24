$(function() {
    var layer = layui.layer;
    var form = layui.form;
    init(); // 渲染文章分类列表
    initEditor(); // 初始化富文本编辑器

    function init() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('初始化文章分类失败！')
                }
                // 调用模板引擎，渲染分类的下拉菜单
                var a = template('tpl', res);
                $('#select').html(a);
                // 一定要记得调用 form.render() 方法
                form.render();
            }
        })
    }
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
        // 选择图片
    $('#btnChooseImage').on('click', function() {
            $('#coverFile').click();
        })
        // 监听文件的change事件，获取用户选择的文件列表
    $('#coverFile').on('change', function(e) {
            var files = e.target.files;
            if (files.length === 0) {
                return
            }
            // 根据文件，创建对应的url地址
            var newImgURL = URL.createObjectURL(files[0]);
            // 为裁剪区域重新设置图片
            $image
                .cropper('destroy') // 销毁旧的裁剪区域
                .attr('src', newImgURL) // 重新设置图片路径
                .cropper(options) // 重新初始化裁剪区域
        })
        // 定义文章的发布状态
    var art_state = '已发布';
    // 为存为草稿按钮，绑定点击事件处理函数
    $('#btnSave2').on('click', function() {
            art_state = '草稿';
        })
        // 为表单绑定提交事件
    $('#form-pub').on('submit', function(e) {
            e.preventDefault();
            // 基于表单，创建一个FormData对象
            var fd = new FormData($(this)[0])
                // 将文章发布状态存到fd中
            fd.append('state', art_state);
            // 将封面裁剪过后的图片，输出为一个文件对象
            $image
                .cropper('getCroppedCanvas', {
                    width: 400,
                    height: 280
                })
                .toBlob(function(blob) {
                    fd.append('cover_img', blob)
                    pubartical(fd);
                })
        })
        // 定义发布文章的函数
    function pubartical(fd) {
        $.ajax({
            type: 'post',
            url: '/my/article/add',
            data: fd,
            // 注意：如果向服务器提交的是FormData格式的数据，必须有以下两个配置项
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('发布文章失败！')
                }
                layer.msg('发布文章成功！');
                location.href = 'artical_list.html'
            }
        })
    }





















})