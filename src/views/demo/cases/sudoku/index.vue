<template>
  <d2-container>
    <template slot="header">{{ title }}</template>

    <div>
      <div class="container grid">
        <div class="row" v-for="(row, i) in matrix" :key="i" :class="rowClass[i % 3]">
          <span
            v-for="(col, j) in row"
            :key="j"
            :class="[
              colClass[j % 3],
              {empty: !col},
              {fixed: cloneMatrix[i][j]},
              {mark1: !cloneMatrix[i][j]},
              {error: (!matrixMarks[i][j] || !col) && !clearErrorMarks && !cloneMatrix[i][j]}
            ]"
            @click="cloneMatrix[i][j] ? false : clickGrid(i, j)">{{ col }}</span>
        </div>
      </div>

      <div class="rules">
        <p>游戏规则：</p>
        <p>所有小方格填入数字1～9</p>
        <p>每个数字在每行只能出现1次</p>
        <p>每个数字在每列只能出现1次</p>
        <p>每个数字在每宫只能出现1次</p>
      </div>

      <div class="dashboard">
        <div class="buttons">
          <button
            v-for="item in buttons"
            :key="item.key"
            @click="handleButton(item.key)">{{ item.text }}</button>
        </div>
      </div>

  <!-- :style="{
          top: `calc(${gridPosition[0] * 10}vw + ${gridPosition[0] + 1}px)`,
          left: gridPosition[1] < 4 ? (gridPosition[1] + 1) * 10 + 'vw' : (gridPosition[1] * 10) - 39.5 + 'vw'
        }" -->
      <div class="popup-num grid"
        v-show="popShow"
        style="top: 140px;left: 400px;"
      >
        <div class="row"
          v-for="(row, i) in popupNumbers"
          :key="i"
          :class="[{'row-g-top': i === 0}, {'row-g-bottom': i === 3}]">
          <span
            v-for="(cell, j) in row"
            :key="j"
            :class="[
              {'col-g-left': j % 3 === 0},
              {'col-g-right': j % 3 === 2},
              {'mark': cell === ''},
              {'mark1': i === 3 && j === 0},
              {'mark2': i === 3 && j === 2}
            ]"
            @click="modifyGrid(cell)">
            {{ cell }}
          </span>
        </div>
      </div>
    </div>
  </d2-container>
</template>

<script>
import Vue from 'vue'
import toolkit from './utils/toolkit'
import Checker from './utils/checker'
import { puzzleMatrix } from './utils/generate'
const { matrixToolkit: { makeMatrix, deepClone } } = toolkit
const myPuzzle = puzzleMatrix()

export default {
  name: 'sudoku',
  data () {
    return {
      title: '数独游戏',
      matrix: myPuzzle, // 生成棋盘数据
      cloneMatrix: deepClone(myPuzzle), // 棋盘原始数据、重置时追溯
      myPuzzleReset: JSON.parse(JSON.stringify(myPuzzle)), // 重置
      matrixMarks: makeMatrix(true), // 解密结果
      isSuccess: null, // 是否解密成功
      rowClass: ['row_g_top', 'row_g_middle', 'row_g_bottom'],
      colClass: ['col_g_left', 'col_g_center', 'col_g_right'],
      popShow: false, // 弹窗状态
      gridPosition: [0, 0], // 点击的单元格位置
      clearErrorMarks: true, // 默认清除错误标记
      buttons: [
        {
          key: 'check',
          text: '检查'
        },
        {
          key: 'reset',
          text: '重置'
        },
        {
          key: 'clear',
          text: '清理'
        },
        {
          key: 'rebuild',
          text: '重建'
        }
      ],
      popupNumbers: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        ['', 0, '']
      ]
    }
  },
  methods: {
    handleButton (type) {
      if (type === 'check') {
        const myChecker = new Checker(this.matrix)
        myChecker.checkAll()
        const isSuccess = myChecker.isSuccess()
        this.isSuccess = isSuccess
        this.clearErrorMarks = false
        this.matrixMarks = myChecker.matrixMarks()
        isSuccess && alert('恭喜您，游戏成功！')
      } else if (type === 'reset') {
        this.matrix = this.myPuzzleReset
      } else if (type === 'clear') {
        this.clearErrorMarks = true
      } else if (type === 'rebuild') {
        const newPuzzle = puzzleMatrix()
        this.myPuzzleReset = JSON.parse(JSON.stringify(newPuzzle))
        this.matrix = newPuzzle
        this.cloneMatrix = deepClone(newPuzzle)
        this.matrixMarks = makeMatrix(true)
        this.clearErrorMarks = true
      }
    },
    clickGrid (i, j) {
      const shown = [i, j].every(e => this.gridPosition.includes(e)) || 0
      const gridPosition = [i, j]
      gridPosition.forEach((e, i) => {
        Vue.set(this.gridPosition, i, e)
      })
      this.popShow = shown === 0 ? !this.popShow : shown
      // console.log(this.gridPosition)
    },
    modifyGrid (val) {
      const num = val === '' ? 0 : val
      Vue.set(this.matrix[this.gridPosition[0]], this.gridPosition[1], num)
      this.popShow = !this.popShow
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./sudoku.scss";
</style>
