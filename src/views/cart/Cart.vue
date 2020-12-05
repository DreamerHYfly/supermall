<template>
   <div id="cart">
      <!-- 导航栏 -->
       <navbar class="navbar">
          <div slot="center">购物车({{length}})</div>
       </navbar>
       <!-- 商品列表 -->
      <cart-list></cart-list>
       <!-- 底部汇总 -->
      <cart-bottom-bar></cart-bottom-bar>
   </div>
</template>

<script>

   import {mapGetters} from 'vuex'
   import Navbar from 'components/common/navbar/Navbar.vue'
   import CartList from './childComps/CartList.vue'
   import CartBottomBar from './childComps/CartBottomBar.vue'

   export default {
      components: { Navbar,CartList, CartBottomBar, },
      data(){
         return {
         //          testTotal(){
         //    let cartCount = this.$store.state.cartList
         //    .filter(item => item.count)

         //    if(cartCount.length)
         //    for ( let i=0; i<cartCount.length ;i++){
         //       if(cartCount[i].checked)
         //    }
         //    else{
         //       return false
         //    }
            
         // },
         }
      },
      computed:{
         // ...mapGetters([
         //    'cartLength',
         //    'cartList'
         // ])
         ...mapGetters({
            length:'cartLength',
            list:'cartList'
         })

      }
   }
</script>

<style scoped>
#cart {
   height: 100vh;
}
.navbar {
   background-color: var(--color-tint);
   color: #fff;
}
</style>