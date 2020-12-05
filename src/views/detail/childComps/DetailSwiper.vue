<template>
  <swiper>
    <swiper-item v-for="(item,index) in topImages" :key="index" class="swiper-item">
      <img :src="item" alt="" @load="detailSwiperLoad">
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper ,SwiperItem} from 'components/common/swiper'
   export default {
  components: {Swiper ,SwiperItem},
     props:{
       topImages:{
         type:Array,
         default(){
           return []
         }
       }
     },
     data(){
       return {
         isLoad:false
       }
     },
     methods:{
       detailSwiperLoad(){
         if(!this.isLoad){
           this.$emit('detailSwiperLoad')
           this.isLoad = true
         }
       }
     }

   }
</script>

<style scoped>
.swiper-item {
  height: 300px;
  overflow: hidden;
}
</style>