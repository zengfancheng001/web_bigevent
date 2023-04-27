$(function(){
  getUserInfo()

  // 监听退出按钮点击事件
  let layer = layui.layer
  $('#btnLogout').on('click',function(){
    layer.confirm('确定退出登录？',{icon:3,title:'提示'},function(index){
      // 清空本地存储的token
      localStorage.removeItem('token')
      // 重新跳转到登录页面
      location.href = '/login.html'
      // 关闭confirm询问框
      layer.close(index)
    })
  })
})

// 获取用户信息
function getUserInfo(){
  $.ajax({
    methed:'GET',
    url:'/my/userinfo',
    // headers:{
    //   Authorization:localStorage.getItem('token')||''
    // },，这个功能在baseAPI.js中实现
    success:function(res){
      if(res.status!==0){
        return layui.layer.msg('获取用户信息失败！')
      }
      // 调用renderAvatar渲染用户的头像
      renderAvatar(res.data)
    },

    // 防止用户不经过登录直接在地址栏输入后台主页地址访问后台，
    // 不论成功还是失败，最终都会调用complete 回调函数，
    //  complete: function(res) {
    //   // console.log('执行了 complete 回调：')
    //   // console.log(res)
    //   // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
    //   if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
    //     // 1. 强制清空 token
    //     localStorage.removeItem('token')
    //     // 2. 强制跳转到登录页面
    //     location.href = '/login.html'
    //   }
    // }//在baseAPI.js中统一挂载
  })

}

// 渲染用户的头像和用户名
function renderAvatar(user){
let name = user.nickname ||user.username
// 设置欢迎文本
$('#welcome').html('欢迎&nbsp;'+name)
// 按需渲染用户的头像
if(user.user_pic !== null){
  // 渲染图片图像
  $('.layui-nav-img').attr('src',user.user_pic).show()
  $('.text-avatar').hide()
}else{
  // 渲染文本图像,第一个字符的大写形式
  $('.layui-nav-img').hide()
  let first = name[0].toUpperCase()
  $('.text-avatar').html(first).show()
}
}

