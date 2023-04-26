$(function () {
  // 点击去注册账号连接
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 点击去登录的连接
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  // 从layui中获取form对象
  let form = layui.form
  let layer = layui.layer
  // 通过form.verify（）函数自定义校验规则
  form.verify({
    // 自定义了pwd校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须为6到12位的非空字符'],
    // 再次确认密码校验规则
    repwd: function (value) {
      // 通过形参拿到的是确认密码框的值，与密码框中的值进项比较是否相等
      let pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致！'
      }
    }
  })

  // 监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    // 1. 阻止默认的提交行为
    e.preventDefault()
    // 2. 发起Ajax的POST请求
    var data = {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val()
    }
    $.post('/api/reguser', data, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message)
      }

      // layui里的弹出层
      layer.msg('注册成功，请登录！')
      // 模拟人的点击行为,转到登录界面
      $('#link_login').click()
    })
  })

  // 登录事件
  $('#form_login').submit(function (e) {
    e.preventDefault()
    $.ajax({
      url: '/api/login',
      method: 'post',
      data: $(this).serialize(),
      success:function(res) {
        if(res.status !==0){
          return layer.msg('登录失败！')
        }
        layer.msg('登录成功！')
        // 保存token字符串
        localStorage.setItem('token',res.token)
        // console.log(res.token)
        // 跳转到后台主页
        location.href = '/index.html'
      }
    })
  })
})
