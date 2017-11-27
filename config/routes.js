const Router = require('koa-router')
const router = new Router()

router.use(function (ctx, next) {
  const _user = ctx.session.user

  ctx.state.user = _user

  return next()
})

router.use('/', require('../app/routes/index'))
router.use('/admin', require('../app/routes/admin'))
router.use('/movie', require('../app/routes/movie'))
router.use('/user', require('../app/routes/user'))

module.exports = router.routes()

// module.exports = function (app) {
//   // app.use(function (req, res, next) {
//   //   var _user = req.session.user
//   //
//   //   app.locals.user = _user
//   //
//   //   return next()
//   // })
//
//   // 路由分发
//   // app.use('/', require('../app/routes/index'))
//   // app.use('/user', require('../app/routes/user'))
//   // app.use('/movie', require('../app/routes/movie'))
//   // app.use('/admin', require('../app/routes/admin'))
//
//   /*
//    {
//    _id: 1,
//    doctor: '何塞·帕迪里亚',
//    country: '美国',
//    title: '机械战警',
//    year: 2014,
//    poster: 'http://g4.ykimg.com/05160000530EEB63675839160D0B79D5',
//    language: '英语',
//    flash: 'http://player.youku.com/embed/XNzEwNDg4OTY4',
//    summary: '2028年，专事军火开发的机器人公司Omni Corp.生产了大量装备精良的机械战警，他们被投入到惩治犯罪等行动中，取得显著的效果。罪犯横行的底特律市，嫉恶如仇、正义感十足的警察亚历克斯·墨菲（乔尔·金纳曼 饰）遭到仇家暗算，身体受到毁灭性破坏。借助于Omni公司天才博士丹尼特·诺顿（加里·奥德曼 饰）最前沿的技术，墨菲以机械战警的形态复活。数轮严格的测试表明，墨菲足以承担起维护社会治安的重任，他的口碑在民众中直线飙升，而墨菲的妻子克拉拉（艾比·考尼什 饰）和儿子大卫却再难从他身上感觉亲人的温暖。 　　感知到妻儿的痛苦，墨菲决心向策划杀害自己的犯罪头子展开反击……'
//    }
//    */
// }
