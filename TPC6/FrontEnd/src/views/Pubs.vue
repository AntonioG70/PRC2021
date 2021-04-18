<template>
  <div class="w3-container">
    <h3>Publicações:</h3>
    <table class="w3-table-all">
      <thead>
        <tr>
          <th>Nome</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pub in pubs" v-bind:key="pub.p" @click="goPub(pub.p)"> 
          <td>{{pub.p}}</td>
        </tr>
      </tbody>
    </table> 
  </div> 
</template>

<script>
import axios from 'axios';

  export default {
    name: 'Pubs',

    data() {
      return {
            pubs: null,
        };
    },

    created: function() {
      axios
        .get('http://localhost:8080/api/pubs')
        .then(res => {
          this.pubs = res.data;
        })
    },

    methods: {
        goPub: function(id){
            this.$router.push('/pubs/' + id);
        }
    }
  }
</script>
<style>
  h3 {
    margin-bottom: 5%;
  }
</style>