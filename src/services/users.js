import axios from '../utils/request'
import { post } from 'axios'
import { get } from 'axios'


// import { Script } from 'vm';


export function login(userName, password) {
  return axios.post('/api/v1/auth/login', {
    userName,
    password
  })
}

export function reg(user) {
  return axios.post('/api/v1/auth/reg', user)
}

// export function addToShopCart(product, quantity) {
//   let myCarts = getShopCart() // 获取购物车信息
//   // 查询当前商品在购物车数组中的索引
//   const index = myCarts.findIndex(cart => cart.product == product)
//   // 判断购物车中是否存在指定的商品
//   if (index > -1) {
//     myCarts[index].quantity = myCarts[index].quantity + quantity;
//   } else {
//     myCarts.push({
//       product,
//       quantity,
//     });
//   }
//   localStorage.setItem('my-shopcart', JSON.stringify(myCarts)); // 保存购物车信息
// }
export function addToShopCart(product,quantity,_this){
  if(!sessionStorage.getItem("token")){
    _this.$eventBus.$emit('navToZX', 'Login')
    _this.$router.push({
      name:'Login'
    })
  }
    else{
      post('http://api.cat-shop.penkuoer.com/api/v1/shop_carts',
      {"product":product,"quantity":quantity},
      {
        headers:{Authorization:"Bearer "+sessionStorage.getItem('token')}
      })
      .then(res =>{
        console.log(res.data)
      })
      .catch(err=>{
        console.log(err);
      })
    }
}
/**
 * 从购物车中删除商品
 * @param {*} productg
 */
export function delFromProduct(product) {
  axios.delete(`http://api.cat-shop.penkuoer.com/api/v1/shop_carts/${product}`,
  {headers:{
    Authorization:'Bearer '+sessionStorage.getItem('token')}
  }).then(res=>{
    console.log(res.data)
  }).catch(err=>{
    console.log(err)
  })
}

export function getShopCart() {
 return get(`http://api.cat-shop.penkuoer.com/api/v1/shop_carts`,
      {headers:{
        Authorization:'Bearer '+sessionStorage.getItem('token')
      }})
}

/**
 * 获取购物车商品数量
 */


