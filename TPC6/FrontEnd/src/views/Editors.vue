<template>
  <div class="w3-container">
    <h3>Editores:</h3>
    <table class="w3-table-all">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Número de Publicações Envolvido(a)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ed in eds" v-bind:key="ed.e" @click="goPubs(ed.e)"> 
          <td>{{ed.e}}</td>
          <td>{{ed.name}}</td>
          <td>{{ed.numPubs}}</td>
        </tr>
      </tbody>
    </table> 
  </div> 
</template>

<script>
import axios from 'axios';

  export default {
    name: 'Editors',

    data() {
      return {
            eds: null,
        };
    },

    created: function() {
      axios
        .get('http://localhost:8080/api/editors')
        .then(res => {
          this.eds = res.data;
        })
    },

    methods: {
      goPubs: function(id){
        this.$router.push('/editors/' + id)
      }
    }
  }
</script>
<style>
  h3 {
    margin-bottom: 5%;
  }
</style>