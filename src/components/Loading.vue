<template>
  <div class="spinner-box">
    <div class="solar-system">
      <div class="earth-orbit orbit">
        <div class="planet dot_1 earth"></div>
        <div class="venus-orbit orbit">
          <div class="planet dot_2 venus"></div>
          <div class="mercury-orbit orbit">
            <div class="planet dot_3 mercury"></div>
            <div class="sun"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes spin {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(359deg);
  }
}

.spinner-box {
  width: 3.45rem;
  height: 3.15rem;
  margin: .15rem .15rem .5rem .15rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
}

.solar-system {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.orbit {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: .01rem solid #ffffffa5;
  border-radius: 50%;
}

.earth-orbit {
  width: 1.65rem;
  height: 1.65rem;
  -webkit-animation: spin 12s linear 0s infinite;
}

.venus-orbit {
  width: 1.2rem;
  height: 1.2rem;
  -webkit-animation: spin 7.4s linear 0s infinite;
}

.mercury-orbit {
  width: .9rem;
  height: .9rem;
  -webkit-animation: spin 3s linear 0s infinite;
}

.planet {
  position: absolute;
  top: -.05rem;
  width: .1rem;
  height: .1rem;
  border-radius: 50%;
  
  &.dot_1{
    background-color: red;
  }

  &.dot_2{
    background-color: green;
  }

  &.dot_3{
    background-color: yellow;
  }
}

.sun {
  width: .35rem;
  height: .35rem;
  border-radius: 50%;
  background-color: #22f1ee;
}
</style>