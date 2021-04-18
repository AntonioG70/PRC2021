<template>
  <div class="w3-container">
    <h3>Autores:</h3>
    <table class="w3-table-all">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Número de Publicações Envolvido(a)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="aut in auts" v-bind:key="aut.a" @click="goPubs(aut.a)"> 
          <td>{{aut.a}}</td>
          <td>{{aut.name}}</td>
          <td>{{aut.numPubs}}</td>
        </tr>
      </tbody>
    </table> 
  </div> 
</template>

<script>
import axios from 'axios';

  export default {
    name: 'Authors',

    data() {
      return {
            auts: null,
        };
    },

    created: function() {
      axios
        .get('http://localhost:8080/api/authors')
        .then(res => {
          this.auts = res.data;
        })
    },

    methods: {
      goPubs: function(id){
        this.$router.push('/authors/' + id)
      }
    }
  }
</script>
<style>
  h3 {
    margin-bottom: 5%;
  }
</style>