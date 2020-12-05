export default {
  
  cartLength(state) {
    return state.cartList.length
  },
  cartList(state) {
    return state.cartList
  },
  
  totalPrice(state){
    if(state.cartList.length)
    {
       return state.cartList
                .filter( item=> item.checked )
                .reduce(
                   (preValue,item)=>
                   parseInt(preValue)+parseInt(item.newPrice)*parseInt(item.count)
                ,0)
    }else {
       return '0.00'
    }
 },
 totalCount(state){
    return state.cartList
    .filter( item=> item.checked ).length
 },
 testTotal(state){
  return state.cartList.some(item=>item.checked)&&state.cartList.every(item=>item.count&&item.checked)

  // let checkLen = state.cartList.filter(item => item.checked).length

  // let countLen = state.cartList.filter(item => item.count).length

  // return Boolean(checkLen&&checkLen===countLen)
  },
}