<template>
   <div>
       <navbar>
          <div slot="left" class="back" @click="backClick">
            <img src="~assets/img/common/back.svg" alt="">
          </div>
          <div slot="center" class="title">
           <div v-for="(item,index) in titlelist" 
                :key="index" 
                class="titleitem"
                :class="{active:index===currentIndex}"
                @click="titleClick(index)">
              {{item}}
            </div>         
          </div>
       </navbar>
   </div>
</template>

<script>

import Navbar from 'components/common/navbar/Navbar.vue'
   export default {
     props:{
       
     },
    components: { Navbar },
    data(){
      return {
        titlelist:['商品','参数','评论','推荐'],
        currentIndex:0
      }
    },
    methods:{
      titleClick(index){
        this.currentIndex = index
        this.$emit('titleClick',index)
      },
      backClick(){
        this.$router.go(-1)
      }
    }
   }
</script>

<style scoped>
.title {
  display: flex;
  font-size: 13px;
}
.titleitem {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.back img {
  margin-top: 10px;
}
</style>