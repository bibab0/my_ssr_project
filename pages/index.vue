<template>
  <div>
    <el-carousel trigger="click" height="350px">
      <el-carousel-item v-for="item in loopFocus" :key="item.id">
        <img class="foucsPic" :src="item.src" :alt="item.id">
      </el-carousel-item>
    </el-carousel>
    <h2>{{ counter }}</h2>
    <button @click="increment">
      点我加一
    </button>
    <h3>首页数据</h3>
    <div>{{ indexData }}</div>
    <div>{{ jsondata }}</div>
    <h3>新闻列表</h3>
    <div>{{ newsData }}</div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  async asyncData ({ app }) {
    const [indexData, newsData] = await Promise.all([
      app.$axios
        .$post('/pc/indexmapcityinfo', {
          cityName: '郑州市'
        })
        .then(res => res)
        .catch(() => {
          return '请求出错'
        }),
      app.$axios
        .$post('pc/news/list', {
          page: 1,
          size: 10,
          channelId: 5
        })
        .then(res => res)
        .catch(() => {
          return '请求出错'
        })
    ])
    return { indexData, newsData }
  },
  data () {
    return {
      title: 'hello,panshihao',
      jsondata: '',
      loopFocus: [
        {
          src:
            'https://zyimg.dahe.cn/image/png/20200326/1585187025295782.png?imageMogr2/thumbnail/1920>/interlace/1',
          id: 1
        },
        {
          src:
            'https://zyimg.dahe.cn/image/jpeg/20200326/1585187179804871.jpg?imageMogr2/thumbnail/1920>/interlace/1',
          id: 2
        },
        {
          src:
            'https://zyimg.dahe.cn/image/jpeg/20191115/1573802284620100.jpg?imageMogr2/thumbnail/1920>/interlace/1',
          id: 3
        }
      ]
    }
  },
  computed: {
    ...mapState(['counter'])
  },
  mounted () {
    // this.getData()
  },
  methods: {
    ...mapMutations(['increment']),
    async fetchSomething () {
      const ip = await this.$axios.$get('http://icanhazip.com')
      this.ip = ip
    },
    getData () {
      this.$axios({
        url: '/pc/indexmapcityinfo',
        method: 'post',
        data: { cityName: '郑州市' }
      })
        .then(({ data }) => {
          this.jsondata = data
        })
        .catch(() => {})
    }
  }
  // head () {
  //   return {
  //     title: this.title,
  //     meta: [
  //       {
  //         hid: 'description', name: 'description', content: '我的ssr应用'
  //       }
  //     ]
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.foucsPic {
  width: 100%;
  height: 100%;
}
</style>
