$(function(){
    var layer = layui.layer;
    var form = layui.form;
    form.verify({
        //密码长度
        pwd:[/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //新密码不能与旧密码相同
        samePwd:function(value){
            if(value === $('[name=oldPwd]').val()){
                return '新旧密码不能相同'
            }
        },
        rePwd:function(value){
            if(value !== $('[name=newPwd]').val()){
                return '两次密码不一致'
            }
        }
    })

    //修改密码
    $(".layui-form").on("submit",function(e){
        e.preventDefault();
        $.ajax({
            method:'post',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !==0){
                    return layui.layer.msg(res.message)
                }else {
                    layui.layer.msg("恭喜你，密码修改成功");
                    $(".layui-form")[0].reset();
                }
            }
        })
    })
})