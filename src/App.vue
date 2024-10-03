<template>
  <NavBar v-if="isSuccess"/>
  <Form  @save-data="saveDatos"/>
</template>

<script>
import Form from './components/Form.vue';
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  components: {
    Form,
    NavBar
  },
  data() {
    return {
      isSuccess: false,
    }
  },
  methods: {
    saveDatos(value) {
      if (value) {
        this.isSuccess = true;
      }else {
        this.isSuccess = value;
      }
    }
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: "Karla", sans-serif;
  src: 
  url("./assets/fonts/Karla-Italic-VariableFont_wght.ttf"),
  url("./assets/fonts/Karla-VariableFont_wght.ttf");
}
:root {
  font-size: 62.5%;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: "Karla", sans-serif;
  font-size: 1.6rem;
  height: 100%;
}
#app {
  height: 100%;
}

/* @media screen and (min-width: 64rem) {
  body {
    height: 100vh;
  }    
} */
</style>
