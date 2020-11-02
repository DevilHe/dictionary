// import playground from './modules/playground'
import d2Crud from './modules/d2-crud'
// import d2CrudPlus from './modules/d2-crud-plus'
// import plugins from './modules/plugins'
// import components from './modules/components'
import learn from './modules/learn'

import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页
      {
        path: 'index',
        name: 'index',
        meta: {
          title: '首页',
          auth: true
        },
        component: _import('system/index')
      },
      // 系统 前端日志
      {
        path: 'log',
        name: 'log',
        meta: {
          title: '前端日志',
          auth: true
        },
        component: _import('system/log')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: _import('system/function/refresh')
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: _import('system/function/redirect')
      }
    ]
  },
  learn,
  // playground,
  d2Crud
  // d2CrudPlus,
  // plugins,
  // components
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: _import('system/login')
  }
]
// JS题目列表
for (let i = 1; i < 6; i++) {
  const temp = {
    path: '/learn/js/page' + i,
    name: 'js' + i,
    component: _import('learn/js/page' + i) // 动态路由
  }
  frameOut.push(temp)
}
// 编程题目列表
for (let i = 1; i < 2; i++) {
  const temp = {
    path: '/learn/program/page' + i,
    name: 'program' + i,
    component: _import('learn/program/page' + i)
  }
  frameOut.push(temp)
}
// console.log('frameOut', JSON.stringify(frameOut))

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: _import('system/error/404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
