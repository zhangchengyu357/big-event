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

    //3.头像上传
    $("#btnUpload").on("click",function(){
        var dataURL = $image
            .cropper('getCroppedCanvas',{
                width:100,
                height:100
            })
            .toDataURL('image/png')
        $.ajax({
            method:'post',
            url:'/my/update/avatar',
            data:{
                avatar:dataURL
            },
            success:function(res){
              //返回校验
              if(res.status !==0) {
                  return layui.layer.msg(res.message)
              }
              layui.layer.msg("头像上传成功");
              window.parent.getUserInfo()  
            }
        })    
    })

})