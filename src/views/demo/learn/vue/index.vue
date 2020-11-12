<template>
  <d2-container>
    <d2-crud
      :columns="columns"
      :options="options"
      :data="data"
      :rowHandle="rowHandle"
      @handle-view="handleView"
      :loading="loading"
      :pagination="pagination"
      @pagination-current-change="paginationCurrentChange"/>
  </d2-container>
</template>

<script>
import '../install'
import { VueList } from './const'

export default {
  data () {
    return {
      list: VueList.list,
      columns: [
        {
          title: '编号',
          key: 'id',
          width: 80
        },
        {
          title: '题目',
          key: 'name',
          width: 300,
          showOverflowTooltip: true
        },
        {
          title: '描述',
          key: 'desc',
          showOverflowTooltip: true
        }
      ],
      options: {
        height: '500'
      },
      data: [],
      rowHandle: {
        width: 120,
        custom: [
          {
            text: '查看',
            size: 'small',
            emit: 'handle-view'
          }
        ]
      },
      loading: false,
      pagination: {
        currentPage: 1,
        pageSize: 5,
        total: 0
      }
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
      this.fetchData()
    },
    fetchData () {
      this.loading = true
      this.data = this.list
      this.pagination.total = this.list.length
      this.loading = false
    },
    handleView ({ index, row }) {
      const { href } = this.$router.resolve({
        path: '/learn/vue/page' + row.id
      })
      window.open(href, '_blank')
    }
  }
}
</script>
