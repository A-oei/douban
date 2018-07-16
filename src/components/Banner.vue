<template>
  <div class="banner">
    <div class="banner-app">
      <img
        src="https://img3.doubanio.com/f/talion/fbcb08987a36258354c6037211d94286bef9716c/pics/card/promotion_bg.jpg">
    </div>
    <div class="banner_inner">
      <div class="inner_text">
        <p>用APP打开</p>
        <p>聊聊你的观影感受</p>
      </div>
      <div class="inner_btn">
        <a
          href="https://www.douban.com/doubanapp/frodo?model=B&copy=1&page=movie&channel=card_movie&direct_dl=1">急速下载</a>
        <a>打开</a>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name:"banner",
    props: []
  }
</script>
<style lang="less" scoped>
  .banner {
    position: relative;
    .banner-app {
      font-size: 0;
      padding-bottom: 21.33%;
      position: relative;
      img {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    .banner_inner {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 36px;
      right: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .inner_text {
        font-size: 14px; /*no*/
        line-height: 22px; /*no*/
        color: #2CA532;
      }
      .inner_btn {
        a {
          display: inline-block;
          padding: 30px 40px;
          font-size: 28px;
          color: #ffffff;
          background-color: #42bd56;
          margin-right: 10px;
          border: 1px solid #42bd56;
          border-radius: 10px;
          &:nth-of-type(2) {
            background-color: #ffffff;
            border: 1px solid #42bd56;
            color: #42bd56;
          }
        }
      }
    }
  }
</style>
