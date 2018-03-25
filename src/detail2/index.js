import '@/common'
import Vue from 'vue'
import '@/detail1/index.styl'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '#app',
  mounted() {
    const img1Swiper = this.$refs.img1Swiper.swiper
    const img1SwiperThumb = this.$refs.img1SwiperThumb.swiper
    img1Swiper.controller.control = img1SwiperThumb
    img1SwiperThumb.controller.control = img1Swiper
  },

  methods: {
    search() {
      if (!this.searchValue.trim()) {
        this.$message({ message: '不能为空', type: 'error' })
        return
      }
      console.log('search')
    },

    likeIt(item) {
      console.log(item)
      item.isLike = !item.isLike
    },

    submitComment(item) {
      if (!this.editable) {
        this.$message({ message: '请先登录', type: 'error' })
        return
      }
      if (!item) {
        if (!this.comment.trim()) {
          this.$message({ message: '评论不能为空', type: 'error' })
          return
        }
      } else {
        if (!item.reply.trim()) {
          this.$message({ message: '评论不能为空', type: 'error' })
          return
        }
      }
      console.log('send to server')
    }
  },

  data() {
    return {
      searchValue: '',
      comments: [{
        id: 1,
        date: '2018-02-25 18:37:27',
        title: '打狗匠[网易贵州省贵阳手机网友',
        avatar: require('@/assets/imgs/icon-wx.png'),
        comment: '系建還社資消變自臺少國代了層不想洲心苦可是由陸興筆考，重明細作來因世費斷頭不兩中去大；智對但山和，機觀絕了氣到類以？過來修將藝出今',
        reply: '',
        replyVisible: false,
        isLike: false
      }, {
        id: 2,
        date: '2018-03-25 18:37:27',
        title: '哈哈没[网易贵州省贵阳手机网友',
        avatar: require('@/assets/imgs/icon-wx.png'),
        comment: '系建還社資消變自臺少國代了層不想洲心苦可是由陸興筆考，重明細作來因世費斷頭不兩中去大；智對但山和，機觀絕了氣到類以？過來修將藝出今',
        reply: '',
        replyVisible: false,
        isLike: false
      }],
      comment: '',
      editable: false, // 是否登录才可以评论
      footTab: '1',
      sideMenuVisible: true
    }
  }
})
