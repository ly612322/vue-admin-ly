<template>
  <div>
    <transition mode="out-in" name="dialog">
    <errorpage></errorpage>    
    </transition>
  </div>
</template>

<script>
import errorpage from "../error-page/404"
export default {
  name: "home",
  components: {
    errorpage
  }
}
</script>

