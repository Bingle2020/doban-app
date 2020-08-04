<template>
  <div class="header-wrapper">
    <!-- 搜索框 -->
    <div class="bv-nav">
      <div class="bv-logo">
        <img src="../images/logo.jpg" class="auto-img" />
      </div>
      <div class="bv-search" ref="widVal">
        <div class="search-logo">
          <img src="../images/search.png" class="auto-img" />
        </div>
        <input type="text" placeholder="搜索" @click="clickinput" />
      </div>
      <span v-if="cancelToggle" class="bv-cancel" @click="clickcancel">取消</span>
      <div class="bv-tv" v-if="tvToggle">
        <img src="../images/TV.png" class="auto-img" />
      </div>
    </div>
    <!-- 头部信息 -->
    <div class="bv-head">
      <div class="carousel bv-1">
        <img src="../images/p1.webp" class="auto-img" />
      </div>
      <div class="carousel bv-2">
        <img src="../images/p2.webp" class="auto-img" />
      </div>
      <div class="carousel bv-3">
        <img src="../images/p3.webp" class="auto-img" />
      </div>
    </div>

    <div class="tab-middle">
      <router-link to="/home/hot" tag="div" class="item">正在热映</router-link>
      <router-link to="/home/coming" tag="div" class="item">即将上映</router-link>
    </div>

    <router-view />
  </div>
</template>

<script>
export default {
  name: "Mvheader",
  data() {
    return {
      nowCity: "",
      point: {},
      tvToggle: true,
      cancelToggle: false
    };
  },
  props: {
    // hotData: [Object,Array,String]
  },
  mounted() {
    // this.$http(
    //   '/locate/location/ip?ip=&ak=fQM7VXha4ogQlZcGCG0lYIRVIROk7rDv&coor=bd09ll'
    // ).then(result => {
    //   console.log(result.data);
    // });

    // this.$http(
    //   "/locate/ws/location/v1/ip?key=4SFBZ-GEWKX-VBB4V-7YRTU-2W342-S5F3H"
    // ).then(result => {
    //   console.log(result.data);
    // });
    
    // this.nowCity = res.data.content.address_detail.city;
    // this.point = { ...res.data.content.point };
    // console.log("nowCity==>", this.nowCity);
    // console.log("point==>", this.point);
  },
  methods: {
    clickinput() {
      if (this.cancelToggle) return;
      this.$refs.widVal.style.width = "2.38rem";
      this.tvToggle = !this.tvToggle;
      this.cancelToggle = !this.cancelToggle;
    },
    clickcancel() {
      this.$refs.widVal.style.width = "1rem";
      this.tvToggle = !this.tvToggle;
      this.cancelToggle = !this.cancelToggle;
    }
  }
};
</script>

<style lang="scss" scoped>
.header-wrapper {
  width: 3.75rem;
  height: 6.67rem;
  color: #fff;
  font-size: 0;
  overflow: auto;

  .bv-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 0.5rem;
    padding: 0 0.15rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #ffffff;
    border-bottom: 0.01rem solid #d2cdcd;
    z-index: 1000;

    .bv-logo {
      width: 0.54rem;
      height: 0.26rem;
      margin-right: 0.15rem;
    }

    .bv-search {
      width: 1rem;
      height: 0.3rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      position: relative;
      transition: width 0.3s linear;
    }

    .search-logo {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 0.15rem;
      height: 0.15rem;
      margin: auto 0.06rem;
    }

    .bv-search > input {
      width: 0.69rem;
      height: 0.29rem;
      font-size: 0.14rem;
      flex: 1 1 auto;
      border: 0.01rem solid #e2dfdf;
      border-radius: 0.15rem;
      padding: 0;
      padding-left: 0.25rem;
      padding-right: 0.05rem;
      background-color: #f7f7f7;
      outline: 0;
    }

    .bv-cancel {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      display: block;
      width: 0.4rem;
      height: 0.2rem;
      color: #757474;
      margin: auto 0.15rem;
      margin-left: 0;
      font-size: 0.13rem;
      text-align: right;
      line-height: 0.2rem;
    }

    .bv-tv {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      margin: auto 0.15rem;
      width: 0.3rem;
      height: 0.3rem;
    }
  }

  .bv-head {
    position: relative;
    width: 3.45rem;
    height: 1.08rem;
    border-radius: 0.04rem;
    margin: 0.18rem 0.15rem;
    margin-top: 0.7rem;
    background-color: #403a47;

    .carousel {
      position: absolute;
      left: 1.29rem;
      bottom: 0;
      width: 0.87rem;
      height: 1.23rem;
      border-radius: 0.1rem;
      z-index: 3;
    }
    .carousel > img {
      border-radius: 0.06rem;
    }

    .bv-1 {
      width: 0.67rem;
      height: 0.94rem;
      left: 0.82rem;
      z-index: 2;
    }

    .bv-3 {
      width: 0.67rem;
      height: 0.94rem;
      left: 1.98rem;
      z-index: 2;
    }
  }

  .tab-middle {
    width: calc(100% - 0.3rem);
    margin: 0 0.15rem;
    border-bottom: 0.01rem solid #c5c1c1;
    display: flex;
    justify-content: space-around;
  }

  .item {
    // flex: 1;
    height: 0.4rem;
    line-height: 0.4rem;
    font-size: 0.15rem;
    text-align: center;
    color: #656161;

    &.exact-active {
      color: #42b983;
      font-weight: normal;
      border-bottom: 0.01rem solid #191818;
    }
  }
}
</style>