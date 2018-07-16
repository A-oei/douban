<template>
  <div class="douban-classification">
    <header>
      {{title}}
    </header>
    <ul>
      <li v-for="item in lists">
        <a>
          {{item.title}}
        </a>
      </li>
    </ul>
  </div>
</template>
<style lang="less" scoped>
  .douban-classification{
    padding: 20px;
    header{
      width: 100%;
      color: #111;
      font-size: 1.06rem;
    }
    ul{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      li{
        width: 50%;
        color: #42bd56;
        font-size: 16px;/*no*/
        box-sizing: border-box;
        border-top: 1px solid #eee;/*no*/
        border-right: 1px solid #eee; /*no*/
        height: 3rem;
        line-height: 3rem;
        &:nth-of-type(2n){
          border-right: none;
        }
        &:nth-of-type(2n){
          border-right: none;
        }
        &:nth-last-of-type(2){
          border-bottom: 1px solid #eee;/*no*/
        }
        &:last-of-type{
          border-bottom: 1px solid #eee;/*no*/
        }
        a{
          display: block;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          padding-left:40px;
        }
      }
    }
  }
</style>
<script>
  export default {
    name:"classification",
    data(){
      return {

      }
    },
    props:["title","lists"]
  }
</script>
