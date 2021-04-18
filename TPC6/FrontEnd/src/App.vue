<template>
  <div id="app">
    <div id="nav" class="w3-header w3-teal">
      <router-link to="/pubs">Publicações</router-link> |
      <router-link to="/authors">Autores</router-link> |
      <router-link to="/editors">Editores</router-link>
    </div>
    <div>
      <a href="http://localhost:8080">Página inicial</a>
    </div>
    <div>
      <img src="./assets/logo.png" alt="vue" width="200" height="200">
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
