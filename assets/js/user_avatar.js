$(function() {
    var layer = layui.layer
  
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
      // 纵横比
      aspectRatio: 1,
      // 指定预览区域
      preview: '.img-preview'
    }
  
    // 1.3 创建裁剪区域
    $image.cropper(options)

    //2.修改上传文件
    $("#btnChooseImage").on("click",function(){
        $("#file").click();
    })

    //input改变，渲染裁剪区域
    $("#file").on("change",function(e){
        //1.获取的唯一的一个文件
        var file = e.target.files[0];
        var newImgURL = URL.createObjectURL(file);
        $image
           .cropper('destroy')
           .attr('src',newImgURL)
           .cropper(options)
    })

})