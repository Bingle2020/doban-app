<template>
  <div class="mv-hot-details">
    <!-- 详情页顶部 -->
    <div class="detail-nav">
      <div class="detail-nav-back detail-left">
        <img src="../images/back.png" class="auto-img" @click="goBackPre" />
      </div>
      <h3 class="detail-title">电影</h3>
      <div class="detail-set detail-right">
        <img src="../images/Dot.png" class="auto-img" />
      </div>
    </div>
    <!-- 详情页内容盒子 -->
    <div class="detail-content">
      <div class="detail-content-move">
        <!-- 头部 -->
        <div class="detail-mv-header">
          <div class="detail-header-img">
            <img :src="getImage(introData.images)" class="auto-img" />
          </div>
          <div class="detail-information">
            <h3 class="detail-information-title">{{introData.title}}</h3>
            <h4 class="detail-information-year play-year">({{introData.year}})</h4>
            <p
              class="detail-information-sort"
            >{{getCountries(introData.countries)}} / {{getSort(introData.genres)}} / 上映时间 : {{introData.pubdates[0]}} / 片长 : {{introData.durations[0]}}</p>
            <div class="detail-information-operates">
              <div class="detail-want gap">
                <i class="detail-icon want-icon" :style="{backgroundImage: `url(${bgImage[0]})`}"></i>
                <span class="detail-sp" @click="wantSee(introData)">想看</span>
              </div>
              <div class="detail-wanted">
                <i class="detail-icon wanted-icon" :style="{backgroundImage: `url(${bgImage[1]})`}"></i>
                <span class="detail-sp" @click="haveSeen(introData)">看过</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 评分 -->
        <div class="detail-mv-score">
          <h5 class="detail-score-title">云播评分</h5>
          <p class="detail-max-score">{{introData.rating.average}}</p>
          <div class="detail-score-star">
              <Star :score="introData.rating.average" :size="14"></Star>
          </div>
        </div>
        <!-- 剧情简介 -->
        <div class="detail-summary">
          <h2 class="summary-word">简介</h2>
          <p
            class="summary-content"
          >{{introData.summary}}</p>
          <p class="extend-content">展开</p>
        </div>
        <!-- 演职员 -->
        <div class="detail-actors">
          <h2 class="actor-title">演职员</h2>
          <div class="actor-content">
            <ul class="actors-move">
              <!-- 导演列表 -->
              <li class="actor-item" v-for="val in introData.directors" :key="val.id">
                <div class="actor-img">
                  <img :src="getImage(val.avatars)" class="auto-img" />
                </div>
                <span class="actor-name">{{val.name}}</span>
                <span class="actor-sort">导演</span>
              </li>   
              <!-- 演员列表 -->
              <li class="actor-item" v-for="v in introData.casts" :key="v.id">
                <div class="actor-img">
                  <img :src="getImage(v.avatars)" class="auto-img" />
                </div>
                <span class="actor-name">{{v.name}}</span>
                <span class="actor-sort">演员</span>
              </li>            
            </ul>
          </div>
        </div>
        <!-- 短评 -->
        <div class="detail-comment">
          <h3 class="comment-title">短评</h3>
          <ul class="comments-box">
            <li class="comment-item" v-for="vs in introData.popular_comments" :key="vs.author.id">
              <!-- 评论的头部 -->
              <div class="comment-writer">
                <div class="comment-avatar">
                  <img :src="vs.author.avatar" class="auto-img">
                </div>
                <div class="comment-title-time">
                  <h3 class="nick-name">{{vs.author.name}}</h3>
                  <h5 class="write-time">{{vs.created_at}}</h5>
                </div>
              </div>
              <!-- 评论的内容 -->
              <p class="comment-content">{{vs.content}}</p>
            </li>
          </ul>
        </div>
        <!-- 空白 -->
        <div class="bank"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Star from "../components/Star"
