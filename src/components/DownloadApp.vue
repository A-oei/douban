<template>
  <div class="download-app">
    <div class="info clearfix">
      <img src="https://img3.doubanio.com/f/talion/7837f29dd7deab9416274ae374a59bc17b5f33c6/pics/card/douban-app-logo.png">
      <h3>豆瓣</h3>
    </div>
    <a href="https://www.douban.com/doubanapp/card/log?category=book_home&cid=&action=click_download&ref=http%3A//www.douban.com/doubanapp/app%3Fchannel%3Dcard_book_home%26direct_dl%3D1">
      去 App Store 免费下载 客户端
    </a>
  </div>
</template>
<style lang="less" scoped>
    .download-app{
      width: 100%;
      margin-top: 50px;/*no*/
      margin-bottom: 30px; /*no*/
      text-align: center;
      font-size: 15px;/*no*/
      .info{
        display: inline-block;
        img{
          width: 40px;/*no*/
          float: left;
          margin-right: 15px;/*no*/
        }
        h3{
          float: left;
          font-size: 24px;/*no*/
          color: #111;
          line-height: 48px;/*no*/
          letter-spacing: 2px;/*no*/
        }
      }
      a{
        display: block;
        color: #42bd56;
        text-decoration: none;
      }
    }
</style>
<script>
  export default {
    name:"download-app"
  }
</script>
