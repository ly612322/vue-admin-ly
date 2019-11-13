<template>
    <div>
    <img :src="gif404" class="login-center-layout" />
   </div>
</template>

<script>
import gif404 from '../../assets/images/404.png'
export default {
  name: 'home',
  data() {
    return {
      gif404
    }
  }

}
</script>
<style  scoped>
.login-center-layout {
  margin: 0 auto;
  width:45vw;
  height: 50vh;
  position: absolute;
  top: 30%;
  left: 40%;
  transform: translate(-10%)
  /* margin-top: 200px; */
}

</style>
