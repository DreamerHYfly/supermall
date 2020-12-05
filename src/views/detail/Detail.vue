<template>
   <div id="detail">
       
       <detail-nav-bar class="detail-navbar" ref="nav" @titleClick = "titleClick"></detail-nav-bar>
       <scroll class="content" 
               ref="scroll" 
               :probe-type="3"
               @scroll="contentScroll">
        <detail-swiper ref="swiper" :topImages="topImages" @detailSwiperLoad="detailSwiperLoad"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
        <detail-param-info ref="params" :paramInfo="paramInfo"></detail-param-info>
        <detail-commend-info ref="comment" :commentInfo="commentInfo"></detail-commend-info>
        <goods-list ref="recommend" :goods="recommends"/>
       </scroll>
       <back-top @click.native="backClick" v-show="isShowBackTop"/>
       <detail-bottom-bar @addToCart="addToCart"/>
   </div>
</template>

<script>
import { mapActions } from 'vuex'

import Scroll from 'components/common/scroll/Scroll.vue'

import {getDetail, Goods, Shop, GoodsParam,getRecommend} from 'network/detail'

import {debounce} from 'common/utils'
import {itemListenerMixin,backTopMixin} from 'common/mixin'

import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommendInfo from './childComps/DetailCommendInfo.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'




   export default {
     name:'Detail',
    components: { 
      DetailNavBar, 
      DetailSwiper, 
      DetailBaseInfo, 
      DetailShopInfo, 
      DetailGoodsInfo, 
      DetailParamInfo, 
      DetailCommendInfo,
      Scroll,
      GoodsList,
      DetailBottomBar,
    },
        
    mixins:[itemListenerMixin,backTopMixin],
    data(){
      return {
        iid :null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        themeTops:[],
        initTopde:null,
        currentIndex:-1,
      }
    },
    created(){
      this.iid = this.$route.params.id;
      // 请求详情数据
      getDetail(this.iid).then(res=>{
        this.topImages = res.result.itemInfo.topImages
        // console.log(res.result);
        let data = res.result
        // 获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        // 获取店铺信息
        this.shop = new Shop(data.shopInfo)
        // 保存商品详情数据
        this.detailInfo = data.detailInfo;
        // 获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        // 取出评论信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }
      }),
      //请求推荐数据
      getRecommend().then(res=>{
        this.recommends = res.data.list
      })

    },
    // updated(){
    //   this.themeTops = []

    //   this.themeTops.push(0);
    //   this.themeTops.push(this.$refs.params.$el.offsetTop)
    //   this.themeTops.push(this.$refs.comment.$el.offsetTop)
    //   this.themeTops.push(this.$refs.recommend.$el.offsetTop)

    //   console.log(this.themeTops);
    // },
    methods:{
      ...mapActions([
        'addCart'
      ]),
      detailSwiperLoad (){
        // this.$refs.scroll.refresh()
      },
      imageLoad(){
        // this.$refs.scroll.refresh()
        this.initTop()
      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0,-this.themeTops[index],300)
      },
      contentScroll(position){
        // backtop是否显示
        this.isShowBackTop = !(position.y>-1000)
        
        let positionY = -position.y;

        for(let i = 0 ;i<this.themeTops.length;i++){
          if(this.currentIndex !== i && positionY>=this.themeTops[i]&&positionY<this.themeTops[i+1]){
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
      },
      initTop(){
        let init = this.$refs.swiper.$el.offsetTop
        this.themeTops = []
        this.themeTops.push(0);
        this.themeTops.push(this.$refs.params.$el.offsetTop-init)
        this.themeTops.push(this.$refs.comment.$el.offsetTop-init)
        this.themeTops.push(this.$refs.recommend.$el.offsetTop-init)
        this.themeTops.push(Number.MAX_VALUE)
      },
      addToCart(){
        // 1.创建对象
        const obj = {}
        // 2.对象信息
        obj.iid = this.iid;
        obj.imgURL = this.topImages[0]
        obj.title = this.goods.title
        obj.desc = this.goods.desc;
        obj.newPrice = this.goods.realPrice;
        obj.checked = true

        // this.$store.commit('addCart',obj)
        // this.$store.dispatch('addCart',obj).then(res=>{
        //   console.log(res);
        // })

        this.addCart(obj).then(res=>{
          // this.isShow = true;
          // this.message = res

          // setTimeout(()=>{
          //   this.isShow = false;
          //   this.message = ''
          // },1500)

          this.$toast.show(res)
        })
      }
    },
    mounted(){
    },
    destroyed(){
        this.$bus.$off('itemImageLoad',this.refresh)
      }
   }
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
  height: 100vh;
}

.detail-navbar {
  position: relative;
  top: 0;
  z-index: 2;
  background-color: #fff;
}

.content {
  height: calc(100% - 102px);
  overflow: hidden;
}

</style>