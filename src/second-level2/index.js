import '@/common'
import Vue from 'vue'
import '@/second-level2/index.styl'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '#app',
  methods: {
    search() {
      if (!this.searchValue.trim()) {
        this.$message({ message: '不能为空', type: 'error' })
        return
      }
      console.log('search')
    }
  },
  data() {
    return {
      searchValue: '',
      footTab: '1',
      sideMenuVisible: true
    }
  }
})
