<template>
  <div id="app">
    <router-view></router-view>

    <div class="tabbar">
      <router-link to="/home" tag="div" class="items">主页</router-link>
      <router-link to="/person" tag="div" class="items">个人</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // hotInit: {}
    };
  },
  mounted() {
    //获取本地想看数据、看过的数据
    var localWish = JSON.parse(localStorage.getItem("wishData"));
    var localSeen = JSON.parse(localStorage.getItem("seenData"));
    //判断是否存在,不存在新建一个空数组
    if (localWish == undefined) {
      localStorage.setItem("wishData", JSON.stringify([]));
    }
    if (localSeen == undefined) {
      localStorage.setItem("seenData", JSON.stringify([]));
    }
  },
  components: {
    // Mvheader
  },
  methods: {}
  // mounted() {
  //   this.$http("/apix&city=广州&start=0&count=30&client=&udid=").then(
  //     res => (this.hotInit = res.data)
  //   );
  // }
};
</script>

<style scoped>
.tabbar {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  height: 0.5rem;
  border-top: 0.01rem solid #eee;
  display: flex;
  background-color: #fff;
  color: #8c8181;
  z-index: 5;
}
.items {
  flex: 1;
  font-size: 0.2rem;
  text-align: center;
  line-height: 0.5rem;
}
.items.active {
  color: #42b983;
  font-weight: normal;
}
</style>
