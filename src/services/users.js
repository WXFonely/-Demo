import axios from '../utils/request'

export function login(userName, password) {
  return axios.post('/api/v1/auth/login', {
    userName,
    password
  })
}

export function reg(user) {
  return axios.post('/api/v1/auth/reg', user)
}

export function addToShopCart(product, quantity) {
  let myCarts = getShopCart() // 获取购物车信息
  // 查询当前商品在购物车数组中的索引
  const index = myCarts.findIndex(cart => cart.product == product)
  // 判断购物车中是否存在指定的商品
  if (index > -1) {
    myCarts[index].quantity = myCarts[index].quantity + quantity;
  } else {
    myCarts.push({
      product,
      quantity,
    });
  }
  localStorage.setItem('my-shopcart', JSON.stringify(myCarts)); // 保存购物车信息
}

/**
 * 从购物车中删除商品
 * @param {*} product 
 */
export function delFromProduct(product) {
  let myCarts = getShopCart()
  const index = myCarts.findIndex(cart => cart.product == product)
  if (index > -1) {
    myCarts.splice(index, 1)
  }
  localStorage.setItem('my-shopcart', JSON.stringify(myCarts));
}

export function getShopCart() {
  if (localStorage.getItem('my-shopcart')) {
    return JSON.parse(localStorage.getItem('my-shopcart'))
  } else {
    return []
  }
}

/**
 * 获取购物车商品数量
 */
export function getShopCartCount() {
  const myCarts = getShopCart()
  let result = 0
  myCarts.forEach(item => result += item.quantity)
  return result
}