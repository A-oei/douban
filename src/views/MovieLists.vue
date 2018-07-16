<template>
    <div class="douban-lists">
      <Slider :lists="in_theaters" title="正在热映" type="poster" path="/movieInfo/"
              :params="params.in_theaters"></Slider>

      <Slider :lists="coming_soon" title="即将上映" type="poster" path="/movieInfo/"
              :params="params.coming_soon"></Slider>

      <!--prop如果不传入变量值，那么直接给定值就可以，例如title-->
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

  // const Slider = Vue.component("Slider", function (resolve) {
  //   require(['../Slider.vue'], resolve)
  // })

  const DownloadApp = () => ({
    component: import("components/DownloadApp")
  })

  const Slider = () => ({
    component: import("components/Slider"),
    delay: 2000
  })
  export default {
    name: "movieLists",
    created() {
      this.getIn();
      this.getComing();
    },
    data() {
      return {
        //params
        params: {
          in_theaters: {getType: 'movie', getQuery: 'in_theaters'},
          coming_soon: {getType: 'movie', getQuery: 'coming_soon'}
        },
        //正在上映
        in_theaters: "",
        //即将上映
        coming_soon: "",
        //发现列表
        findLists: [
          {
            title: "同时入选IMDB250和豆瓣电影250的电影",
            class: "o"
          },
          {
            title: "带你进入不正常的世界",
            class: "t"
          },
          {
            title: "用电【影】来祭奠逝去的岁月",
            class: "te"
          },
          {
            title: "女孩们的故事【电影】",
            class: "te"
          },
          {
            title: "line"
          },
          {
            title: "使用 App 【找电影】功能",
            class: "o"
          },
          {
            title: "科幻是未来的钥匙——科幻启示录【科幻题材】",
            class: "f"
          },
          {
            title: "美国生活面面观",
            class: "t"
          },
          {
            title: "经典韩国电影——收集100部",
            class: "f"
          }
        ],
        //分类列表
        classificationLists: [
          {
            title: "经典"
          },
          {
            title: "冷门佳片"
          },
          {
            title: "豆瓣高分"
          },
          {
            title: "动作"
          },
          {
            title: "喜剧"
          },
          {
            title: "爱情"
          },
          {
            title: "悬疑"
          },
          {
            title: "恐怖"
          },
          {
            title: "科幻"
          },
          {
            title: "治愈"
          },
          {
            title: "文艺"
          },
          {
            title: "成长"
          },
          {
            title: "动画"
          },
          {
            title: "华语"
          },
          {
            title: "欧美"
          },
          {
            title: "韩国"
          },
          {
            title: "日本"
          },
          {
            title: ""
          },
        ]
      }
    },
    methods: {
      //获取列表
      getIn() {
        this.$http.get("/api/v2/movie/in_theaters")
          .then(res => {
            this.in_theaters = res.data.subjects.slice(0, 6);
            console.log(this.in_theaters, "in_theaters");
          })
          .catch(err => {
            console.log(err);
          })
      },
      getComing() {
        this.$http.get("/api/v2/movie/coming_soon")
          .then(res => {
            this.coming_soon = res.data.subjects.slice(0, 6);
            console.log(this.in_theaters, "coming_soon");
          })
          .catch(err => {
            console.log(err);
          })
      }
    },
    components: {
      Slider,
      DownloadApp,
      Classification: () => ({
        component: import("components/Classification")
      })
    }
  }
</script>
<style lang="less" scoped>
  .douban-lists {
    width: 100%;
    padding: 40px;
    margin-top: 45px; /*no*/
  }
</style>
