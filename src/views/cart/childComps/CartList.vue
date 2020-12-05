<template>
   <div class="cart-list">
     <scroll class="content" ref="scroll">
       <cart-list-item v-for="(item,index) in cartList" :key="index" :product="item"></cart-list-item>
     </scroll>
   </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Scroll from 'components/common/scroll/Scroll.vue'
    import CartListItem from './CartListItem.vue'

   export default {
  components: { Scroll,CartListItem,},
     computed:{
       ...mapGetters(['cartList'])
     },
     activated() {
       this.$refs.scroll.refresh()
     }
   }
</script>

<style scoped>
.content {
  height:calc(100vh - 89px - 44px);
  overflow: hidden;
}
</style>