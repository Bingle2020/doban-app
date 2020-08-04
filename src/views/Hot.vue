<template>
  <div class="bv-content">
    <Loading v-if="animates"></Loading>
    <ul class="bv-lis-hot" v-else>
      <li class="mv-hot-item" v-for="item in getArrData" :key="item.id">
        <!-- 电影图片 -->
        <div class="mv-bg">
          <img :src="getImage(item.images)" class="auto-img" />
        </div>
        <!-- 电影信息 -->
        <div class="mv-detial">
          <h3>{{item.title}}</h3>
          <div class="mv-score">
            <Star :score="item.rating.average" size="18"></Star>
            <span class="mv-score-number">{{item.rating.average}}</span>
          </div>
          <p
            class="son-title"
          >{{item.year}} / {{item.pubdates[0].slice(11).slice(0,-1)}} / {{getSort(item.genres)}} / {{getName(item.directors)}} / {{getName(item.casts)}}</p>
        </div>
        <!-- 操作 -->
        <div class="mv-control">
          <button class="mv-operate" @click="buyTick(item)">购票</button>
        </div>

        <div class="mv-wrapper" @click="turnOfDetial(item.id,nowCity)"></div>
      </li>
    </ul>
  </div>
</template>

<script>
import Loading from "../components/Loading";
import Star from "../components/Star";

export default {
  data() {
    return {
      nowCity: "广州",
      startIndex: 0,
      getNum: 10,
      arrData: [],
      animates: true
    };
  },
  components: {
    Loading,
    Star
  },
  watch: {
    arrData(newval) {
      if (newval.length > 0) {
        this.animates = false;
      }
    }
  },
  computed: {
    getArrData() {
      return this.arrData;
    }
  },
  mounted() {
    this.$http(
      `/apix/v2/movie/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b&city=${this.nowCity}&start=${this.startIndex}&count=${this.getNum}&client=&udid=`
    ).then(res => {
      this.arrData = res.data.subjects;
    });

    // console.log(this.arrData);
    // 初始化拿取30条数据
  },
  // https://api.douban.com/v2/movie/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b&city=广州&start=0&count=30&client=&udid=
  methods: {
    buyTick(info) {
      //数据存储本地
      localStorage.setItem('mvsData', JSON.stringify(info));
      
      this.$router.push({ name: "cinema", params: { mvsData: info} });
      console.log(info);
    },
    turnOfDetial(id, city) {
      this.$router.push({
        name: "details",
        params: {
          mvId: id,
          nCity: city
          // path: this.$route.path
        }
      });
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
    },
    getName(arr) {
      let str = "";
      for (let i = 0; i < arr.length; i++) {
        str += arr[i].name + " ";
      }
      return str.slice(0, -1);
    }
  }
};
</script>

<style lang="scss" scoped>
.bv-content {
  margin: 0.15rem 0.15rem 0.5rem 0.15rem;
  overflow: hidden;

  .bv-lis-hot {
    width: 100%;
    overflow: hidden;
  }

  .mv-hot-item {
    position: relative;
    width: 3.45rem;
    height: 1.2rem;
    border-bottom: 0.01rem solid #dad7d7;
    // background-color: #8c8989;
    display: flex;
    justify-content: row;
    align-items: center;

    .mv-wrapper {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      margin: auto 0;
      width: 2.812rem;
      height: 1rem;
    }
  }

  .mv-bg {
    width: 0.7rem;
    height: 1rem;

    & > img {
      border-radius: 0.07rem;
    }
  }

  .mv-detial {
    width: 1.9rem;
    height: 0.9rem;
    margin: 0 0.13rem;
    // border: 0.01rem solid black;
    box-sizing: content-box;

    & > h3 {
      height: 0.2rem;
      line-height: 0.2rem;
      font-size: 0.17rem;
      color: black;
      text-align: left;
      font-weight: 600;
      letter-spacing: 0.01rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .mv-score {
      position: relative;
      width: 1.35rem;
      height: 0.18rem;
      margin: 0.05rem 0;
      box-sizing: content-box;
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .mv-score-number {
      position: absolute;
      right: 0;
      top: 0;
      display: block;
      width: 0.2rem;
      height: 0.18rem;
      line-height: 0.18rem;
      font-size: 0.15rem;
      color: black;
      text-align: center;
    }

    .son-title {
      width: 1.7rem;
      line-height: 0.2rem;
      font-size: 0.15rem;
      color: black;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }

  .mv-control {
    position: relative;
    width: 0.65rem;
    height: 0.9rem;
    flex: 0 1 auto;
    box-sizing: border-box;

    .mv-operate {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 0.6rem;
      height: 0.3rem;
      font-size: 0.16rem;
      font-weight: 400;
      font-family: sans-serif;
      margin: auto;
      border: 0.01rem solid #03a9f4;
      border-radius: 0.04rem;
      background-color: white;
    }
  }
}
</style>