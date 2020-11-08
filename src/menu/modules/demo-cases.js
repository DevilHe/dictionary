export default {
  path: '/demo/cases',
  title: '案例',
  iconSvg: 'cases',
  children: (pre => [
    { path: `${pre}index`, title: 'HOME', icon: 'home' },
    { path: `${pre}sudoku`, title: '数独游戏' }
  ])('/demo/cases/')
}
