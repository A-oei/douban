<template>
  <div class="user">
    <Nav></Nav>
    <header>
      <div class="user-header">
        <img :src="user_img">
      </div>
      <h2 class="user-name">{{user_name}}</h2>
      <p>{{user_introduce}}</p>

      <div class="user-info">
        <h3 class="user-city">
          <span>常住地 :</span>
          {{user_city}}
        </h3>
        <h3 class="user-star">
          {{user_statr}}
          <span> 加入豆瓣</span>
        </h3>
      </div>
    </header>
  </div>
</template>
<script>
  import Nav from "components/Nav"

  import {mapGetters} from 'vuex'

  export default {
    name: 'user',
    created() {

      this.$store.commit('getUser',this);
      this.$store.dispatch("getUser",this);
    },
    data() {
      return {
        user: {}
      }
    },
    components: {
      Nav
    },
    computed: {
      ...mapGetters([
        'user_name',
        'user_img',
        'user_city',
        'user_statr',
        'user_introduce'
      ])
    }
  }
</script>
<style lang="less" scoped>
  .user {
    margin-top: 47px; /*no*/
    padding: 40px;
    text-align: left;
    header {
      width: 100%;
      font-size: 13px; /*no*/
      /*头像*/
      .user-header {
        width: 6.333333rem;
        height: 6.333333rem;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 auto 20px; /*no*/
        img {
          width: 100%;
        }
      }
      .user-name {
        font-size: 18px; /*no*/
        letter-spacing: 2px; /*no*/
        color: #00b600;
        text-align: center;
        margin-bottom: 15px; /*no*/
      }
      p {
        color: #aaa;
        text-align: center;
        margin-bottom: 50px; /*no*/
      }
      .user-info {
        width: 100%;
        padding: 80px;
        box-shadow: 2px 2px 5px #aaa; /*no*/
        .user-star {
          margin-top: 10px; /*no*/
        }
        span {
          color: #00b600;
        }
      }
    }
  }
</style>
