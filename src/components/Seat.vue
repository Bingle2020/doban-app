<template>
  <div class="cinema-seat">
    <div class="seat-row" v-for="(v,i) in array" :key="i">
      <span class="row-num">{{i}}</span>
      <span v-for="(item,index) in v" :key="i+index" :style="getSeat(item)" @click="alter(i,index)"></span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blank: require("../images/white_seat.png"),
      red: require("../images/red_seat.png"),
      green: require("../images/green_seat.png")
    };
  },
  props: ["array"],
  methods: {
    //0-空座位 1-绿色已选座位 2-红色被别人选过的座位 4-无需处理
    getSeat(n) {
      let str = "";
      switch (n) {
        case 0:
          str += this.blank;
          break;
        case 1:
          str += this.green;
          break;
        case 2:
          str += this.red;
          break;
        default:
          return {};
      }
      return { backgroundImage: `url(${str})` };
    },
    alter(x,y){
        if(this.array[x][y] == 0){
            this.array[x].splice(y,1,1);
        }
        else if(this.array[x][y] == 1){
            this.array[x].splice(y,1,0);
        }
        else{
            return;
        }
    }
  }
};
</script>

<style lang="scss" scoped>
.cinema-seat {
  // width: 100%;
  // height: 100%;
  font-size: 0.15rem;
  overflow: hidden;

  .seat-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 3.5rem;
    height: 0.3rem;
    margin: 0 auto 0.1rem;

    span {
      display: inline-block;
      width: 0.3rem;
      height: 0.3rem;
      margin-left: 0.1rem;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      // flex: 1;
    }

    .row-num {
      margin-left: 0;
    }
  }
}
</style>