<template>
  <div class="summary">
    <h3 class="douban-title-aaa">{{title}}</h3>
    <div class="introduction-content" ref="introductionContent">
      {{content | slice(0,45)}}<a style='color: #42bd56' @click="summaryShow($event)">...展开</a>
    </div>
  </div>
</template>
<script>
  export default {
    name:"summaryShow",
    created(){
      this.summaryClipping=this.content.slice(0,45);
    },
    props: ["title", "content"],
    data() {
      return {
        summaryClipping: ""
      }
    },
    methods: {
      summaryShow(e) {
        e.target.style.display = "none";
        this.$refs.introductionContent.innerHTML=this.content;
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../libs/douban.css";

  .summary {
    margin-bottom: 30px;/*no*/
  }
</style>
