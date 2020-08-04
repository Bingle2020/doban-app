<template>
  <div class="star" :class="starType">
    <span v-for="(s,i) in scoreArr" :key="i" class="star-item" :class="s"></span>
  </div>
</template>

<script>
const LENGTH = 5;
const CLS_ON = "on";
const CLS_HALF = "half";
const CLS_OFF = "off";

export default {
  name: "Star",
  props: {
    score: [Number, String],
    size: [String, Number]
  },
  computed: {
    starType() {
      return "star-" + this.size;
    },
    scoreArr() {
      let mark = (Number(this.score) / 10) * 5;
      let val = Math.floor(mark * 2) / 2;
      // 3.5  0 1 2 3
      let arr = [];

      for (let i = 0; i < LENGTH; i++) {
        if (i < val && i + 1 <= val) {
          arr.push(CLS_ON);
        } else if (i < val && i + 1 > val) {
          arr.push(CLS_HALF);
        } else {
          arr.push(CLS_OFF);
        }
      }

      return arr;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/mixin";

.star {
  font-size: 0;
  display: flex;
  flex-direction: row;
  align-items: center;

  .star-item {
    display: inline-block;
    flex: 1;

    &:last-child {
      margin-right: 0;
    }

    &.on {
      @include bg-img("../images/star_on.png");
    }

    &.half {
      @include bg-img("../images/star_half.png");
    }

    &.off {
      @include bg-img("../images/star_off.png");
    }
  }

  &.star-18 {
    .star-item {
      width: 0.18rem;
      height: 0.18rem;
      margin-right: 0.03rem;
    }
  }

  &.star-14 {
    .star-item {
      width: 0.14rem;
      height: 0.14rem;
      margin-right: 0.03rem;
    }
  }
}
</style>