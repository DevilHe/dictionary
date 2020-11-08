import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/demo/cases',
  name: 'demo-cases',
  meta,
  redirect: { name: 'demo-cases-index' },
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'index', name: `${pre}index`, component: _import('demo/cases/index'), meta: { ...meta, title: '案例' } },
    { path: 'sudoku', name: `${pre}sudoku`, component: _import('demo/cases/sudoku/index'), meta: { ...meta, title: '数独游戏' } }
  ])('demo-cases-')
}
