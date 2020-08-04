<template>
  <div class="bv-content">
    <Loading v-if="animates"></Loading>
    <ul class="bv-lis-coming">
      <li class="mv-coming-item" v-for="item in getComingData" :key="item.id">
        <!-- 电影图片 -->
        <div class="mv-bg-navar">
          <img :src="getImage(item.images)" class="auto-img" />
        </div>
        <!-- 电影信息 -->
        <div class="mv-coming-detial">
          <h3>{{item.title}}</h3>
          <p
            class="son-coming-title"
          >{{item.year}} / {{item.pubdates[0].slice(11).slice(0,-1)}} / {{getSort(item.genres)}} / {{getName(item.directors)}} / {{getName(item.casts)}}</p>
        </div>
        <!-- 操作 -->
        <div class="mv-coming-control">
          <button class="mv-coming-operate" @click="wantToSee(item)">想看</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Loading from "../components/Loading";
export default {
  data() {
    return {
      comingData: [],
      animates: true
    };
  },
  components: {
    Loading
  },
  watch: {
    comingData(newval) {
      if (newval.length > 0) {
        this.animates = false;
      }
    }
  },
  computed: {
    getComingData() {
      return this.comingData;
    }
  },
  methods: {
    wantToSee(data) {
      //判断本地有无该数据
      var wishData = JSON.parse(localStorage.getItem("wishData"));
      if (wishData.length > 0) {
        for (let i = 0; i < wishData.length; i++) {
          if (wishData[i].id == data.id) {
            return;
          }
        }
        //数据处理
        wishData.push(data);
        //数据存储本地
        localStorage.setItem("wishData", JSON.stringify(wishData));
      } else {
        //数据处理
        wishData.push(data);
        //数据存储本地
        localStorage.setItem("wishData", JSON.stringify(wishData));
      }
    },
    getName(arr) {
      let str = "";
      for (let i = 0; i < arr.length; i++) {
        str += arr[i].name + " ";
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
  },
  mounted() {
    this.$http("/apic/v2/movie/coming_soon").then(res => {
      this.comingData = res.data.subjects;
      console.log(this.comingData);
    });
  }
};
</script>

<style lang="scss" scoped>
.bv-content {
  margin: 0.15rem 0.15rem 0.5rem 0.15rem;
  overflow: hidden;

  .bv-lis-coming {
    width: 100%;
    overflow: hidden;
  }

  .mv-coming-item {
    width: 3.45rem;
    height: 1.2rem;
    border-bottom: 0.01rem solid #dad7d7;
    // background-color: #8c8989;
    display: flex;
    justify-content: row;
    align-items: center;
  }

  .mv-bg-navar {
    width: 0.7rem;
    height: 1rem;

    & > img {
      border-radius: 0.07rem;
    }
  }

  .mv-coming-detial {
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
    }

    .son-coming-title {
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

  .mv-coming-control {
    position: relative;
    width: 0.65rem;
    height: 0.9rem;
    flex: 0 1 auto;
    box-sizing: border-box;
    border-left: 0.005rem dashed #a9a7a7;

    .mv-coming-operate {
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
      border-radius: 0.04rem;
      background-color: white;
    }
  }
}
</style>