export default {
  data() {
    return {
      introData: {
        pubdates: [],
        genres: [],
        countries: [],
        rating: {average: ''},
        durations: []
      },
      bgImage: [
        require("../images/want_see.png"),
        require("../images/wanted.png")
      ]
    };
  },
  components: {
    Star
  },
  props: {
    mvId: [Number, String],
    nCity: String,
    path: [String, Object, Array]
  },
  mounted() {
    console.log("mvId==>", this.mvId);
    this.axios(
      `/apij/v2/movie/subject/${this.mvId}?apikey=0b2bdeda43b5688921839c8ecb20399b&city=${this.nCity}&client=&udid=`
    ).then(res => {
      this.introData = res.data;
      console.log(this.introData);
    });
  },
  methods: {
    wantSee(data){
      //判断本地有无该数据
      var wishData = JSON.parse(localStorage.getItem('wishData'));
      if(wishData.length > 0){
        for(let i = 0;i < wishData.length; i++){
          if(wishData[i].id == data.id){
            return;
          }
        }
        //数据处理
        wishData.push(data);
        //数据存储本地
        localStorage.setItem('wishData', JSON.stringify(wishData));
      }else{
        //数据处理
        wishData.push(data);
        //数据存储本地
        localStorage.setItem('wishData', JSON.stringify(wishData));
      } 
    },
    haveSeen(data){
      //判断本地有无该数据
      var seenData = JSON.parse(localStorage.getItem('seenData'));
      if(seenData.length > 0){
        for(let i = 0;i < seenData.length; i++){
          if(seenData[i].id == data.id){
            return;
          }
        }
        //数据处理
        seenData.push(data);
        //数据存储本地
        localStorage.setItem('seenData', JSON.stringify(seenData));
      }else{
        //数据处理
        seenData.push(data);
        //数据存储本地
        localStorage.setItem('seenData', JSON.stringify(seenData));
      } 
    },
    goBackPre() {
      this.$router.go(-1);
    },
    getCountries(arr) {
      let str = "";
      for (let i = 0; i < arr.length; i++) {
        str += arr[i] + " ";
      }
      return str.slice(0, -1);
    },
    getImage(obj) {
      for (let key in obj) {
        if (obj[key]) {
          return obj[key];
        }
      }
      return "../images/p1.webp";
    },
    getSort(arr) {
      let str = "";
      for (let i = 0; i < arr.length; i++) {
        str += arr[i] + " ";
      }
      return str.slice(0, -1);
    }
  }
};
</script>

<style lang="scss" scoped>
.mv-hot-details {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 0.15rem 0.15rem 0.15rem;
  background-color: #314a4c;
  z-index: 10;
}

.detail-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 0.45rem;
  display: flex;
  justify-content: row;
  align-items: center;

  .detail-nav-back,
  .detail-set {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 2;
    margin: auto 0;
    width: 0.3rem;
    height: 0.3rem;

    &.detail-left {
      left: 0.15rem;
    }

    &.detail-right {
      right: 0.15rem;
    }
  }

  .detail-title {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    margin: auto;
    text-align: center;
    height: 0.3rem;
    line-height: 0.3rem;
    font-size: 0.19rem;
    font-weight: 400;
    color: white;
  }
}

.detail-content {
  margin: 0.45rem 0 0 0;
  width: 3.45rem;
  height: 6.07rem;
  overflow: auto;

  .detail-content-move {
    overflow: hidden;
  }
}

