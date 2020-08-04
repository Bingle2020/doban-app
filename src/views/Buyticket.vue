<template>
  <div class="Movie-hall">
    <!-- 头部 -->
    <div class="hall-nav">
      <div class="hall-back">
        <img src="../images/back.png" class="auto-img" @click="$router.go(-1)"/>
      </div>
      <h2 class="hall-title">大地影院（奥体高德美居店）</h2>
    </div>
    <!-- 标题信息 -->
    <div class="movie-title">
      <h3 class="movie-name">少年的你</h3>
      <h5 class="movie-info">2019-10-29 20:00 国语2D</h5>
    </div>
    <!-- 影厅 -->
    <div class="select-seat">
      <h3 class="hall-num">7号厅(激光)</h3>
      <div class="movie-seat">
        <Seat :array="arr"></Seat>
      </div>
      <!-- 购票确认 -->
      <button class="btn-buy" @click="sureTickets($event)">购买</button>
    </div>
    
  </div>
</template>

<script>
import Seat from "../components/Seat"
export default {
  data(){
    return {
      arr: [
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]
        ]
    }
  },
  components: {
    Seat
  },
  methods: {
    sureTickets(event){
      console.log('点击了');
      for(let i = 0;i < this.arr.length; i++)
        for(let j = 0;j < this.arr[i].length; j++){
          if(this.arr[i][j] == 1){
            this.arr[i].splice(j,1,2)
          }
        }

      event.target.setAttribute("disabled","disabled");
      event.target.style.backgroundColor = '#948f8f';
      event.target.textContent = '已购买';
    }
  }
}
</script>

<style lang="scss" scoped>
.Movie-hall {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;

  .hall-nav {
    height: 0.5rem;
    background-color: #e54847;
    position: relative;
    color: #fff;
    font-size: 18px;
    font-weight: 400;
    text-align: center;

    .hall-title {
      width: 2.7rem;
      height: 0.5rem;
      line-height: 0.5rem;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      margin: auto;
      z-index: 2;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    .hall-back {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      z-index: 5;
      margin: auto 0;
      width: 0.3rem;
      height: 0.28rem;
    }
  }

  .movie-title {
    width: 3.75rem;
    height: 0.73rem;
    padding: 0.15rem;
    border-bottom: 0.006rem solid #bfbebe;

    .movie-name {
      width: 3rem;
      height: 0.24rem;
      line-height: 0.24rem;
      font-size: 0.16rem;
      font-weight: 700;
      color: #333;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .movie-info {
      font-size: 0.13rem;
      padding-top: 0.02rem;
      line-height: 1;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      color: #777;
    }
  }
}

.select-seat {
  width: 3.75rem;
  // height: 3.6rem;
  overflow: hidden;

  .hall-num {
    width: 2rem;
    height: 0.18rem;
    line-height: .18rem;
    margin: 0 auto .5rem;
    font-size: .14rem;
    color: #777;
    text-align: center;
    background: #e3e3e3;
    border-radius: 0 0 .30rem .30rem;
  }

  .movie-seat{
    overflow: hidden;
  }
}

.btn-buy{
  width: 3.75rem;
  height: .55rem;
  background-color: #f00;
  color: #fff;
  font-size: .2rem;
  font-weight: 400;
}
</style>