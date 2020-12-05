<template>
   <tarbar>
      <tarbarItem path='/home'>
        <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="" >
        <img slot="item-icon_active" src="~assets/img/tabbar/home_active.svg" alt="" >
        <div slot="item-text">首页</div>
      </tarbarItem>
      <tarbarItem path='/category'>
        <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="">
        <img slot="item-icon_active" src="~assets/img/tabbar/category_active.svg" alt="">
        <div slot="item-text">分类</div>
      </tarbarItem>
      <tarbarItem path='/cart'>
        <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt="">
        <img slot="item-icon_active" src="~assets/img/tabbar/shopcart_active.svg" alt="">
        <div slot="item-text">购物车</div>
      </tarbarItem>
      <tarbarItem path='/profile'>
        <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="">
        <img slot="item-icon_active" src="~assets/img/tabbar/profile_active.svg" alt="">
        <div slot="item-text">我的</div>
      </tarbarItem>
    </tarbar>
</template>

<script>
import tarbar from 'components/common/tabbar/Tarbar'
import tarbarItem from 'components/common/tabbar/TarbarItem'
   export default {
      name:'maintabbar',
      components:{
        tarbar,
        tarbarItem
      }
   }
</script>

<style scoped>

</style>