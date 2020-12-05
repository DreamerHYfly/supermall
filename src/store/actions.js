import {
  ADD_COUNTER,
  INIT_COUNTER,
  ADD_TO_CART
} from './mutations-type'

export default {
  addCart(content, payload) {
    return new Promise((resolve,reject)=>{
      let oldObj = content.state.cartList.find(item => payload.iid===item.iid)
      if(oldObj){
        // oldObj.count += 1
        content.commit(ADD_COUNTER,oldObj)
        resolve('当前商品数量+1')
      }else {
        // payload.count = 1
        content.commit(INIT_COUNTER,payload)

        // state.cartList.push(payload)
        content.commit(ADD_TO_CART,payload)

        resolve('添加了新的商品')
      }
    })
    
  }
}