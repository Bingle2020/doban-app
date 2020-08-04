<template>
  <div class="detail-wrapper">
    <div class="detail-mv-header" v-if="getData">
      <div class="detail-header-img">
        <img :src="getImage(getData().images)" class="auto-img" v-if="true" />
      </div>
      <div class="detail-information">
        <h3 class="detail-information-title">{{getData().title}}</h3>
        <h4 class="detail-information-year play-year">({{getData().year}})</h4>
        <p
          class="detail-information-sort"
          v-if="true"
        >{{getData().pubdates[0].slice(11,-1)}} / {{getCountries(getData().genres)}} / 上映时间 : {{getData().pubdates[getData().pubdates.length-1]}} / 片长 : {{getData().durations[0]}}</p>
      </div>
    </div>
    <div class="time-tabbar">
      <router-link to="/cinema/today" tag="div" class="time-item">今天{{month}}月{{date}}日</router-link>
      <router-link to="/cinema/tomorrow" tag="div" class="time-item">明天{{month}}月{{date+1}}日</router-link>
      <router-link to="/cinema/last" tag="div" class="time-item">后天{{month}}月{{date+2}}日</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      month:
        new Date().getMonth() + 1 >= 10
          ? new Date().getMonth() + 1
          : "0" + new Date().getMonth() + 1,
      date: new Date().getDate() ///>= 10? new Date().getDate(): "0" + new Date().getDate()
    };
  },
  mounted() {
    // { name: "today", params: { mvsData: this.mvsData } }
    this.$router.push({ name: "today", params: { mvsData: this.mvsData } });
  },
  props: {
    mvsData: {}
  },
  methods: {
    getData() {
      return JSON.parse(localStorage.getItem("mvsData"));
    },
    getCountries(arr) {
      let str = "";
      for (let i = 0; i < arr.length; i++) {
        str += arr[i] + " ";
      }
      return str.slice(0, -1);
    },
    getSort(arr) {
      let str = "";
      for (let i = 0; i < arr.length; i++) {
        str += arr[i] + " / ";
      }
      return str.slice(0, -3);
    },
    getImage(obj) {
      for (let key in obj) {
        if (obj[key]) {
          return obj[key];
        }
      }
      return "../images/p1.webp";
    }
  }
};
</script>

<style lang="scss" scoped>
.detail-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 6;
  background-color: #314a4c;

  // .pur-wrapper{
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   width: 3.75rem;
  //   height: 1.75rem;
  // }
}

.detail-mv-header {
  width: 3.45rem;
  height: 1.45rem;
  margin: 0.15rem;
  position: relative;

  .detail-header-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 1.02rem;
    height: 1.45rem;
    margin-right: 0.15rem;

    & > img {
      border-radius: 0.06rem;
      box-shadow: 0.03rem 0.03rem 0.2rem 0.01rem #1312128a;
    }
  }

  .detail-information {
    position: absolute;
    top: 0;
    right: 0;
    width: 2.28rem;
    height: 1.45rem;
    display: flex;
    flex-direction: column;

    .detail-information-title,
    .detail-information-year {
      width: 100%;
      height: 0.32rem;
      line-height: 0.32rem;
      color: white;
      font-size: 0.23rem;
      font-weight: 400;
      letter-spacing: 0.02rem;
    }

    .play-year {
      height: 0.21rem;
      line-height: 0.21rem;
      font-size: 0.15rem;
      letter-spacing: 0;
    }

    .detail-information-sort {
      line-height: 0.25rem;
      padding: 0.05rem 0;
      font-size: 0.15rem;
      color: rgba(255, 255, 255, 0.7);
      font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
  }
}

.time-tabbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  line-height: 0.45rem;
  color: white;
  text-align: center;
  border-bottom: 0.006rem solid #d8d5d57d;
  font-size: 0.16rem;

  .time-item {
    flex: 1;

    &.exact-active {
      color: #42b983;
      font-weight: normal;
    }
  }
}
</style>