import {debounce} from './utils';

import BackTop from 'components/content/backTop/BackTop.vue'

export const itemListenerMixin = {
  data(){
    return {
      refresh:null,
    }
  },
  methods:{
    
  },
  mounted(){
    // 图片加载完成的事件监听
    this.refresh = debounce(this.$refs.scroll.refresh)
    // 频率有点高   防抖/节流
    this.$bus.$on('itemImageLoad',this.refresh)
  }
}

export const backTopMixin = {
  components:{
    BackTop
  },
  data(){
    return {
      isShowBackTop:false,
    }
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
   },
  }
}