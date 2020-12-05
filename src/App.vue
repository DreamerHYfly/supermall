<template>
  <div>
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <MianTabbar></MianTabbar>

  </div>
</template>

<script>
import MianTabbar from "components/content/mainTabbar/mianTabbar.vue";
export default {
  name: 'App',
  components: {
    MianTabbar
  }
}
</script>

<style>
@import 'assets/css/base.css';
</style>
