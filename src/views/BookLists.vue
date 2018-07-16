<template>
  <div class="douban-book">
    <Slider title="最受欢迎的小说|虚构类" :lists="fiction" type="poster" path="/bookInfo/"
            :params="params.imaginary"></Slider>
    <Slider title="最受欢迎的小说|非虚构类" :lists="notFiction" type="poster" path="/bookInfo/"
            :params="params.Nonfiction"></Slider>
    <Slider title="豆瓣书店" :lists="bookstore" type="poster" path="/movieInfo/"
            :params="params.One">
      <div slot="recommend" class="recommend" v-if="recommend != ''">
        <img :src="large">
        <div class="recommendInfo">
          <div>
            <h3>{{recommend.title}}</h3>
            <h3>{{recommend.price}}</h3>
          </div>
          <p class="lineEllipsis">{{summary}}</p>
        </div>
      </div>
    </Slider>
    <Slider title="发现" :lists="findLists" type="find">
      <slot>
        <li class="line"></li>
      </slot>
    </Slider>
    <Classification title="分类" :lists="classificationLists"></Classification>
    <DownloadApp></DownloadApp>
  </div>
</template>
<script>

  const Slider = () => ({
    component: import("components/Slider")
  })

  const Classification = () => ({
    component: import("components/Classification")
  })

  const DownloadApp = () => ({
    component: import("components/DownloadApp")
  })
  export default {
    name:"bookLists",
    created() {
      this.getBookLists("虚构类", "title,id,rating,images", "fiction");
      this.getBookLists("非虚构类", "title,id,rating,images", "notFiction");
      this.getRecommend();
    },
    data() {
      return {
        //传递params
        params: {
          imaginary: {getType: 'book', getQuery: 'search?q=虚构类'},
          Nonfiction: {getType: 'book', getQuery: 'search?q=非虚构类'},
          One: {getType: 'book', getQuery: 'search?q=一拳超人'},
        },
        fiction: "",
        notFiction: "",
        bookstore: "",
        recommend: "",
        //发现列表
        findLists: [
          {
            title: "小波看书",
            class: "o"
          },
          {
            title: "春上村树周边",
            class: "t"
          },
          {
            title: "我凭名字认定了你",
            class: "te"
          },
          {
            title: "line"
          },
          {
            title: "不可饶恕的女人们",
            class: "te"
          },
          {
            title: "爱欲书",
            class: "o"
          },
          {
            title: "他们还写侦探小说",
            class: "f"
          },
          {
            title: "人生识字开始忧患",
            class: "t"
          },
          {
            title: "诗歌书店",
            class: "f"
          }
        ],
        //分类列表
        classificationLists: [
          {
            title: "小说"
          },
          {
            title: "爱情"
          },
          {
            title: "历史"
          },
          {
            title: "外国文学"
          },
          {
            title: "青春"
          },
          {
            title: "励志"
          },
          {
            title: "随笔"
          },
          {
            title: "传记"
          },
          {
            title: "推理"
          },
          {
            title: "旅行"
          },
          {
            title: "奇幻"
          },
          {
            title: "经管"
          },
        ]
      }
    },
    methods: {
      getBookLists(search, fields, data) {
        this.$http.get("/api/v2/book/search?q=" + search + "&fields=" + fields)
          .then(res => {
            this[data] = res.data.books.slice(0, 6)
          })
          .catch(err => {
            console.log(err);
          })
      },
      getRecommend() {
        this.$http.get('/api/v2/book/search?q=一拳超人')
          .then(res => {
            this.bookstore = res.data.books.slice(0, 6);
            this.recommend = res.data.books[7];
            console.log(this.recommend, "recommend");
          })
      }
    },
    computed: {
      summary: function () {
        return this.recommend.summary.slice(0, 60)
      },
      large: function () {
        return this.recommend.images.large;
      },
      title: () => {
        return this.recommend.title;
      }

    },
    components: {
      Slider,
      Classification,
      DownloadApp
    },
    //控制是否缓存
    beforeRouteLeave(to, from, next) {
      from.meta.keepAlive = false;
      next();
    }
  }
</script>
<style lang="less" scoped>
  .douban-book {
    width: 100%;
    padding: 40px;
    margin-top: 45px; /*no*/
    /*推荐书籍样式*/
    .recommend {
      margin-top: 40px;
      display: flex;
      img {
        width: 100px; /*no*/
        max-height: 140px; /*no*/
      }
      .recommendInfo {
        flex: 1;
        padding: 40px;
        /*价格、书名*/
        > div {
          display: flex;
          margin: 10px 0; /*no*/
          line-height: 22px; /*no*/
          h3 {
            font-size: 19px; /*no*/
            color: #494949;
            height: 22px; /*no*/

            &:nth-of-type(1) {
              overflow: hidden;
              text-align: left;
              flex: 2;
            }
            &:nth-of-type(2) {
              font-size: 16px; /*no*/
              color: #E76648;
              text-align: right;
              flex: 1;
            }
          }
        }
        /*介绍*/
        > p {
          color: #9B9B9B;
          font-size: .8rem;
          line-height: 1.5;
        }
      }
    }
  }
</style>
