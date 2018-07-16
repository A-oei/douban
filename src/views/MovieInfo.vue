<template>
  <div class="movie-info">
    <!--app banner-->
    <section>
      <Banner></Banner>
    </section>
    <!--电影卡片-->
    <IntroduceCard :cardInfo="celebrityInfo">
      <!--演员表-->
      <p class="douban-subject-text" slot="cardInfo">
        <!--电影时长-->
        150分钟 /
        <!--电影类型-->
        {{movieCard.genres}} /
        <!--导演-->
        <span v-for="item in movieCard.director">
              {{item.name+" (导演) / "}}
          </span>
        <!--主演-->
        <span v-for="item in movieCard.casts">
              {{item.name+' / '}}
          </span>
        <!--上映日期-->
        {{movieCard.mainland_pubdate + " (中国大陆)上映"}}
      </p>
    </IntroduceCard>
    <!--用户选择-->
    <div class="user-select">
      <!--<div class="haveSeen">-->
      <button class="Seen">想看</button>
      <button class="haveSeen">看过</button>
      <!--</div>-->
      <div class="openApp">
        在App上保存你的观影记录
      </div>
    </div>
    <!--剧情简介-->
    <div class="douban-card">
      <summary-show :title="celebrityInfo.title+'剧情简介'" :content="summary"></summary-show>
    </div>
    <!--影人(模拟的数据)-->
    <div class="movie-stills">
      <Slider title="影人" :lists="celebritys"></Slider>
    </div>
    <DownloadApp></DownloadApp>
  </div>
