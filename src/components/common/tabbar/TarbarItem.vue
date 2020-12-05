<template>
  <div class="tabbar-item" @click="itemClick">
    <div v-if="!isActive"><slot  name="item-icon"></slot></div>
    <div v-else><slot  name="item-icon_active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
   export default {
     props:{
       path : String,
       activeColor:{
         type:String,
         default:'deeppink'
       }
     },
     data() {
       return {
       }
     },
     computed: {
        isActive(){
         return this.$route.path.indexOf(this.path) !=-1
        },
        activeStyle(){
        return this.isActive?{color:this.activeColor}:{}
        }
     },
     methods: {
       itemClick(){
        //  console.log(this.path);
        if(this.$route.path.indexOf(this.path) ==-1)
          this.$router.replace(this.path)
        },
        
     },
     
   }
</script>

<style scoped>
.tabbar-item {
  flex: 1;
  height: 49px;
  text-align: center;
  font-size: 14px;
}
.tabbar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
}
.active {
  color: deeppink;
}
</style>