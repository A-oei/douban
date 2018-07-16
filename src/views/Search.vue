<template>
  <div class="douban-search">
    <nav>
      <a href="javascript:;" @click="close">关闭</a>
      <div>
        <input type="search">
      </div>
    </nav>
    <ul>
      <li v-for="item in lists" tag="li">
        <h3 :style="{color:item.col}">{{item.title}}</h3>
        <span>{{item.Introduction}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "search",
    created() {
      this.$store.commit("invisible")
    },
    data() {
      return {
        lists: [
          {
            title: "电影",
            Introduction: "影院热映",
            col: 'rgb(35, 132, 232)'
          },
          {
            title: "电视",
            Introduction: "正在热播",
            col: 'rgb(122, 106, 219)'
          },
          {
            title: "图书",
            Introduction: "畅销排行",
            col: 'rgb(159, 120, 96)'
          },
          {
            title: "同城",
            Introduction: "周末生活",
            col: 'rgb(230, 70, 126)'
          },
          {
            title: "小组",
            Introduction: "志趣相投",
            col: 'rgb(42, 184, 204)'
          },
          {
            title: "音乐",
            Introduction: "新碟榜",
            col: 'rgb(244, 143, 46)'
          },
          {
            title: "阅读",
            Introduction: "电子书",
            col: 'rgb(159, 120, 96)'
          },
          {
            title: "游戏",
            Introduction: "虚拟世界",
            col: 'rgb(87, 116, 197)'
          },
          {
            title: "应用",
            Introduction: "玩手机",
            col: 'rgb(89, 108, 221)'
          },
          {
            title: "广播",
            Introduction: "友邻动态",
            col: 'rgb(225, 100, 77)'
          },
          {
            title: "FM",
            Introduction: "红心歌单",
            col: 'rgb(64, 207, 169)'
          },
          {
            title: "市集",
            Introduction: "购买原创",
            col: 'rgb(66, 189, 86)'
          },
        ]
      }
    },
    methods:{
      close(){
        this.$router.go(-1)
      }
    },
    beforeRouteLeave(to,from,next){
      this.$store.commit("visible");
      next();
    }
  }
</script>
<style lang="less" scoped>
  .douban-search {
    width: 100%;
    background-color: #fff;
    nav {
      padding: 15px 18px 15px 60px; /*no*/
      border-bottom: 1px solid #f3f3f3;
      position: relative;
      > div {
        input {
          width: 100%;
          border-radius: 3px; /*no*/
          height: 31px; /*no*/
          border: none;
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAABGdBTUEAALGPC/xhBQAABUlJREFUaAXdWT1oHEcU1unHR8ih0lZEKsWVkSrLkFaVQIYkJ93JBBUp0hm7sdMJbOlAnR0ICDdJk4AL6++wi8PChXAXMG6CMSmSTpZlFy7EmWBLQvm+5c3ydrTam9nblXQeWM2bN/N+vntvZ2afuro+sVZoB0+9Xv9qd3f3W+i4WCgUBg8ODgZB82HbAm8LvC3Qz/v6+h6Wy+V/g5kc/3gDWltbO7u/v38Njpbh17Cnby8Ast7T07M4OTn51lPWabkzoKWlpRKcuQkgP0FzyUn70Yua0HUHuu5OT083j17mP+MEaHl5eRLG70H9OX8TiRJvAOxqtVpdS1zlMZkICCAKKysrt6DvNukYvR/B24BTj9C/RCpt7e3t8Z3p6u3tHURq8n26ANlv0I/hOYMn0iB7AMZ8pVKpCR2Z9x3EORnoQIp9BuIPPJUYpdvg1Uql0v2JiYmdmPlDrEaj0d9sNmcwwR9owF4AMMsA/gNS8D97zmccC4jRQJotQVEEDIx+AG+hv7//5/Hx8fc+hsza9fX1z3d2dm5gPAs7RcNnT1CI1JV2IhULCGBuw9icNgZ6GylVnpqa+tPipxqurq5+jZSsQzgSLYCZwzs1n0ophA4B4gYA/gqjZJTCyF/d3d2XAWbT8LLoAepLgGpA14jRJ9GppN0oQqepkFszun/w6N2MkbmUNRjaYxNQz0DqSL3B+HyaLb2bSk3Dr3MTdAgG4w+SZplGxthjzx+KNmhL8c+JL4rlRoaAeANAmvHQ1G0hq3dGK7VpsbGg+fSFPmmeCx0CQi5fh4C+AWxzN3NRksUascXjwLQSfLpmBq59CAi/yHeWUC3t1mzpcRqKrZpeDJ94X/RqASDemiE1rCQ/8tBU42MhxSZvH6YNi29m3LIPAMkngF684XoD0ELt0mJzQ+uJ8U1PH6JNyl3UM9hheDc7kRZjO+JbK6cCQFBiPsrM+peGOIE+YjvGt0SXAkB4+SKAcC4EN+ZEyZwmbdu2b63MmpSLADKfAK2E85iPsR3xrZVNk3L8JglbsViMXInCiWMgYmx7+WJS7rX2FQfaF3p8nHSMba/ag4lQ5J2BUq8wZwk4xjYvqs7NRCgCCNIXnDVkv9C2/crHRAAIAs+1EHYW1gBOpNm2sW0/9XEkAMQioCU0xhqAxct9KDbHtCEAeqLHregAkFQ0X6jFZ6SgoVj5k2IzrAwBzCZqDH/7WDYpxwIFv+91u8WChmbkSYstVoTChvT7NRw4EiEgnNCLkGkquQGpzihWfqTY0p/hrCrRJ68WAmKtGVG6Y0nPsjpj8TIfio1ZS/FvqCm8s3gthyEgrkSI76IL932MizgX6ixktNSUcoEUSeq0pVTwGKmpsTMZAcQqC6J0FY++Cg0AVCMPUAKGZSydanT+xzTRoWAEEBlSD5snrdoIQD2DA5mlH3VRJ2yENTmx9whgHivbXmTsxQ/hZ5H+Afqq1obI5VoKFlv76GcA6oG27UrHAqIwi/UA8LsNShRnXqy3HE4N6khANCCRyvXfKQKEn/yX8fTImF0qUImAjPIc/+HF3YwbwGNkxBXQrDS1BerQpmBA6F42ivNIwTnw9eGrl/nQPDR/wTNiNgB5Z2bAY2RMI7j7AtbwEnunCGkN7fzTGD/IJtKY15lFAIg9NNuNlDcgDS7h3/rUyy9NHtKvAOQpnieuF812QLUFSIPLmk4L6tQC4g+UBtSpBpQG1KkH5AuqIwD5gOoYQK6gOgqQCyinmwIVnZaWcKMIvgw6DhB/WBsUDu2HQ0ND33Ou41KOTpsm51SVYEZHR3cN/5Pq/wfEdlFyq1lD2AAAAABJRU5ErkJggg==) no-repeat 50% #f3f3f3;
          background-size: 17.33333px; /*no*/
        }
      }
      a {
        position: absolute;
        top: 20px; /*no*/
        left: 18px; /*no*/
        color: #42bd56;
        font-size: 16px; /*no*/
      }
    }
    > ul {
      width: 100%;
      padding-top: 25px; /*no*/
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        width: 33.3%;
        margin-bottom: 25px; /*no*/
        text-align: center;
        h3 {
          font-size: 24px; /*no*/
          line-height: 28px; /*no*/
          display: block;
          font-weight: 400;
        }
        span {
          color: #999;
          letter-spacing: 1px; /*no*/
          font-size: 12px; /*no*/
          display: block;
        }
      }
    }
  }
</style>
