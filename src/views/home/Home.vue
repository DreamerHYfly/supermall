<template>
   <div id="home">
      <navbar class="home-nav">
         <div slot="center">首页</div>
      </navbar>
      <tab-control   class="tab-control" 
                     :titles="['流行','新款','精选']" 
                     @tabclick="tabclick"
                     v-show="isTabFixed"
                     ref="tabControl1"></tab-control>
      <scroll  class="content" 
               ref="scroll" 
               :probe-type="3" 
               :pull-up-load="true"
               @scroll="contentScroll"
               @pullingUp="loadMore"
               >
         <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
         <recommend-view :recommends="recommends"></recommend-view>
         <feature-view></feature-view>
         <tab-control   class="tab-control" 
                        :titles="['流行','新款','精选']" 
                        @tabclick="tabclick"
                        ref="tabControl2"
                        ></tab-control>
         <goods-list :goods="showGoods"></goods-list>
      </scroll>
      <back-top @click.native="backClick" v-show="isShowBackTop"/>
      <!-- <div class="wrapper">
         <div class="content">
            <home-swiper :banners="banners"></home-swiper>
            <recommend-view :recommends="recommends"></recommend-view>
            <feature-view></feature-view>
            <tab-control   class="tab-control" 
                           :titles="['流行','新款','精选']" 
                           @tabclick="tabclick"></tab-control>
            <goods-list :goods="showGoods"></goods-list>
         </div>
      </div> -->
      
    
   </div>
</template>

<script>
import Navbar from 'components/common/navbar/Navbar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList.vue'
import BackTop from 'components/content/backTop/BackTop.vue'


import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/featureView'

import {getHomeMultidata,getHomeGoods} from 'network/home'
import {debounce} from 'common/utils'
import {itemListenerMixin,backTopMixin} from 'common/mixin'


import Scroll from 'components/common/scroll/Scroll.vue'
// import BScroll from 'better-scroll'


   export default {
      components:{
         Navbar,
         HomeSwiper,
         RecommendView,
         FeatureView,
         TabControl,
         GoodsList,
         Scroll,
         BackTop,
      },
      mixins:[itemListenerMixin,backTopMixin],
      data(){
         return {
            banners:{},
            recommends:{},
            goods:{
               pop:{page:0,list:[]},
               new:{page:0,list:[]},
               sell:{page:0,list:[]}
            },
            currentType:'pop',
            tabOffsetTop:0,
            isTabFixed:false,
            savey:0,
         }
      },
      methods:{
         /**
          * 网络监听相关方法
          */
         getHomeMultidata(){
            getHomeMultidata().then(res=>{
               this.banners=res.data.banner
               this.recommends=res.data.recommend
            })
         },
         getHomeGoods(type,page){
            page=this.goods[type].page+1;
            getHomeGoods(type,page).then(res=>{
               this.goods[type].list.push(...res.data.list)
               this.goods[type].page = page
            })
            setTimeout(()=>{
               this.$refs.scroll.finishPullUp()
            },2000)
         },
         /**
          * 事件监听相关方法
          */
         tabclick(index){
            switch (index){
               case 0:
                  this.currentType = 'pop';
                  break;
               case 1:
                  this.currentType = 'new';
                  break;
               case 2:
                  this.currentType = 'sell';
                  break;
            }
            this.$refs.tabControl1.currentIndex =
            this.$refs.tabControl2.currentIndex = index
         },
         
         contentScroll(position){
            // backtop是否显示
            this.isShowBackTop = !(position.y>-1000)

            // 决tabControl是否吸顶
            this.isTabFixed = (-position.y) > this.tabOffsetTop
         },
         loadMore(){
            this.getHomeGoods(this.currentType)
         },
         swiperImageLoad(){
            this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
         }
         
      },
      created(){
         this.getHomeMultidata(),

         this.getHomeGoods('pop',0),
         this.getHomeGoods('new',0),
         this.getHomeGoods('sell',0)

      },
      computed:{
         showGoods(){
            return this.goods[this.currentType].list
         }
      },
      mounted(){
      },
      activated(){
         this.$refs.scroll.scrollTo(0,this.savey);

         // 回来后再刷新下BScroll
         this.$refs.scroll.refresh()
      },
      deactivated(){
         this.savey=this.$refs.scroll.getScrollY()
         this.$bus.$off(this.refresh)
      }
   }
</script>

<style scoped>
#home {
   padding-top: 44px;
   height: 100vh;
   position: relative;
}
.home-nav {
   background-color: var(--color-tint);
   color: #fff;

   position: fixed;
   left: 0;
   right: 0;
   top: 0;
   z-index: 3;
}
.tab-control {
/* 可以自动改变sticky */
   position: sticky;
   top: 44px;

   z-index: 9;
}
/* .content {
   height: calc(100% - 93px);
   overflow: hidden;
   margin-top: 44px;
} */

.content {
   overflow: hidden;
   
   position: absolute;
   top: 44px;
   left: 0;
   right: 0;
   bottom: 49px;
}


</style>