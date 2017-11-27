// 管理员
exports.signinRequired = async function (ctx, next) {
  const user = ctx.session.user

  if (!user) {
    return ctx.redirect('/signin')
  }

  await next()
}

// 管理员
exports.adminRequired = async function (ctx, next) {
  const user = ctx.session.user

  if (user.role <= 10) {
    return ctx.redirect('/signin')
  }

  await next()
}
