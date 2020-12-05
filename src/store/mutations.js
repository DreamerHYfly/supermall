import {
  ADD_COUNTER,
  INIT_COUNTER,
  ADD_TO_CART
} from './mutations-type'

export default {
  // 唯一目的就是修改state中的状态
  // 这里面的每个方法尽可能完成得事情比较单一一点
  [ADD_COUNTER](state,payload){
    payload.count++
  },
  [INIT_COUNTER](state,payload){
    payload.count = 1
  },
  [ADD_TO_CART](state,payload) {
    state.cartList.push(payload)
  }
}