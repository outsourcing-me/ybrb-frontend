import '@/common'
import Vue from 'vue'
import '@/home/index.styl'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '#app',
  timeoutHandle: null,
  methods: {
    search() {
      if (!this.searchValue.trim()) {
        this.$message({ message: '不能为空', type: 'error' })
        return
      }
      console.log('search')
    },
    hideSubMenu() {
      clearTimeout(this.timeoutHandle)
      this.timeoutHandle = setTimeout(() => {
        this.subMenuShow = false
      }, 300)
    },
    showSubMenu(index) {
      clearTimeout(this.timeoutHandle)
      this.subMenuShow = true
      this.subMenuIndex = index
    }
  },
  data() {
    return {
      searchValue: '',
      footTab: '1',
      subMenuIndex: 0,
      subMenuShow: false,
      sideMenuVisible: true
    }
  }
})
