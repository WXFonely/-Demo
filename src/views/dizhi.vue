<template>
  <div>
    <van-nav-bar title="AddressList 地址列表" class="nav" left-arrow>
    </van-nav-bar>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      :disabled-list="disabledList"
      disabled-text="以下地址超出配送范围"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>
<script>
import { get } from 'axios'
import { post } from 'axios'
import addAddressVue from './addAddress.vue';
export default {
  data() {
    return {
      chosenAddressId: '1',
      list: [],
      disabledList: [
        {
          id: '3',
          name: '王五',
          tel: '1320000000',
          address: '浙江省杭州市滨江区江南大道 15 号'
        }
      ]
    }
  },

  methods: {
    onAdd() {
      this.$router.push({
        name:'addAddress'
      })
    },
    onEdit(item, index) {
      console.log(item)
      console.log(index)
      // post(`http://api.cat-shop.penkuoer.com/api/v1/addresses/${item.id}`,
      // {
      //   "receiver":item.name,
      //   "mobile":item.tel,
      //   "regions":item.address,
      //   // "address":'航海路',
      //   "idDefault":false
      // },
      // {
      //   headers:{Authorization:"Bearer " +localStorage.getItem('token')}
      // })
    }
  },
  created(){
    get('http://api.cat-shop.penkuoer.com/api/v1/addresses',
    {
        headers:{Authorization:"Bearer " +localStorage.getItem('token')}
    },{
      "per":10,
      "page":1,
    })
    .then(res=>{
      // console.log(res.data.addresses);
      let arr1 = res.data.addresses;
      for(var i = 0;i<arr1.length;i++){
          let obj = [];
          obj.id = arr1[i]._id
          obj.name = arr1[i].receiver
          obj.tel = arr1[i].mobile
          obj.address = arr1[i].regions
         console.log(obj)
         this.list.push(obj)
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }
}
</script>
