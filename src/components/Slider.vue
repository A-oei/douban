<template>
  <div class="douban-slider">
    <div class="lists-item">
      <header>
        <span>{{title}}</span>
        <router-link :to="{name:'more',params:this.params}" v-show="type == 'poster'">更多</router-link>
      </header>
      <slot name="recommend"></slot>
      <ul class="clearfix item-lists">
        <!--海报列表-->
        <template v-if="type == 'poster'">

          <!--加载loading效果-->
          <loading v-show="loading"></loading>

          <router-link v-for="item in lists" class="item" tag="li" :to="path + item.id" :key="item.id">
            <div class="item-poster">
              <img :src="item.images.large">
            </div>
            <h3 class="ellipsis">{{item.title}}</h3>
            <div class="item-rating">
              <template v-if="item.rating.average>0">
                <span>
                  <span v-for="num in 5" :class="{rating: num<=parseInt(item.rating.average/item.rating.max*5)}">
                  </span>
                </span>
                <h2 v-show="item.rating.average>0">{{item.rating.average}}</h2>
              </template>
              <h2 v-show="item.rating.average==0">暂无评分</h2>
            </div>
          </router-link>
        </template>
        <!--发现列表-->
        <template v-else-if="type == 'find' ">
          <li v-for="item in lists" class="findItem" :class="[item.class,{line:item.title=='line'}]">
            {{item.title}}
          </li>
        </template>
        <!--剧照列表-->
        <template v-else>

          <!--加载loading效果-->
          <loading v-show="loading"></loading>

          <div class="celebrity" v-for="celebrity in lists" @click="actorInfo(celebrity.id)">
            <div>
              <div class="item-poster">
                <img :src="celebrity.avatars.large" :alt="celebrity.alt">
              </div>
              <h3>{{celebrity.name}}</h3>
            </div>
          </div>
        </template>
      </ul>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'

  export default {
    name: "slider",
    props: ["lists", "title", "type", "path", "params"],
    data() {
      return {
        // params:{getType:'book',getQuery:'search?q=虚构类'}
      }
    },
    methods: {
      actorInfo(e) {
        this.$router.push("/itemInfo/" + e);
      }
    },
    computed: {
      ...mapState({
        loading: (state) => {
          return state.Loading.loading
        }
      })
    }
  }
</script>
<style lang="less" scoped>
  @import "../libs/douban.css";

  .lists-item {
    > header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      span {
        color: #111;
        font-size: 1.06rem;
      }
      a {
        color: #42bd56;
        font-size: .9rem;
        line-height: 1.5rem;
      }
    }
    .item-lists {
      overflow-x: auto;
      white-space: nowrap;
      font-size: 0;
      padding: 15px 0 30px 0; /*no*/
      /*去掉滚动条*/
      &::-webkit-scrollbar {
        display: none;
      }
      /*普通列表展示*/
      .item {
        margin-left: 40px;
        &:nth-of-type(1) {
          margin-left: 0;
        }
      }
      /*发现列表展示*/
      .findItem {
        display: inline-block;
        box-sizing: content-box;
        padding: 15px; /*no*/
        font-size: 16px; /*no*/
        margin-right: 50px;
        margin-bottom: 60px;
        border-radius: 10px; /*no*/
        /*分割上下列线*/
        &.line {
          width: 100%;
          height: 1px; /*no*/
          font-size: 0;
          padding: 0;
          display: block;
          background-color: #fff;
          border: #ffffff;
          margin: 0;
        }
        /*每一个标签不同样式*/
        &.o {
          color: rgb(66, 189, 86);
          border: 1px solid rgb(66, 189, 86); /*no*/
        }
        &.t {
          color: rgb(204, 51, 68);
          border: 1px solid rgb(204, 51, 68); /*no*/
        }
        &.te {
          color: rgb(255, 172, 45);
          border: 1px solid rgb(255, 172, 45); /*no*/
        }
        &.f {
          color: rgb(255, 172, 45);
          border: 1px solid rgb(255, 172, 45); /*no*/
        }
      }

      /*影人剧照*/
      .celebrity {
        display: inline-block;
        width: 75px; /*no*/
        margin-left: 0.48rem;
        vertical-align: top;
        text-align: center;
        &:nth-of-type(1) {
          margin-left: 0;
        }
        /*海报*/
        .item-poster {
          width: 100%;
          max-height: 140px; /*no*/
          overflow: hidden;
          img {
            width: 100%;
          }
        }
        /*名字*/
        h3 {
          font-size: 14px; /*no*/
          color: #aaaaaa;
          margin-top: 10px;
          text-align: center;
          width: 100%;
          white-space: normal;
        }
      }
    }
  }
</style>
