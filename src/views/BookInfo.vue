<template>
  <div class="book-info">
    <div class="douban-card">
      <Banner></Banner>
      <IntroduceCard :cardInfo="celebrityInfo">
        <!--图书信息-->
        <p class="douban-subject-text" slot="cardInfo">
          {{bookCard.author | join}} / {{bookCard.publisher}} /
          {{bookCard.pageNum}}页 / {{bookCard.binding}} /
          {{bookCard.price}} / {{bookCard.date}}
        </p>
      </IntroduceCard>
      <!--价格-->
      <div class="buy">
        <div>
          <span>在豆瓣购买</span>
          <span>{{bookCard.price}}起</span>
        </div>
        <div>
          <span>在当当网购买</span>
          <span>45元起</span>
        </div>
      </div>
      <!--用户选择-->
      <div class="userSelect">
        <span>
          想看
        </span>
        <span>
          在看
        </span>
        <span>
          看过
        </span>
      </div>
      <!--所属频道-->
      <div class="tags">
        <h3 class="douban-title-aaa">
          所属频道
        </h3>
        <div>
          <span v-for="item in tags">
            {{item.name}}
          </span>
        </div>
      </div>
      <!--内容介绍-->
      <summary-show :title="celebrityInfo.title+'剧情简介'" :content="summary"></summary-show>
      <DownloadApp></DownloadApp>
    </div>
  </div>
</template>
<script>
  export default {
    name:"bookInfo",
    created() {
      const id=this.$route.params.id;
      this.getBookInfo(id)
    },
    data() {
      return {
        celebrityInfo: "",
        bookCard: {
          //作者
          author: "",
          //出版社
          publisher: "",
          //页数
          pageNum: "",
          //平装
          binding: "",
          //价格
          price: "",
          //日期
          date: ""
        },
        //内容介绍
        summary: "",
        //剪切版
        summaryClipping: "",
        //作者介绍
        author_intro:"",
        //  所属频道
        tags: ""
      }
    },
    methods: {
      getBookInfo(id) {
        this.$http.get("/api/v2/book/"+id)
          .then(res => {
            this.celebrityInfo = res.data;
            this.celebrityInfo.ratings_count = this.celebrityInfo.rating.numRaters;

            //作者
            this.bookCard.author = res.data.author;
            //出版社
            this.bookCard.publisher = res.data.publisher;
            //页数
            this.bookCard.pageNum = res.data.pages;
            //平装
            this.bookCard.binding = res.data.binding;
            //价格
            this.bookCard.price = res.data.price;
            //日期
            this.bookCard.date = res.data.pubdate;
            //内容简介
            this.summary = res.data.summary;

            this.summaryClipping=this.summary.slice(0,45);
            //作者介绍
            this.author_intro=res.data.author_intro;
            //所属频道
            this.tags = res.data.tags;
          })
          .catch(err => {
            console.log(err);
          })
      },
      //点击展开
      summaryShow(e) {
        e.target.style.display = "none";
        this.$nextTick(() => {
          this.summaryClipping = this.summary;
        })
      },
    },
    components: {
      Banner: () => ({
        component: import("components/Banner")
      }),
      IntroduceCard:()=>({
        component:import("components/IntroduceCard")
      }),
      DownloadApp: () => ({
        component: import("components/DownloadApp")
      }),
      SummaryShow:()=>({
        component:import("components/SummaryShow")
      })
    },
  }
</script>
<style lang="less" scoped>
  @import "../libs/douban.css";

  .book-info {
    margin-top: 47px; /*no*/
    /*购买价格*/
    .buy {
      margin-bottom: 15px; /*no*/
      border-bottom: 1px solid #ccc;
      > div {
        height: 44px; /*no*/
        line-height: 44px; /*no*/
        width: 100%;
        border-top: 1px solid #ccc;
        display: flex;
        justify-content: space-between;
        span {
          font-size: 14px; /*no*/
          &:nth-of-type(1) {
            color: #42bd56;
          }
          &:nth-of-type(2) {
            color: #ccc;
          }
        }
      }
    }
    /*用户选择*/
    .userSelect {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px; /*no*/
      span {
        width: 25%;
        text-align: center;
        padding: 30px;
        color: #ffb712;
        border: 1px solid #ffb712; /*no*/
        border-radius: 3px; /*no*/
        font-size: 15px; /*no*/
      }
    }
    /*所属频道*/
    .tags {
      margin-bottom: 15px;/*no*/
      > div {
        display: flex;
        flex-wrap: wrap;
        span {
          padding: 5px 10px; /*no*/
          margin-right: 40px;
          color: #42bd56;
          font-size: 12px; /*no*/
          background-color: #effaf0;
          border: 1px solid #42bd56; /*no*/
          border-radius: 15px; /*no*/
          margin-bottom: 30px;
        }
      }
    }
    /*剧情简介*/
    .introduction-content {
      color: #333;
      font-size: 15px; /*no*/
      text-align: justify;
    }
  }
</style>
