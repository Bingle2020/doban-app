<template>
  <div class="bv-person">
    <!-- 顶部 -->
    <div class="user-nav">
      <h2 class="my-home">我的</h2>
    </div>
    <!-- 头像框 -->
    <div class="user-box">
      <img :src="img1" class="user-avatar" />
      <h3 class="user-name">{{name1}}</h3>
    </div>
    <!-- 未登录提示框,登陆按钮 -->
    <div class="user-nolog" v-if="isLogIn">
      <button class="user-log" @click="logInUser">登陆</button>
    </div>
    <!-- 登陆后展示框 -->
    <div class="user-login" v-else>
      <div class="user-tabbar">
        <router-link to="/person/wantSee" tag="div" class="user-item">想看</router-link>
        <router-link to="/person/saw" tag="div" class="user-item">看过</router-link>
        <router-link to="/person/tickets" tag="div" class="user-item">已购票</router-link>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>


<script>
export default {
  name: "Person",
  data() {
    return {
      img1: require("../images/avatar.png"),
      name1: '未登录',
      isLogIn: true
    };
  },
  methods: {
    logInUser(){
      this.img1 = require("../images/mine.jpg");
      this.name1 = 'Bin';
      this.isLogIn = false
    }
  }
};
</script>

<style lang="scss" scoped>
.bv-person {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f0f0f0;
  z-index: 4;

  .user-nav {
    width: 3.75rem;
    height: 0.5rem;
    background-color: #e54847;
    border-bottom: 0.005rem solid #f94b4b;

    .my-home {
      display: block;
      font-size: 0.18rem;
      font-weight: 400;
      color: #fff;
      text-align: center;
      line-height: 0.5rem;
      margin: 0;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }

  .user-box {
    width: 3.75rem;
    height: 1.5rem;
    background-color: #e54847;
    position: relative;

    .user-avatar {
      position: absolute;
      top: 0.3rem;
      left: 0;
      right: 0;
      margin: auto;
      display: block;
      width: 0.6rem;
      height: 0.6rem;
      border: 0.03rem solid #fff;
      border-radius: 50%;
    }

    .user-name {
      position: absolute;
      bottom: 0.15rem;
      left: 0;
      right: 0;
      width: 1rem;
      height: 0.28rem;
      line-height: 0.28rem;
      margin: auto;
      font-size: 0.18rem;
      color: #fff;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }

  .user-nolog {
    display: flex;
    width: 3.75rem;
    height: 4.17rem;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .user-log {
      width: 1rem;
      height: 0.4rem;
      font-size: 0.15rem;
      background-color: #fff;
      border: 0.01rem solid #e54847;
      border-radius: 0.06rem;
      color: #e54847;
    }
  }

  .user-login {
    width: 3.75rem;
    height: 4.17rem;

    .user-tabbar{
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 3.75rem;
      height: .31rem;
      line-height: .3rem;
      font-size: .15rem;
      text-align: center;
      color: #000;
    }

    .user-item{
      flex: 1;
      border-bottom: .01rem solid #fff;
    }

    .exact-active{
      border-bottom: .01rem solid #f00;
      color: #f00;
      font-weight: 600;
    }
  }
}
</style>