<template>
  <div>
    <van-nav-bar title="AddressList 新增地址" class="nav" left-arrow @click-left="onClickLeft">
    </van-nav-bar>
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>
<script>
import { post } from "axios"
import areaList from "../utils/area.js"
export default {
  data() {
    return {
      areaList,
      searchResult: []
    }
  },
  component:{
    // address-edit
  },
  methods: {
    onSave(content) {
      let addr = new Object;
      console.log('content');
      console.log(content);
      let len = this.list.length + 1;
      addr = {
        id:len,
        name:content.name,
        tel:content.tel,
        city:content.city,
        county:content.county,
        is_default:content.is_default,
        postal_code:content.postal_code,
        province:content.province,
        area_code:content.area_code,
        address:content.province+content.city+content.county+content.address_detail
      };
      let is_add = this.list.push(addr);
      // 判断是否选中默认
      if (content.is_default) {
        this.chosenAddressId = len;
      }
      if (is_add) {
        this.show1 = false;
      }
      console.log(this.list);

      // console.log(localStorage.getItem('token'))
      // post('http://api.cat-shop.penkuoer.com/api/v1/addresses',{
      //   "receiver":content.name,
      //   "mobile":content.tel,
      //   "regions":content.province+content.city+content.county,
      //   "address":content.address_detail,
      //   "idDefault":false
      // },
      // {
      //   headers:{Authorization:"Bearer " +localStorage.getItem('token')}
      // })
      // .then(res=>{
      //   console.log(res.data)
      //   this.$router.push({
      //     name:"dizhi"
      //   })
      // })
      // .catch(err=>{
      //   console.log(err)
      // })
    },
    onDelete() {
      post('http://api.cat-shop.penkuoer.com/api/v1/address/',{
        headers:{Authorization:"Bearer " +localStorage.getItem('token')}
      })
    },
    onClickLeft(){
      this.$router.push({
        name:'dizhi'
      })
    }
  }
}
</script>
<style scoped>

</style>
