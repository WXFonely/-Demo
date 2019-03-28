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
    //   let addr = new Object;
    //   console.log('content');
    //   console.log(content);
    //   console.log(this.$eventBus.$on("list"))
    //   let len = this.$eventBus.$on("list").length + 1;
    //   addr = {
    //     id:len,
    //     name:content.name,
    //     tel:content.tel,
    //     city:content.city,
    //     county:content.county,
    //     is_default:content.is_default,
    //     postal_code:content.postal_code,
    //     province:content.province,
    //     area_code:content.area_code,
    //     address:content.province+content.city+content.county+content.address_detail
    // };
    //   let is_add = this.list.push(addr);
      this.$router.push({
        name:'addAddress'
      })
    },
    onEdit(item, index) {
      // let addressInfo = new Object;
      // // Toast('编辑收货地址:' + index);
      // console.log('编辑收货地址:' + index);
      // console.log(item);
      // // 进入编辑模式
      // this.show1 = true;
      // addressInfo = {
      //   id:item.id,
      //   name:item.name,
      //   tel:item.tel,
      //   province:item.province,
      //   city:item.city,
      //   county:item.county,
      //   area_code:item.area_code,
      //   address_detail:item.address,
      //   postal_code:item.postal_code,
      //   is_default:item.is_default,
      // }
      // this.addressInfo = addressInfo;
      console.log(this.addressInfo)

      post(`http://api.cat-shop.penkuoer.com/api/v1/addresses/${item.id}`,
      {
        "receiver":item.name,
        "mobile":item.tel,
        "regions":item.address,
        "address":item.regions,
        "idDefault":false
      },
      {
        headers:{Authorization:"Bearer " +localStorage.getItem('token')}
      })
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
          obj.regions = arr1[i].address
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
