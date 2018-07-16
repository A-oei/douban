<template>
  <ul class="activity_lists">
    <li v-for="item in list">
      <div class="activity_item">
        <div>
          <h3 class="activity_title">{{item.title}}</h3>
          <p class="activity_Introduce">
            {{item.content | subStr}}
          </p>
        </div>
        <img :src="item.image">
      </div>
      <h2>{{item.category_name}}</h2>
    </li>
    <infinite-loading @infinite="infiniteHandler">
      <loading slot="spinner"></loading>
    </infinite-loading>
  </ul>
</template>
<style scoped lang="less">
  .activity_lists {
    width: 100%;
    padding: .533333rem;
    box-sizing: border-box;
    > li {
      width: 100%;
      padding: 1rem;
      margin-bottom: 15px; /*no*/
      box-sizing: border-box;
      box-shadow: 3px 3px 5px #ccc; /*no*/
      .activity_item {
        width: 100%;
        display: flex;
        align-items: center;
        > div {
          flex: 1;
          padding-right: 40px;
          .activity_title {
            color: #494949;
            font-weight: 700;
            text-align: justify;
            margin-bottom: 0.2rem;
            line-height: 1.5;
            font-size: 15px; /*no*/
          }
          .activity_Introduce {
            color: #aaa;
            font-size: 12px; /*no*/
            text-align: justify;
            line-height: 1.2;
          }
        }
        > img {
          width: 90px; /*no*/
          height: 104px; /*no*/
        }
      }
      > h2 {
        display: block;
        font-size: 15px;
        line-height: 1.2;
        color: #ccc;
        margin-top: 40px;
      }
    }
  }
</style>
<script>
  import InfiniteLoading from 'vue-infinite-loading';
  import JsonP from 'jsonp'
  import loading from "./loading";

  export default {
    name: "loadmore",
    created() {
      new Promise((resolve, reject) => {
        const map = new BMap.Map("bdMapBox");
        const nowCity = new BMap.LocalCity();
        nowCity.get(res => {
          resolve(res)
        })
      })
        .then((res) => {
          this.$emit('send-city', res);
        })
    },
    data() {
      return {
        list: [],
        id: 1
      };
    },
    methods: {
      infiniteHandler($state) {
        JsonP('https://api.douban.com/v2/event/list?loc=108288&start=' + this.id,
          {
            param: "callback",
            prefix: "",
            name: "superagentCallback1526977164600456"
          },
          (err, data) => {
            if (err) {
              console.log(err);
            } else {
              //jsonp获取的数据
              this.id++;
              this.list.push(...data.events);
            }
            $state.loaded();
          });
      },
    },
    components: {
      InfiniteLoading,
    },
    filters: {
      subStr: function (value) {
        let newVal = value.replace(/<.*?>/g, '')
        return newVal.slice(0, 30)
      }
    }
  };
</script>
