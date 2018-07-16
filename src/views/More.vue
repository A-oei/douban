<template>
  <div class="douban-more">
    <ul class="more-lists">
      <router-link tag="li" v-for="item in lists" class="item" :to="path + item.id" :key="item.id">
        <div class="item-poster">
          <img v-lazy="item.images.large">
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
    </ul>
  </div>
</template>
<style lang="less" scoped>
  @import "../libs/douban.css";

  .douban-more {
    padding: 47px 4% 0; /*no*/
    /*title*/
    .more-title {
      width: 100%;
      text-align: left;
      font-size: 20px; /*no*/
      color: #999;
      margin-bottom: 15px; /*no*/
      margin-top: 40px;
    }
    .more-lists {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }
</style>
<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "more",
    created() {
      this.path = this.$route.params.getType == "movie" ?
        "/movieInfo/" : "/bookInfo/";

      this.$store.dispatch({
        type: 'getMore',
        path: this.$route.params.getType,
        query: this.$route.params.getQuery,
        _this: this
      })
        .then(res => {
          console.log(res);
        })

    },
    data() {
      return {
        title: "正在上映",
        path: "",
      }
    },
    computed: {
      ...mapGetters([
        "lists"
      ])
    }

  }
</script>
