<template>
  <div class="navBox">
    <img class="logo" src="@/assets/images/logo.png" alt="志愿河南logo" @click="toIndex">
    <ul class="navList">
      <li class="navItem">
        <nuxt-link to="/">
          首页
        </nuxt-link>
      </li>
      <li class="navItem">
        <nuxt-link to="/wmsj">
          文明实践
        </nuxt-link>
      </li>
      <li class="navItem">
        <nuxt-link to="/xm">
          项目
        </nuxt-link>
      </li>
      <li class="navItem">
        <nuxt-link to="/zz">
          组织
        </nuxt-link>
      </li>
      <li class="navItem">
        <nuxt-link to="/news">
          新闻
        </nuxt-link>
      </li>
      <li class="navItem">
        <nuxt-link to="/zyq">
          志愿圈
        </nuxt-link>
      </li>
      <li class="navItem">
        <nuxt-link to="/xxpx">
          学习培训
        </nuxt-link>
      </li>
      <li class="navItem">
        <nuxt-link to="/about">
          关于我们
        </nuxt-link>
      </li>
    </ul>
    <el-input
      v-model="keyWord"
      class="searchInput"
      prefix-icon="el-icon-search"
      placeholder="请输入关键字"
      @change="goSearch"
    />
    <div class="loginBox">
      <a href>登录</a>&nbsp;·&nbsp;
      <a href>注册</a>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      keyWord: ''
    }
  },
  methods: {
    toIndex () {
      this.$router.push('/')
    },
    goSearch () {
      this.$message({
        message: '跳转搜索页面',
        type: 'success'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navBox {
  width: 1200px;
  height: 80px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  .logo {
    cursor: pointer;
  }
  .navList {
    width: 620px;
    margin-left: 40px;
    display: flex;
    align-items: center;
    .navItem {
      font-size: 17px;
      font-weight: 600;
      color: #252525;
      margin-right: 25px;
      position: relative;
      &:hover {
        color: #e53a40;
      }
    }
  }
  .searchInput {
    width: 250px;
    margin-right: 30px;
  }
}
</style>
