<template>
  <div class="item-info">
    <!--卡片信息-->
    <div class="info-card">
      <!--姓名-->
      <h3 class="info-name">
        {{celebrityInfo.name}}
      </h3>
      <!--详细信息-->
      <div class="info-data">
        <div>
          <!--人数-->
          <span>10534人收藏</span>
          <!--详细-->
          <h3>
            性别:{{celebrityInfo.gender}}
            出生地:{{celebrityInfo.born_place}}
            更多中文名:{{celebrityInfo.aka | join}}
          </h3>
          <!--更多-->
          <a href="#">更多资料</a>
        </div>
        <img :src="celebrityInfo.avatars.medium" :alt="celebrityInfo.alt" v-if="celebrityInfo.avatars">
      </div>
    </div>
    <!--收藏-->
    <div class="collection">收藏</div>
    <!--个人作品-->
    <Slider type="poster" :lists="workLists" title="个人作品" path="/movieInfo/"></Slider>
    <Slider :lists="cooperateds" title="合作过的影人" v-if="cooperated.length>0"></Slider>
    <DownloadApp></DownloadApp>
  </div>
</template>
<style lang="less" scoped>
  .item-info {
    padding: 47px 18px 0; /*no*/
    .info-card {
      width: 100%;
      .info-name {
        width: 100%;
        margin: 30px 0 5px; /*no*/
        font-size: 24px; /*no*/
        line-height: 32px; /*no*/
      }
      .info-data {
        margin-bottom: 30px; /*no*/
        display: flex;
        img {
          width: 100px; /*no*/
          height: 140px; /*no*/
        }
        > div {
          flex: 1;
          text-align: left;
          span {
            display: block;
            color: #aaa;
            line-height: 22px; /*no*/
            font-size: 14px; /*no*/
          }
          h3 {
            color: #494949;
            margin-top: 15px; /*no*/
            font-size: 14px; /*no*/
            line-height: 1.6;
            padding-right: 24px; /*no*/
            text-align: justify;
          }
          a {
            color: #42bd56;
            display: block;
          }
        }
      }
    }
    /*收藏*/
    .collection {
      width: 116px; /*no*/
      height: 30px; /*no*/
      line-height: 30px; /*no*/
      border: 1px solid #ffb712; /*no*/
      color: #ffb712;
      font-size: 15px; /*no*/
      text-align: center;
      margin-bottom: 30px; /*no*/
      border-radius: 15px;
    }
  }
</style>
<script>
  const DownloadApp = () => ({
    component: import("components/DownloadApp")
  })

  const Slider = () => ({
    component: import("components/Slider"),
    delay: 2000
  })

  export default {
    name:"item-info",
    created() {
      const id = this.$route.params.id;
      this.getInfo(id);
    },
    data() {
      return {
        celebrityInfo: "",
        workLists: [],
        //模仿的合作过的影人的数据
        cooperated: []
      }

    },
    methods: {
      getInfo(id) {
        this.$http.get("/api/v2/movie/celebrity/" + id)
          .then(res => {
            this.celebrityInfo = res.data;

            //由于我们使用的是push，所以要初始化
            this.workLists = [];
            this.cooperated = [];
            //设置一个变量来适配slider的数据格式
            var i = 0,
              j,
              l = res.data.works.length;
            const workLists = this.workLists,
              cooperated = this.cooperated,
              works = res.data.works;

            for (; i < l; i++) {
              workLists.push(works[i].subject);
              j = 0;
              for (; j < works[i].subject.casts.length; j++) {
                if (works[i].subject.casts[j].id != id) {
                  cooperated.push(works[i].subject.casts[j]);
                }
              }
            }
          })
          .catch(err => {
            console.log(err);
          })
      }
    },
    watch: {
      '$route'(to, from) {
        const id = to.params.id;
        this.getInfo(id);
      }
    },
    computed: {
      cooperateds() {
        var   obj = {},
              arr = [],
              cooperated=this.cooperated;
        var i=0,
            l=cooperated.length;
        for(;i<l;i++){
          if(!obj[cooperated[i].id]){
            arr.push(cooperated[i]);
            obj[cooperated[i].id]=1;
          }
        }
        return arr;
      }
    },
    components: {
      Slider,
      DownloadApp
    }
  }
</script>
