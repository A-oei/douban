<template>
  <div id="app">
    <Nav v-show="is_visible"></Nav>
    <keep-alive include="bookLists,movieLists">
      <router-view></router-view>
    </keep-alive>
    <!--<router-view v-if="$route.meta.keepAlive"></router-view>-->

    <!--<router-view v-if="!$route.meta.keepAlive"></router-view>-->
  </div>
</template>

<script>
  import Nav from 'components/Nav'

  import {mapState,mapGetters} from 'vuex'

  export default {
    name: 'App',
    components: {
      Nav
    },
    created(){
    },
    computed: {
      ...mapState({
        loading: (state) => {
            return state.Loading.loading
        }
      }),
      ...mapGetters([
        "is_visible"
      ])
    }
  }
</script>

<style>

</style>
