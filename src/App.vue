<template>
  <div id="app">
    <img src="./assets/Logo.webp" alt="" class="logo" />
    <AmiiboSelect></AmiiboSelect>
    <HomeModule :start="start"></HomeModule>
    <AmiiboList @handleStart.once="handleStart"></AmiiboList>
    <footer>
      <p>
        Code by <a href="https://moselikk.com">moselikk</a> data from <a href="https://moselikk.com">Amiiboapi</a> The image is copyright <a href="https://moselikk.com">Nintendo</a>
      </p>
      <p>Check out the project in the <a href="https://moselikk.com">Github</a></p>
    </footer>
  </div>
</template>

<script>
import AmiiboList from './components/List'
import AmiiboSelect from './components/Select'
import HomeModule from './components/Home'
export default {
  name: 'App',
  data(){
    return{
      start: true,
      amiibos: [],
      orderAmiibo:{
        amiiboSeries:{},
        gameSeries: {}
      },
      series: null,
      selectSeries: '',
      selectClass: '',
      chosen: [],
      show: [],
      search: '',
      without: false
    }
  },
  methods:{
    handleStart(){
      this.start = false
    }
  },
  components: { AmiiboList, AmiiboSelect, HomeModule}
}
</script>

<style scope lang="scss">


#app{
  text-align: center;
  .logo{
    width: 300px;
    display: inline-block;
  }
  footer{
    font-size: 13px;
    a{
      text-decoration: none;
      font-weight: bold;
      color: #000;
      &:hover{
        padding: 0 8px;
        background-color: rgba(128, 128, 128, .3);
        box-shadow: inset 0px 2px 0px rgba(255, 255, 255, 0.15), inset 0px 2px 2px rgba(0, 0, 0, 0.35);
        border-radius: 8px;
      }
    }
  }
}
</style>
