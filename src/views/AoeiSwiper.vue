<template>
  <div class="aoei_npm">
    <div class="douban-card">
      <h3>在npm上发布的一个将swiper组件化的项目</h3>
      <swiper v-bind="swiper">
        <div class="swiper-slide" slot="wrapper-item">
          1
        </div>
        <div class="swiper-slide" slot="wrapper-item">
          2
        </div>
        <div class="swiper-slide" slot="wrapper-item">
          3
        </div>
        <div slot="swiper-pagination" class="lib-pagination"></div>
      </swiper>
        <h2>插件下载</h2>
        <p>npm i aoei-vue-swiper -D</p>
        <h2>插件使用</h2>
        <pre>
main.js

import swiper from 'aoei-vue-swiper'
Vue.use(swiper)
      </pre>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'aoei-swiper',
    created(){
    },
    data() {
      return {
        swiper: {
          autoplay: true,
          loop: true,
          pagination: {
            el: '.lib-pagination',
            visible: true,
            clickable: true
          }
        },
      }
    }
  }
</script>
<style  lang="less">

  .aoei_npm {
    padding: 47px 15px 0; /*no*/
    .douban-card {
      > h3 {
        margin-top: 40px;
        font-size: 15px; /*no*/
        font-weight: 700;
        color: #333;
      }
      .swiper-container{
        width: 100%;
        height: 600px;
        text-align: center;
        line-height: 600px;
        font-weight: 700;
        font-size: 50px;/*no*/
        color: white;
        margin-top: 15px;
        .swiper-wrapper{
          height: 100%;
          .swiper-slide{
            height: 100%;
            &:nth-of-type(1){
              background-color: slategrey;
            }
            &:nth-of-type(2){
              background-color: darkturquoise;
            }
            &:nth-of-type(3){
              background-color: navajowhite;
            }
            &:nth-of-type(4){
              background-color: slategrey;
            }
            &:nth-of-type(5){
              background-color: darkturquoise;
            }
          }
        }
      }
      h2{
        margin-top: 40px;
        line-height: 20px;/*no*/
        font-size: 14px;/*no*/
        color: #333333;
        font-weight: 700;
      }
      p{
        color: black;
        font-size: 12px;/*no*/
        text-align: justify;
      }
    }
  }
</style>
