<template>
  <div class="today-movie">
    <ul class="movie-list" v-if="isRender">
      <li class="movie-item" v-for="item in nearCinema" :key="item.id">
        <!-- 标题 -->
        <h3 class="movie-title" @click="goSeat">
          {{item.title}}&nbsp;
          <span class="price">{{setMoneny()}}</span>
          <span class="small-size">元起</span>
        </h3>
        <!-- 地址 -->
        <div class="address">
          <span class="address-detail">{{item.address}}</span>
          <span class="distant">{{dealDistance(item._distance)}}</span>
        </div>
        <!-- 服务 -->
        <div class="movie-serve">
          <div class="allowRefund">退</div>
          <div class="endorse">改签</div>
          <div class="snack">小吃</div>
          <div class="vipTag">折扣卡</div>
        </div>
        <!-- 特惠 -->
        <div class="offer">
          <div class="offer-icon">
            <img src="../images/offer.png" class="auto-img" />
          </div>
          <p class="offer-word">特惠观影</p>
        </div>
        <!-- 折扣 -->
        <div class="discount-block">
          <div class="discount-icon">
            <img src="../images/card.png" class="auto-img" />
          </div>
          <p class="discount-word">开卡特惠，首单2张最高立减6元</p>
        </div>
        <!-- 近期场次 -->
        <h4 class="movie-time">近期场次: 09:45 | 12:05 | 14:00</h4>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return {
      isRender: true,
      nearCinema: []
    }
  },
  mounted() {
    this.$http(
      "/around/ws/place/v1/search?boundary=nearby(23.148719,113.453335,1000)&page_size=20&page_index=1&keyword=电影院&orderby=_distance&key=4SFBZ-GEWKX-VBB4V-7YRTU-2W342-S5F3H"
    ).then(res => {
      this.nearCinema = [...res.data.data];
      console.log('nearCinema==>',this.nearCinema);
    });
  },
  methods: {
    goSeat(){
      this.$router.push({name: 'buyticket'})
    },
    dealDistance(n){
      if(n>=0&&n<1000){
        return n + 'm';
      }
      else{
        return Number((n / 1000).toFixed(2)) + 'km';
      }
    },
    setMoneny(){
      // 30-60
      return (Math.random()*30+30).toFixed(1);
    }
  }
};
</script>

<style lang="scss" scoped>
.today-movie {
  width: 3.45rem;
  height: 4.328rem;
  margin: 0.13rem 0.15rem 0 0.15rem;
  overflow: auto;

  .movie-list {
    width: 3.45rem;
    overflow: hidden;
  }

  .movie-item {
    width: 3.45rem;
    // height: 1.16rem;
    overflow: hidden;
    padding: 0.13rem 0;
    border-bottom: 0.006rem solid #84828273;
  }
}

.movie-title {
  line-height: 0.23rem;
  font-size: 0.16rem;
  color: #fff;
  height: 0.23rem;
  font-family: PingFangSC-Regular, Hiragino Sans GB, sans-serif;

  .price {
    color: #f03d37;
  }

  .small-size {
    margin-left: 0.03rem;
    font-size: 0.11rem;
    color: #f03d37;
  }
}

.address {
  width: 3.45rem;
  height: 0.19rem;
  line-height: 0.19rem;
  margin-top: 0.06rem;
  font-size: 0.13rem;
  color: #666;

  .address-detail {
    display: block;
    width: 3rem;
    line-height: 0.19rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    float: left;
  }

  .distant {
    display: block;
    width: 0.35rem;
    line-height: 0.19rem;
    float: left;
  }
}

.movie-serve {
  height: 0.17rem;
  line-height: 0.17rem;
  margin: 0.04rem 0;
  overflow: hidden;
  font-size: 0;

  & > div {
    // position: relative;
    display: inline-block;
    padding: 0 0.03rem;
    margin: 0 0.05rem;
    height: 0.15rem;
    line-height: 0.15rem;
    border-radius: 0.02rem;
    font-size: 0.12rem;
  }

  & > .allowRefund,
  & > .endorse {
    color: #589daf;
    border: 0.01rem solid #589daf;
  }

  & > .snack,
  & > .vipTag {
    color: #f90;
    border: 0.01rem solid #f90;
  }
}

.discount-block,
.offer {
  width: 3.45rem;
  height: 0.21rem;
  margin-bottom: 0.04rem;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.discount-icon,
.offer-icon {
  width: 0.15rem;
  height: 0.14rem;
  margin-right: 0.05rem;
}

.discount-word,
.offer-word {
  height: 0.18rem;
  margin-left: 0;
  font-size: 0.11rem;
  color: #999;
  line-height: 0.18rem;
}

.movie-time {
  line-height: 0.18rem;
  font-size: 0.12rem;
  color: #999;
}
</style>