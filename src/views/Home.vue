<template>
  <div class="douban-home">
    <ul class="home-nav clearfix">
      <li v-for="item in lists">
        <a href="#">
          {{item.title}}
        </a>
      </li>
    </ul>
    <h3 class="userCity">{{city}}</h3>
    <Loadmore @send-city="receiveCity"></Loadmore>
  </div>
</template>
<script>

  import Loadmore from 'components/Loadmore'

  export default {
    name: "home",
    created() {
    },
    data() {
      return {
        lists: [
          {
            title: "影院热映"
          },
          {
            title: "生活在别处"
          },
          {
            title: "豆瓣时间"
          },
          {
            title: "使用豆瓣APP"
          }
        ],
        city: ""
      }
    },
    components: {
      Loadmore,
    },
    methods: {
      receiveCity(data) {
        this.city = data.name;
      }
    }
  }
</script>
<style lang="less" scoped>
  .douban-home {
    padding-top: 47px; /*no*/
    width: 100%;

    .home-nav {
      width: 100%;
      padding: 0 18px; /*no*/
      box-sizing: border-box;
      margin-top: 30px; /*no*/
      > li {
        width: 50%;
        padding: 3px; /*no*/
        float: left;
        box-sizing: border-box;
        text-align: center;
        font-size: 15px; /*no*/
        background-color: #ffffff;
        a {
          display: block;
          padding: 12px 0; /*no*/
          width: 100%;
          height: 100%;
          background-color: #f6f6f6;
          color: #333;
          border-radius: 2px; /*no*/
        }
      }
    }

    /*用户所在城市*/
    .userCity {
      padding: 0 1rem;
      font-size: 13px; /*no*/
      letter-spacing: 2px; /*no*/
      font-weight: 700; /*no*/
      color: #999;
      text-align: left;
      margin-top: 20px; /*no*/
      text-shadow: 5px 5px 2px #ccc; /*no*/
    }
  }
</style>
