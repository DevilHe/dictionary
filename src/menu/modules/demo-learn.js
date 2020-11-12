export default {
  path: '/demo/learn',
  title: '学习',
  iconSvg: 'learn',
  children: (pre => [
    { path: `${pre}index`, title: 'HOME', icon: 'home' },
    { path: `${pre}html`, title: 'HTML' },
    { path: `${pre}css`, title: 'CSS' },
    { path: `${pre}js`, title: 'JS' },
    { path: `${pre}vue`, title: 'Vue' },
    { path: `${pre}program`, title: '编程' }
  ])('/demo/learn/')
}
