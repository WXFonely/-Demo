<template>
  <div>
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
      console.log(localStorage.getItem('token'))
      post('http://api.cat-shop.penkuoer.com/api/v1/addresses',{
        "receiver":content.name,
        "mobile":content.tel,
        "regions":content.province+content.city+content.county,
        "address":content.address_detail,
        "idDefault":false
      },
      {
        headers:{Authorization:"Bearer " +localStorage.getItem('token')}
      })
      .then(res=>{
        console.log(res.data)
        this.$router.push({
          name:"dizhi"
        })
      })
      .catch(err=>{
        console.log(err)
      })
    },
    onDelete() {
      delete(`http://api.cat-shop.penkuoer.com/api/v1/address/${content.id}`,{
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
