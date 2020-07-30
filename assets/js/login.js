$(function(){
    $("#link_reg").on("click",function(){
        $(".login-box").hide();
        $(".reg-box").show()
    })
    $("#link_login").on("click",function(){
        $(".login-box").show();
        $(".reg-box").hide()
    })

    //2.定义layui 表单校验规则
    var form = layui.form;
    //利用form这个对象,创建规则
    form.verify({
        pwd:[/^\S{6,12}$/,"密码为6-12位，不能包含空格!"],
        repwd:function(value){
            if($("#reg-pwd").val()!== value){
                return "两次密码输入不一致"
            }
        }
    })
    
    //3.注册功能
    var layer = layui.layer;
    $("#form_reg").on("submit",function(e){
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/api/reguser',
            data:{
                username:$("#form_reg [name=username]").val(),
                password:$("#form_reg [name=password]").val(),
            },
            success:function(res){
                //注册失败校验
                if(res.status !=0){
                    return layer.msg(res.message);
                }
                //注册成功，提示
                layer.msg(res.message);
                $("#link_login").click();
                $("#form_reg")[0].reset();
            }
        })
    })

    //4.登陆
    $("#form_login").on("submit",function(e){
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res){
                //注册失败校验
                if(res.status !=0){
                    return layer.msg(res.message);
                }
                //注册成功，提示
                layer.msg(res.message);
                localStorage.setItem("token",res.token);
                location.href = "/index.html";
            }
        })
    })
})