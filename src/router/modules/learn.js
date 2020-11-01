import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/demo/learn',
  name: 'demo-learn',
  meta,
  redirect: { name: 'demo-learn-index' },
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'index', name: `${pre}index`, component: _import('demo/learn/index'), meta: { ...meta, title: '学习' } },
    { path: 'html', name: `${pre}html`, component: _import('demo/learn/html/index'), meta: { ...meta, title: 'HTML' } },
    { path: 'css', name: `${pre}css`, component: _import('demo/learn/css/index'), meta: { ...meta, title: 'CSS' } },
    { path: 'js', name: `${pre}js`, component: _import('demo/learn/js/index'), meta: { ...meta, title: 'JS' } },
    { path: 'program', name: `${pre}program`, component: _import('demo/learn/program/index'), meta: { ...meta, title: '编程' } }
  ])('demo-learn-')
}