.detail-mv-header {
  width: 3.45rem;
  height: 1.45rem;
  margin: 0.15rem 0;
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
      line-height: 0.21rem;
      padding: 0.05rem 0;
      font-size: 0.11rem;
      color: rgba(255, 255, 255, 0.7);
      font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }

  .detail-information-operates {
    width: 2.3rem;
    height: 0.3rem;
    display: flex;
    flex-direction: row;

    .detail-want,
    .detail-wanted {
      width: 1.1rem;
      height: 0.3rem;
      border-radius: 0.04rem;
      background-color: #fff;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    .gap {
      margin-right: 0.08rem;
    }
  }

  .detail-icon {
    display: block;
    width: 0.14rem;
    height: 0.14rem;
    margin-right: 0.05rem;

    &.want-icon,
    &.wanted-icon {
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  .detail-sp {
    display: block;
    width: 0.26rem;
    height: 0.13rem;
    line-height: 0.13rem;
    font-size: 0.13rem;
    color: #191919;
    text-align: center;
    font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif;
  }
}

.detail-mv-score {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 0.06rem;
  padding: 0.1rem 0.15rem 0.13rem;
  margin-bottom: 0.3rem;
  overflow: hidden;

  .detail-score-title {
    position: relative;
    font-size: 0.11rem;
    color: #fff;
    line-height: 0.26rem;
    margin-bottom: 0.01rem;

    &::before {
      content: "YB";
      display: inline-block;
      font-size: 0.1rem;
      position: absolute;
      line-height: 0.26rem;
      left: 0.48rem;
      top: -0.01rem;
      font-style: normal;
      -webkit-transform: scale(0.7);
      transform: scale(0.7);
      font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif;
    }
  }

  .detail-max-score {
    font-size: 0.36rem;
    line-height: 0.5rem;
    font-weight: normal;
    text-align: center;
    color: #fff;
  }

  .detail-score-star {
    width: 1rem;
    overflow: hidden;
    margin: 0 auto;
    // border: 0.01rem dashed goldenrod;
  }
}

.detail-summary {
  width: 3.45rem;
  height: 1.16rem;
  margin-bottom: 0.2rem;

  .summary-word {
    color: #fff;
    margin: 0 0 0.15rem;
    font-size: 0.15rem;
    font-weight: normal;
    font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif;
  }

  .summary-content {
    font-size: 0.15rem;
    color: #fff;
    line-height: 0.22rem;
    text-indent: 0.1rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }

  .extend-content {
    font-size: 0.15rem;
    color: #42bd56;
    line-height: 0.22rem;
    text-align: right;
  }
}

.detail-actors {
  width: 3.45rem;
  height: 1.77rem;
  margin-bottom: 0.3rem;
  color: #fff;

  .actor-title {
    margin: 0 0 0.15rem;
    font-size: 0.15rem;
    font-weight: normal;
  }

  .actor-content {
    width: 3.45rem;
    height: 1.42rem;
    overflow-x: auto;

    .actors-move {
      width: 24rem;
      height: 1.42rem;
      overflow-x: hidden;
    }
  }

  .actor-item {
    width: 0.7rem;
    margin-right: 0.1rem;
    color: #fff;
    float: left;

    &:last-child{
      margin-right: 0;
    }

    .actor-img {
      width: 0.7rem;
      height: 1rem;
    }

    .actor-img>img{
      border-radius: .04rem;
    }

    .actor-name {
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      font-size: 0.11rem;
      line-height: 1.4;
      white-space: normal;
      text-align: center;
      margin-top: 0.05rem;
      font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif;
    }

    .actor-sort {
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      font-size: .11rem;
      line-height: 1.4;
      white-space: normal;
      text-align: center;
      color: #818181;
      margin-top: .05rem;
      font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif;
    }
  }
}

.detail-comment{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 3.45rem;
  border-radius: .05rem;
  background-color: #233435;

  .comment-title{
    width: 3.15rem;
    padding-top: 15px;
    color: #fff;
    margin: 0 0 15px;
    font-size: 15px;
    font-weight: 600;
    font-family: "Helvetica Neue",Helvetica,Roboto,Arial,sans-serif;
  }

  .comments-box{
    width: 3.15rem;
    display: flex;
    flex-direction: column;

    .comment-item{
      width: 100%;
      overflow: hidden;
      border-bottom: .01rem solid #ece9e952;
      padding: .15rem 0;
    }

    .comment-item:last-child{
      border-bottom: 0;
    }
  }

  .comment-writer{
    width: 3.15rem;
    height: .34rem;
    display: flex;
    flex-direction: row;
    align-items: center;

    .comment-avatar{
      width: .3rem;
      height: .3rem;
      margin-right: .08rem;
    }

    .comment-avatar>img{
      border-radius: 50%;
    }

    .comment-title-time{
      width: 2.73rem;
      height: .34rem;
      flex: 0 1 auto;
      color: #fff;
    }

    .nick-name{
      font-size: 0.17rem;
      font-weight: normal;
      margin-bottom: .04rem;
    }

    .write-time{
      font-size: 0.12rem;
      font-weight: normal;
      color: #b1afaf;
      letter-spacing: .01rem;
    }
  }

  .comment-content{
    font-size: 0.15rem;
    color: #fff;
    line-height: 0.22rem;
  }
}

.bank{
  width: 3.45rem;
  height: 5rem;
}
</style>