</template>
<script>
  export default {
    name:"movieInfo",
    created() {
      const id = this.$route.params.id;
      this.getInfo(id);
    },
    data() {
      return {
        celebrityInfo: "",
        //电影card数据
        movieCard: {
          //导演
          director: "",
          //主演
          casts: "",
          //大陆上映日期
          mainland_pubdate: "",
          //电影类型
          genres: "",
        },
        //影片简介
        summary: "",
        summaryClipping: "",
        //影人信息
        celebritys: []
      }
    },
    methods: {
      //获取电影卡片数据
      getInfo(id) {
        this.$http.get('/api/v2/movie/subject/' + id)
          .then(res => {
            console.log(res.data, "影片信息");
            this.celebrityInfo = res.data;
            // //主演
            this.movieCard.casts = res.data.casts;
            //影片类型
            this.movieCard.genres = res.data.genres.join(" / ");
            // //导演
            this.movieCard.director = res.data.directors;
            // //上映日期
            this.movieCard.mainland_pubdate = res.data.year;
            //影片简介
            this.summary = res.data.summary;
            //省略版
            this.summaryClipping = this.summary.slice(0, 50);
            //影人信息
            this.celebritys = [...res.data.directors, ...res.data.casts]
          })
          .catch(err => {
            console.log(err);
          })
      },
      //获取影人信息(豆瓣目前未开放，自己模拟处理的数据)
      getCelebrity() {
        this.$http.get("/api/v2/movie/celebrity/24773958")
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          })
      },
      //获取电影剧照(豆瓣目前未开发)
      getPhotos() {
        this.$http.get("/api/v2/movie/subject/24773958/photos")
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          })
      },
      //获取电影长评论(豆瓣目前未开放)
      getReviews() {
        this.$http.get("/api/v2/movie/subject/24773958/reviews")
          .then(res => {
            console.log(res);
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
      Slider: () => ({
        component: import("components/Slider")
      }),
      Banner: () => ({
        component: import("components/Banner")
      }),
      DownloadApp: () => ({
        component: import("components/DownloadApp")
      }),
      IntroduceCard: () => ({
        component: import("components/IntroduceCard")
      }),
      SummaryShow: () => ({
        component: import("components/SummaryShow")
      })
    },
  }
</script>



<style lang="less" scoped>
  @import "../libs/douban.css";

  .movie-info {
    > section {
      margin-top: 47px; /*no*/
      margin-bottom: 0;
      min-width: 100%;
      overflow: hidden;
      text-align: left;
      position: relative;
      display: block !important;
    }
    /*影片信息*/
    .info-card {
      width: 100%;
      padding: 0 36px;
      margin-bottom: 30px; /*no*/
      /*电影名字*/
      .card-title {
        width: 100%;
        margin: 30px 0 10px; /*no*/
        font-size: 24px; /*no*/
        line-height: 32px; /*no*/
      }
      /*电影卡片*/
      .card-subject {
        display: flex;
        /*文字信息*/
        .subject-name {
          flex: 2;
          /*评分*/
          .evaluate {
            color: #aaa;
            font-size: 14px; /*no*/
            line-height: 1;
            span {
              display: inline-block;
              width: 12px; /*no*/
              height: 12px; /*no*/
              margin-right: 15px;
              background-repeat: no-repeat;
              background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAeRJREFUOBGtlDsvBFEUx3d2djfiMbTsQ0NEwTaiQSGiRKWREDofgMJHEAqdSPSE0BC9SiEqWQWSzT4SzSbrsR7Fzo7fEXfNg9klbjI5j/s/vzn3MRMI1DFyudxaPp8/qEMa0GqJ0ul0QzgcvtM0zbAsqzMWi+X9aoJ+kzIXiUSmgLXhinZOcn6jJpDieRvA7tvSX64vMJvNdiAdV3I67c5kMkMq/s76AgHMUqTbC0Oh0II9dvvVQ0mlUs2GYbRWKpU2ij4swA3pylX0ZJrmNPn7crn8oOv6Y7FYfEgmk8+i07gOl0z24js6cUHqCU1uwbksefcfYPJCHeDFx5LpUq7DNp2GZeYPw2KrVuLx+Gp1D4GOATwEZvwGSFdv6Oe48PtSVwVKwCfWB/SEJyZxHaMAcBLYmdI6gJIEGg0Gg1e4tTqVZfawzBsFE+u5h4heyLfYRT/4LERrcs95gNwr+RI8nbsLJWa5I+68B8hbPSJ3kYq/03qAvHVYFShL7phni9hSuU/r0TqA8u9DOGArKvCZzXCKEzyL7O8o4Fs1T4ftHGKXisU6gOzfIKLIp2CnVCr1JhKJHVXAiZ4C7Ae8Ts6UPDfCsUUhJRYLrJGCa+xSNBo9ss8pH+gr/jK/tj0a2ETv2IZ35FSkS7HbzakAAAAASUVORK5CYII=");
              background-size: 100%; /*no*/
            }
            .ratingStyle {
              z-index: 2;
              background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAfhJREFUOBGlVD1LHFEUPXfWrzGJO2uhaIQ0iljESgKSpAjBwpXVKikEl6TzD6TwJ4gWaQMBS8WQgCRZ61QpglUgRbQUbMR1XfwodvbmvE1mdt/ssDPBC493733nnrkf7w2QQrSU29D9wY8poJAkkG6hD8O5E+IGgJsHkr8+7hTjdDpsnA0PLkHE4yK2r5iETyYUfdUkkRa96W3VOhLqXv8oFHNhgGCC/Xwc2jFKR0J0966w1IwVp/LasiNGOBTdxV24bhbqenCQRUY9qLzl2CasGEUVdbyA1M5R1wrq/gUqVxUp4tLghCX85D7VlonFksJQ9Un3w5S8c2sy8z3TGtGDRsla8op0vKe3O0UuMRBVDm9N8uX1Zg/3s8+hmU/sGS/wf8kN0UWZP/tgokJCY+jX3ENmWqJ3zNiJonoKXxalcPY9wFqExqmf3fvIuL+SM2WZNX9SCheHAZnZ2++h9FyxufdaQfG6CBznTvQshtDhSyA4jQieRmExhO2gaFBoi5OK8EkYECiqX9jdd1wauP7tbVgrw8a/TzETBpkp1nWZ96sg8+VV8j0j6VF4Dozo3sB4ix0ZypD3iO3r+QvQbfi1KVkobwcBkj//hmp5msSbXHxqlC67bCtDDr2fN/43wYvMaFkK1dOALNjlJa6Z8RuIP0vfAZfVhj/iqoy46fpKwgAAAABJRU5ErkJggg==");
              background-size: 100%; /*no*/
            }
            i {
              font-style: normal;
              &:nth-of-type(2) {
                color: #aaa;
              }
            }
          }
          /*演员信息*/
          .subject-text {
            color: #494949;
            margin-top: 40px;
            padding-right: 60px;
            font-size: 14px; /*no*/
            line-height: 1.6;
            text-align: justify;
            padding-right: 80px;
          }
        }
        .subject-img {
          flex: 1;
          img {
            width: 100%;
          }
        }
      }
    }
    /*用户选择*/
    .user-select {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 0 0.48rem;
      margin-bottom: 30px; /*no*/
      button {
        width: 46%;
        height: 35px; /*no*/
        border: 1px solid #ffb712; /*no*/
        color: #ffb712;
        background-color: #fff;
        border-radius: 3px; /*no*/
        font-size: 15px; /*no*/
      }
      .openApp {
        width: 100%;
        height: 35px; /*no*/
        border: 1px solid #42bd56; /*no*/
        color: #42bd56;
        border-radius: 3px; /*no*/
        margin-top: 80px;
        text-align: center;
        line-height: 35px; /*no*/
        font-size: 15px; /*no*/
      }
    }
    /*影片简介*/
    .movie-introduction {
      padding: 0 40px;
      margin-bottom: 30px; /*no*/
      .introduction-title {
        color: #aaa;
        margin: 0 0 15px; /*no*/
        font-size: 15px; /*no*/
      }
      .introduction-content {
        color: #333;
        font-size: 15px; /*no*/
        text-align: justify;
      }
    }
    /*影人*/
    .movie-stills {
      padding: 0 40px;
      margin-bottom: 30px; /*no*/
    }
    /*影人title*/
    .lists-item > header span {
      font-size: 15px !important; /*no*/
      color: #aaaaaa;
      margin: 0 0 15px; /*no*/
    }
  }

  .movie-info /deep/ .lists-item > header span[data-v-00b9ff1e]{
      color: #aaaaaa;
      font-size: 15px; /*no*/
    }
</style>


