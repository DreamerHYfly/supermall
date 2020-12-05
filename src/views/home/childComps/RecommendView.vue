<template>
   <div class="recommend">
       <div v-for="(item,index) in recommends.list" :key="index" class="recomment-item">
         <a :href="item.link">
           <img :src="item.image" alt="">
           <div>{{item.title}}</div>
         </a>
       </div>
   </div>
</template>

<script>
   export default {
     props:{
       recommends:{
         type:Object,
         default(){
           return {

           }
         }
       }
     }
   }
</script>

<style scoped>
.recommend{
  display: flex;
  width: 100%;
  padding: 15px 0 30px;
  border-bottom: 10px solid #eee;
}
.recomment-item {
  flex: 1;
  text-align: center;
  font-size: 13px;
}
.recomment-item img {
  display: block;
  width: 80%;
  margin: 0 auto 10px;
}
</style>