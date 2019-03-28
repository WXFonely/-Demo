<template>
  <div class="list">
    <van-nav-bar title="个人中心" class="nav">
    </van-nav-bar>
    <div class="topUser">
      <div class="demo-avatar">
        <Avatar icon="ios-person" size="large" src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2076349105,279514265&fm=26&gp=0.jpg"/>
      </div>
      <p>YOUR NAME</p>
    </div>
    <div class="fc">
      <van-button type="default" :to="{ name: 'Orders' }">全部订单</van-button>
      <van-button type="default">待付款</van-button>
      <van-button type="default">待收货</van-button>
      <van-button type="default">售后</van-button>
    </div>
    <div class="dizhi">
      <van-collapse v-model="activeName" accordion>
        <van-collapse-item title="地址管理" name="1">
          <p  @click="onChange">进入地址管理页面</p>
        </van-collapse-item>
        <van-collapse-item title="我的优惠券" name="2">
          <p @click="enterHandle">进入优惠券管理页面</p>
        </van-collapse-item>
        <van-collapse-item title="优先购买码" name="3">
        </van-collapse-item>
      </van-collapse>
    </div>
    <div>
      <van-collapse v-model="activeName" accordion>
        <van-collapse-item title="提货兑换卡" name="4">
        </van-collapse-item>
        <van-collapse-item title="常见问题" name="5">
        </van-collapse-item>
        <van-collapse-item title="服务支持" name="6">
        </van-collapse-item>
      </van-collapse>
    </div>
    <!-- <router-link :to="{ name: 'Home' }">【首页】</router-link>
    <router-link >
      <van-cell title="我的订单" value="点击进入" />
    </router-link>
    <router-link :to="{ name: 'ShopCart' }">
      <van-cell title="我的购物车" value="点击进入" />
    </router-link> -->
    <br>
    <button class="esc" @click="logOutHandle">退出</button>
  </div>
</template>
<script>
import { logOut } from '../utils/auth'
import { get,post } from '../utils/auth'
export default {
  data() {
    return {
      activeName: '0'
    };
  },
  methods: {
    logOutHandle() {
      logOut()
      // 派发跳转事件 控制底部导航栏选中效果
      this.$eventBus.$emit('navToZX', 'Home')
      this.$router.push({
        name: 'Home',
      })
    },
    onChange(){
      this.$router.push({
        name:'dizhi'
      })
    },
    enterHandle(){
      this.$router.push({
        name:'Coupan'
      })
    },
  }
}
</script>

<style scoped>
.fc{
  width: 100%;
  height: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-around;
}
.topUser{
  font-size: 1.2rem;
  text-align: center
}
.dizhi{
  margin: 1rem 0;
}
.esc{
  width: 100%;
  background: blue;
  height: 3rem;
  border-radius: 1.5rem;
  color: #fff;
  border:none;
}
.demo-avatar{
  padding-top: 0.6rem;
}
</style>
