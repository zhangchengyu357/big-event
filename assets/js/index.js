$(function () {
    //1.获取用户信息
    getUserInfo()

    //3.退出登陆
    //引入layer
    var layer = layui.layer;
    $("#btnLogout").on("click", function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token')
            // 2. 重新跳转到登录页面
            location.href = '/login.html'
        })
    })
})

//获取用户信息封装
function getUserInfo() {
    $.ajax({
        type: 'GEt',
        url: '/my/userinfo',
        // headers: {
        //     Authorization:localStorage.getItem ('token') ||""
        // },
        success: function (res) {
            //1.判断用户信息是否查询成功
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            //2.调用用户渲染函数
            renderUser(res.data);
        }
    })
}

//封装用户渲染函数
function renderUser(user) {
    //1.渲染用户名
    var uname = user.nickname || user.username;
    $("#welcome").html("欢迎&nbsp;&nbsp;" + uname);
    if (user.user_pic !== null) {
        $(".layui-nav-img").show().attr("src", user.user_pic);
        $(".text-avatar").hide();
    } else {
        $(".layui-nav-img").hide();
        $(".text-avatar").show().html(uname[0].toUpperCase())
    }
}