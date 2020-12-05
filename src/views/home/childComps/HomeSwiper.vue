<template>
   <swiper>
    <swiper-item v-for="(item,index) in banners.list" :key="index">
       <a :href="item.link">
          <img :src="item.image" alt="" @load="itemload">
       </a>
    </swiper-item>
  </swiper>
</template>

<script>


import {Swiper, SwiperItem} from 'components/common/swiper'
   export default {
     name:'homeSwiper',
     props:{
      banners:{
        type:Object,
        default(){
          return {
            isLoad:false
          }
        }
      },
     },
    components:{
      Swiper, SwiperItem
    },
    methods:{
      itemload(){
        if(!this.isLoad){
          this.$emit('swiperImageLoad')
          this.isLoad = true
        }
        
      }
    }
    
   }
</script>

<style scoped>

</style>