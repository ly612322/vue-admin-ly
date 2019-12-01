<template>
  <div>
    <img :src="gif404" class="login-center-layout" />
    <h3>功能开发中...</h3>
  </div>
</template>

<script>
import gif404 from "../../assets/images/404.png"
export default {
  name: "home",
  data() {
    return {
      gif404
    }
  }
}
</script>
<style  scoped>
h3 {
  color: #000;
}
.login-center-layout {
  margin: 5% 0 0 20%;
  width: 40vw;
  height: 50vh;
  /*
  position: absolute;
  top: 30%;
  left: 40%;
  transform: translate(-10%)  */
  /* margin-top: 200px; */
}
</style>
