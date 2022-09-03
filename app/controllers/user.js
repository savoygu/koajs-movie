const User = require('../models/user')

// 用户注册
exports.showSignup = async function (ctx) {
  await ctx.render('user/signup', {
    title: '注册页面'
  })
}

exports.showSignin = async function (ctx) {
  await ctx.render('user/signin', {
    title: '登录页面'
  })
}

// 用户注册
exports.signup = async function (ctx) {
  const _user = ctx.request.body.user

  try {
    const oldUser = await User.findOne({ name: _user.name })
    if (oldUser) {
      return ctx.redirect('/signin')
    } else {
      const user = new User(_user)

      await user.save()
      return ctx.redirect('/')
    }
  } catch (e) {
    console.log(e)
  }
}

// 用户登录
exports.signin = async function (ctx) {
  const _user = ctx.request.body.user
  const name = _user.name
  const password = _user.password

  try {
    const user = await User.findOne({ name })
    if (!user) {
      return ctx.redirect('/signup')
    }

    const isMatch = await user.comparePassword(password)
    if (isMatch) {
      ctx.session.user = user

      return ctx.redirect('/')
    } else {
      return ctx.redirect('/signin')
    }
  } catch (e) {
    console.log(e)
  }
}

exports.logout = function (ctx) {
  delete ctx.session.user
  // delete app.locals.user

  ctx.redirect('/')
}

// 用户列表
exports.list = async function (ctx) {
  try {
    const users = await User.fetch()
    await ctx.render('admin/user_list', {
      title: '用户列表页',
      users
    })
  } catch (e) {
    console.log(e)
  }
}
