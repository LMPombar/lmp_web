<template>
  <div id="app">
    <!-- <Header /> -->
    <main>
      <router-view />
    </main>
    <!-- <Footer /> -->
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #0a0a0a;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #0a0a0a;
}

main {
  flex: 1;
  padding: 0;
  max-width: none;
  margin: 0;
  height: 100vh;
  overflow: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.btn {
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: background 0.3s;
}

.btn:hover {
  background: #0056b3;
}

.btn-secondary {
  background: #6c757d;
}

.btn-secondary:hover {
  background: #545b62;
}
</style>
